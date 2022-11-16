import React from "react";
import { useState,useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Nav from "../Composants/NavBar";
import axios from "axios";
import Table from "../Composants/Table";
import TextField from "@material-ui/core/TextField";
import Cookies from 'universal-cookie';
import UserContext from "../UserContext";
const useStyles = makeStyles((theme) => ({
	Corp: {
		width: "100%",
		minHeight: "100vh",
		backgroundColor: "#F0F0F0",
	},
	Text: {
		fontSize: 16,
		marginBottom: "10px",
		marginTop: "10px",
		marginLeft: "10px",
	},
	blocfiltre: {
		width: "90%",
		minHeight: "190px",
		marginLeft: "auto",
		marginRight: "auto",
	},
	Content: {
		width: "90%",
		minHeight: "475px",
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: "00px",
	},
}));

export default function Produits() {
	const classes = useStyles();
	const [Categorie, setCategorie] = useState("");
	const [Produit, setProduit] = useState("");
	const [Vendeur, setVendeur] = useState("");
	const user = useContext(UserContext);
	const cookies = new Cookies();
	console.log(cookies)
	const prod = [
		{
			produit_id: "151548",
			Vendeur: "Kamal lehani",
			Produit: "smartphone",
			Categorie: "Tech",
			Encheri: "true",
			Description: "ce produit est un smartphone de technologie avancé pro max",
			Vendeur: "200000",
		},
		{
			produit_id: "151548",
			Vendeur: "Kamal lehani",
			Produit: "smartphone",
			Categorie: "Tech",
			Encheri: "true",
			Description: "ce produit est un smartphone de technologie avancé pro max",
			Vendeur: "200000",
		},
		{
			produit_id: "151548",
			Vendeur: "Kamal lehani",
			Produit: "smartphone",
			Categorie: "Tech",
			Encheri: "true",
			Description: "ce produit est un smartphone de technologie avancé pro max",
			Vendeur: "200000",
		},
		{
			produit_id: "151548",
			Vendeur: "Kamal lehani",
			Produit: "smartphone",
			Categorie: "Tech",
			Encheri: "true",
			Description: "ce produit est un smartphone de technologie avancé pro max",
			Vendeur: "200000",
		},
		{
			produit_id: "151548",
			Vendeur: "Kamal lehani",
			Produit: "smartphone",
			Categorie: "Tech",
			Encheri: "true",
			Description: "ce produit est un smartphone de technologie avancé pro max",
			Vendeur: "200000",
		},
		{
			produit_id: "151548",
			Vendeur: "Kamal lehani",
			Produit: "smartphone",
			Categorie: "Tech",
			Encheri: "true",
			Description: "ce produit est un smartphone de technologie avancé pro max",
			Vendeur: "200000",
		},
		{
			produit_id: "151548",
			Vendeur: "Kamal lehani",
			Produit: "smartphone",
			Categorie: "Tech",
			Encheri: "true",
			Description: "ce produit est un smartphone de technologie avancé pro max",
			Vendeur: "200000",
		},
	];
	const handleChangeCategorie = (event) => {
		setCategorie(event.target.value);
	};
	const [Productss, setProducts] = useState([]);

	const handleOpen = async () => {
		await axios({
			method: "get",
			url: "http://localhost:5000/Utilisateur/getAllProducts",
		}).then((res) => {
			alert("Voici les produits");
			console.log(res.data);
			setProducts(res.data);
		});
	};
	const handleRecherch = async () => {
		const queryObj = {};
		if (Categorie != "") {
			queryObj["Categorie"] = Categorie;
			
		}
		if (Produit != "") {
			queryObj["Produit"] = Produit;
		}
		if (Vendeur != "") {
			queryObj["Vendeur"] = Vendeur;
		};
		await axios({
			method: "post",
			url: "http://localhost:5000/Utilisateur/RechercheProduit",
			data:{
				queryObj,
			},
		}).then((res) => {
			alert("Voici les produits");
			console.log(res.data);
			setProducts(res.data);
		});
	};

	return (
		<div className={classes.Corp}>
			{/* une app barre*/}
			<Nav id={"1"} />
			<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
				<div className={classes.blocfiltre}>
					<div
						style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
						<Box sx={{ m: 1, minWidth: 250 }}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Categorie</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={Categorie}
									label="Categorie"
									onChange={handleChangeCategorie}>
									<MenuItem value="">-</MenuItem>
									<MenuItem value="SmartPhone">SmartPhone</MenuItem>
									<MenuItem value="Categorie">Categorie</MenuItem>
									<MenuItem value="Categorie">Categorie</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<Box sx={{ m: 1, minWidth: 250 }}>
							<TextField
								label="Produit"
								variant="outlined"
								type="Produit"
								size="medium"
								fullWidth
								onChange={(e) => {
									setProduit(e.target.value);
								}}
								value={Produit}
							/>
						</Box>
						<Box sx={{ m: 1, minWidth: 250 }}>
							<TextField
								label="Vendeur"
								variant="outlined"
								type="Vendeur"
								size="medium"
								fullWidth
								onChange={(e) => {
									setVendeur(e.target.value);
								}}
								value={Vendeur}
							/>
						</Box>
					</div>
					<div style={{ height: "020px" }}></div>
					<div
						style={{
							marginTop: "40px",
							display: "flex",
							flexDirection: "row",
							width: "520px",
							margin: "auto",
						}}>
						<div
							style={{
								width: "240px",
								height: "50px",
								marginleft: 0,
								marginRight: "auto",
							}}>
							<Button
								style={{
									width: "100%",
									height: "50px",
									backgroundColor: "#0B94DD",
								}}
								variant="contained"
								onClick={handleOpen}>
								Produits
							</Button>
						</div>
						<div
							style={{
								width: "240px",
								height: "50px",
								marginleft: "auto",
								marginRight: 0,
							}}>
							<Button
								style={{
									width: "100%",
									height: "50px",
									backgroundColor: "#0BDD55",
								}}
								variant="contained"
								onClick={handleRecherch}>
								Recherche
							</Button>
						</div>
					</div>
				</div>
				<div className={classes.Content}>
					{
						<div>
							<Table Productss={Productss} />
						</div>
					}
				</div>
			</div>
		</div>
	);

	//******************************************** */
}
