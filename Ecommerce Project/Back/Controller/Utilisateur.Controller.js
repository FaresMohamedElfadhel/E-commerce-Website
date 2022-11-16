const UserModel = require("../Models/Utilisateur.Model");
const Product = require("../Models/ProduitModel");
const Enchere = require("../Models/EnchereModel");
//**************************************************/
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const maxAge = 24 * 60 * 60 * 100;
const CODE = "lkajnfjnlkiéejfoizejffopzero";

const CodifieIdClient = () => {
	return ["Cl", Math.floor(Math.random() * 10000)].join("0");
};
const CodifieIdProduit = () => {
	return ["Pr", Math.floor(Math.random() * 10000)].join("0");
};
const CodifieIdEnchere = () => {
	return ["En", Math.floor(Math.random() * 10000)].join("0");
};
//***************** creer un jeton adapté ************************************************************************************/
const createToken = (id) => {
	return jwt.sign({ userId: id }, CODE, { expiresIn: maxAge });
};
module.exports.CreeCompte = async (req, res) => {
	console.log("on affiche le req  ", req.body);
	const client = CodifieIdClient();
	const { mdp, User, email } = req.body;
	console.log("client : ", client, " nomUtilisateur : ", User, " mdp : ", mdp);

	bcrypt
		.hash(mdp, 10)
		.then((hash) => {
			console.log("le mdp: ", hash);
			const user = new UserModel({
				client,
				mdp: hash,
				User,
				email,
				type: "Client",
			});
			user
				.save()
				.then(async () => {
					console.log("utilisateur creer on le connect !! ", client);
					await UserModel.findOne({ client: client })
						.then((user) => {
							console.log("utilisateur : !!", user);
							if (!user) {
								return res
									.status(201)
									.json({ error: "Utilisateur non trouvé !" });
							}
							bcrypt
								.compare(req.body.mdp, user.mdp)
								.then((valid) => {
									if (!valid) {
										return res
											.status(202)
											.json({ error: "Mot de passe incorrect !" });
									}
									const token = createToken(user._id);
									console.log("CONNECTER");
									res.cookie("jwt", token, { httpOnly: true, maxAge });
									res.cookie("client", client.replace(/ /g, ""), {
										httpOnly: true,
										maxAge,
									});
									res.cookie("User", user.User, {
										httpOnly: true,
										maxAge,
									});
									res.cookie("email", user.email, { httpOnly: true, maxAge });
									console.log("les cookies sont fait");
									res.status(200).json({
										user: user._id,
										client: req.body.client,
									});
								})
								.catch((error) => res.status(500).json({ error }));
						})
						.catch((error) => res.status(500).json({ error }));
				})
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
module.exports.Connection = async function Connection(req, res) {
	await UserModel.findOne({ client: req.body.client })
		.then((user) => {
			if (!user) {
				return res.status(201).json({ error: "Utilisateur non trouvé !" });
			}
			bcrypt
				.compare(req.body.mdp, user.mdp)
				.then((valid) => {
					if (!valid) {
						return res.status(202).json({ error: "Mot de passe incorrect !" });
					}
					const token = createToken(user._id);
					console.log("CONNECTER");
					console.log(
						"nos cookies : ",
						token,
						"--",
						req.body.client,
						"---",
						user.User
					);
					res.cookie("jwt", token, { httpOnly: true, maxAge });
					res.cookie("client", req.body.client.replace(/ /g, ""), {
						httpOnly: true,
						maxAge,
					});
					res.cookie("User", user.User, { httpOnly: true, maxAge });
					res.cookie("email", user.email, { httpOnly: true, maxAge });
					res.cookie("type", user.type, { httpOnly: true, maxAge });
					res.status(200).json({
						user: user._id,
						client: req.body.client,
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
module.exports.Deconnection = (req, res) => {
	console.log("ON va se deconnecter");
	res.cookie("jwt", "", { maxAge: 1 });
	res.cookie("client", "", { maxAge: 1 });
	res.cookie("User", "", { maxAge: 1 });
	res.cookie("email", "", { maxAge: 1 });
	res.status(200).json("/");
};
module.exports.RecupCl = (req, res, next) => {
	const token = req.cookies.jwt;
	console.log("On recupe les données !!!");
	console.log("on chek ce token :", token);
	if (token) {
		jwt.verify(token, CODE, async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				res.cookies("jwt", "", { maxAge: 1 });
				console.log("on va retourné 201");
				next();
				res.status(201).json();
			} else {
				console.log(
					"on va send la request et les context !!! " +
						"id:" +
						decodedToken.userId
				);
				res.status(200).json({
					client: req.cookies.client,
					User: req.cookies.User,
					email: req.cookies.email,
					type: req.cookies.type,
				});
			}
		});
	} else {
		console.log("mauvais token");
		res.status(201).json({ error: "Utilisateur Non connecté !" });
	}
};
module.exports.getAllUsers = async (req, res) => {
	const users = await UserModel.find().select("-mdp");
	res.status(200).json(users);
};
module.exports.getUser = (req, res) => {
	const token = req.cookies.jwt;
	console.log("on chek ce token :", token);
	if (token) {
		jwt.verify(token, CODE, async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				res.cookies("jwt", "", { maxAge: 1 });
				next();
			} else {
				console.log("on chek ce token :", decodedToken.userId);
				UserModel.findById(decodedToken.userId, (err, docs) => {
					if (!err) res.status(200).json(docs);
					else console.log(" on a un souci : " + err);
				}).select("-mdp");
			}
		});
	} else {
		console.log("mauvais token");
		res.locals.user = null;
		return res.status(404).json({ error: "ta pas le droit frere" });
	}
};
module.exports.getUser2 = (req, res) => {
	UserModel.find({ client: req.body.client }, (err, docs) => {
		if (!err) res.status(200).json(docs);
		else console.log(" on a un souci : " + err);
	}).select("-mdp");
};
module.exports.Modifier = async (req, res) => {
	const queryObj = {};
	queryObj[req.body.what] = req.body.val;
	console.log("on est la avec : ", queryObj);
	try {
		await UserModel.findOneAndUpdate(
			{ client: req.body.client },
			{ $set: queryObj },
			{ new: true, upsert: true, setDefaultsOnInsert: true }
		)
			.then(() => {
				console.log("---- ok ----");
				return res.status(200).json({ message: "olk" });
			})
			.catch((err) => {
				console.log("yeeeeeeeeew");
			});
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};
module.exports.SupprimeUser = async (req, res) => {
	try {
		await UserModel.remove({ client: req.body.client }).exec();
		res.status(200).json({ message: "Suppression effectuer avec succes. " });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};
module.exports.Encherir = async (req, res) => {
	console.log("********************");
	console.log("********************");
	console.log("On a une enchere ",req.body);
	console.log("********************");
	console.log("********************");
	const token = req.cookies.jwt;
	console.log("on chek ce token :", token);
	if (token) {
		jwt.verify(token, CODE, async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				res.cookies("jwt", "", { maxAge: 1 });
				next();
			} else {
				console.log(
					"maison : ",
					req.body.idprod,
					"le id : ",
					decodedToken.userId
				);

				try {
					await Enchere.findOneAndUpdate(
						{ Produit: req.body.idprod },
						{ $set: { Encheres: req.body.Valeur, } },
						{ new: true, upsert: true, setDefaultsOnInsert: true }
					).then(console.log("ajoout de l'enchere effectuer"));
					await Enchere.findOneAndUpdate(
						{ Produit: req.body.idprod },
						{ $set: { Etat: "en cours" } },
						{ new: true, upsert: true, setDefaultsOnInsert: true }
					).then(console.log("Etat mis a jour a en cours"));
					await Product.findByIdAndUpdate(
						req.body.idprod,
						{ $set: { prix: parseInt(req.body.Valeur) } },
						{ new: true, upsert: true, setDefaultsOnInsert: true }
					).then(console.log("prix mis a jour dans produit"));
					await Product.findByIdAndUpdate(
						req.body.idprod,
						{ $set: { Encheri: true } },
						{ new: true, upsert: true, setDefaultsOnInsert: true }
					).then(console.log("Encheri mis a jour dans produit"));
					return res.status(200).json({ message: "Enchere effectuer" });
				} catch (err) {
					return res.status(500).json({ message: err });
				}
			}
		});
	} else {
		console.log("mauvais token");
		res.locals.user = null;
		return res
			.status(404)
			.json({ error: "pas d'id detecter erreur lors de la connexion" });
	}
};
module.exports.Cloturer = async (req, res) => {
	console.log("********************");
	console.log("********************");
	console.log("On a une Cloture ",req.body);
	console.log("********************");
	console.log("********************");
	await Product.findByIdAndUpdate(
		req.body.idprod,
		{ $set: { Vendu: true } },
		{ new: true, upsert: true, setDefaultsOnInsert: true }
	).then(console.log("Cloturer dans produit"));
	await Enchere.findOneAndUpdate(
		{ Produit: req.body.idprod },
		{ $set: { Etat: "Fini" } },
		{ new: true, upsert: true, setDefaultsOnInsert: true }
	).then(console.log("Etat mis a jour a en cours"));
	return res.status(200).json({ message: "Enchere effectuer" });
};
module.exports.AjoutProduit = async (req, res) => {
	const { Produit, Categorie, Description, Vendeur } = req.body;
	const produit_id = CodifieIdProduit();
	console.log("produit_id : ", produit_id, " Produit : ", Produit);
	const Produits = new Product({
		produit_id,
		Produit,
		Vendeur,
		Categorie,
		Description,
		Encheri: false,
		prix: 0,
		Vendu: false,
	});
	Produits.save()
		.then(async (docs, err) => {
			console.log("err : ", err, " docs : ", docs.id);
			const Ench = new Enchere({
				Enchere: CodifieIdEnchere(),
				Produit: docs.id,
				Encheres: 0,
				Etat: "en attente",
			});
			Ench.save()
				.then(async () => {
					res.status(201).json({ message: "Produit et enchere créé !" });
				})
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(400).json({ error }));
};
module.exports.SupprimeProduit = async (req, res) => {
	try {
		await Product.remove({ produit_id: req.body.produit_id }).exec();
		res.status(200).json({ message: "Suppression effectuer avec succes. " });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};
module.exports.getAllProducts = async (req, res) => {
	const Produit = await Product.find();
	res.status(200).json(Produit);
};
module.exports.getAllEncheres = async (req, res) => {
	const Ench = await Enchere.find().populate("Produit");
	res.status(200).json(Ench);
};
module.exports.getProductById = (req, res) => {
	Product.findById(req.params.id, (err, docs) => {
		if (!err) res.send(docs);
		else console.log(" on a un souci : " + err);
	});
};
module.exports.getProduct = (req, res) => {
	const queryObj = {};
	queryObj["produit_id"] = req.body.produit_id;
	queryObj["Vendu"] = false;
	Product.findOne(queryObj, (err, doc) => {
		if (!err) res.status(200).json(doc);
		else console.log(" on a un souci : " + err);
	});
};
module.exports.Recherche = (req, res) => {
	console.log("le req : ",req.body)
	const queryObj = req.body.queryObj;
	Product.find(queryObj, (err, doc) => {
		if (!err) res.status(200).json(doc);
		else console.log(" on a un souci : " + err);
	});
};
