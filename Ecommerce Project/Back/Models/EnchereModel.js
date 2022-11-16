const mongoose = require("mongoose");
const { Schema } = mongoose;
const Enchere = new mongoose.Schema({
	Enchere: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	Produit: {
		type: Schema.Types.ObjectId,
		ref: "Produits",
	},
	Encheres: {
		type:Number,
	},
	ValeurFinal: {
		type: Number,
	},
	Etat: {
		type: String,
		required: true,
	},
	Acheteur: {
		type: Schema.Types.ObjectId,
		ref: "Utilisateurs",
	},
});

module.exports = mongoose.model("Encheres", Enchere);
