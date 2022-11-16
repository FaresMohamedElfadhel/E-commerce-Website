import React from "react";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import NavBar from "../Composants/NavBar";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UserContext from "../UserContext";
import a from "../../Images/1.jpg";
const useStyles = makeStyles((theme) => ({
	Content: {
		width: "95%",
		height: "80vh",
		marginTop: "30px",
		marginLeft: "auto",
		marginRight: "auto",
		padding: 0,
		display: "flex",
		gridTemplateColumns: "row",
	},
	Images: {
		width: "40%",
		//backgroundColor: "green",
		marginLeft: "auto",
		marginRight: "auto",
	},
	Desc: {
		width: "60%",
		marginLeft: "auto",
		marginRight: "auto",
	},
	image1: {
		width: "90%",
		height: "60%",
		//backgroundColor: "red",
		marginLeft: "auto",
		marginRight: "auto",
	},
	Titre: {
		fontSize: 28,
		color: "white",
	},
	Titre2: {
		fontSize: 18,
		color: "black",
	},
	Img: {
		width: "100%",
		height: "100%",
		marginTop: "40px",
		borderRadius: "5px",
		marginLeft: "auto",
		marginRight: "auto",
		"&:hover": { cursor: "pointer" },
	},
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#93B7BE",
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-Produit(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));
const Produit = () => {
	const classes = useStyles();
	var url;
	var {
		id,
		produit_id,
		Produit,
		Vendeur,
		Categorie,
		Encheri,
		Description,
		prix,
	} = useParams();
	const [Enchere, setEnchere] = useState("");
	const user = useContext(UserContext);
	const handleCloture = async (e) => {
		console.log("on go cloturer");

		await axios({
			method: "post",
			url: "http://localhost:5000/Utilisateur/Cloturer",
			withCredentials: true,
			data: {
				idprod: id,
			},
		}).then((res) => {
			console.log("-------------------------------------");
			console.log("-------------------------------------");
			console.log(res.status);
			console.log("-------------------------------------");
			console.log("-------------------------------------");
			if (res.status == 200) {
				console.log("Cloture done");
				window.location.href = "/Produits";
			}
		});
	};
	const handleEncher = async (e) => {
		console.log("on go encherir");

		await axios({
			method: "post",
			url: "http://localhost:5000/Utilisateur/Encherir",
			withCredentials: true,
			data: {
				idprod: id,
				Valeur: Enchere,
			},
		}).then((res) => {
			console.log("-------------------------------------");
			console.log("-------------------------------------");
			console.log(res.status);
			console.log("-------------------------------------");
			console.log("-------------------------------------");
			if (res.status == 200) {
				console.log("enchere done");
				var a = [
					id,
					produit_id,
					Produit,
					Vendeur,
					Categorie,
					Encheri,
					Description,
					Enchere,
				].join("/");
				alert(a);
				window.location.href = "/Produit/" + a;
			}
		});
	};

	return (
		<div>
			<NavBar />
			<div className={classes.Content}>
				<div className={classes.Images}>
					<div className={classes.image1}>
						{/*
						if (titre === "Alienware Aurora") {
		url = "https://i.ytimg.com/vi/RQr4QFVi2Rc/maxresdefault.jpg";}*/}
						<img src={a} className={classes.Img} alt="fireSpot" />
					</div>
					<div
						style={{
							width: "400px",
							height: "70px",
							marginLeft: "auto",
							marginRight: "auto",
							marginTop: "60px",
							display: "flex",
							flexDirection: "row",
						}}>
						<div
							style={{
								width: "180px",
								height: "70px",
								marginleft: 0,
								marginRight: "auto",
							}}>
							<Button
								style={{
									width: "100%",
									height: "70px",
									backgroundColor: "#0BDD55",
								}}
								variant="contained"
								onClick={(e) => {
									if (user.type == "Client") {
										if (prix < Enchere) {
											handleEncher();
										} else {
											alert(
												"la nouvelle valeur doit etre supperieur a l'ancienne valeur"
											);
										}
									} else {
										alert("vous n'avez pas l'autorisation pour  en cherir");
									}
								}}>
								Encherir
							</Button>
						</div>
						<div
							style={{
								width: "180px",
								height: "70px",
								marginleft: "auto",
								marginRight: 0,
							}}>
							<Button
								style={{
									width: "100%",
									height: "70px",
									backgroundColor: "#0B94DD",
								}}
								variant="contained"
								onClick={(e) => {
									if (user.type == "Admin") {
										handleCloture();
									} else {
										alert("vous n'avez pas l'autorisation pour Cloturer");
									}
								}}>
								Cloturé l'enchere
							</Button>
						</div>
					</div>
					<div
						style={{
							width: "350px",
							height: "100px",
							marginLeft: "auto",
							marginRight: "auto",
							display: "flex",
							flexDirection: "row",
						}}>
						<Box sx={{ m: 1, width: 350, marginTop: "20px" }}>
							<TextField
								label="Enchere"
								variant="outlined"
								type="Enchere"
								size="medium"
								fullWidth
								onChange={(e) => {
									setEnchere(e.target.value);
								}}
								value={Enchere}
							/>
						</Box>
					</div>
				</div>
				<div className={classes.Desc}>
					<TableContainer component={Paper}>
						<Table aria-label="customized table">
							<TableHead>
								<TableRow>
									<StyledTableCell
										align="center"
										width={100}
										height={50}
										fontSize={28}>
										<Box className={classes.Titre}> Champ</Box>
									</StyledTableCell>
									<StyledTableCell
										align="center"
										width={100}
										height={50}
										fontSize={28}>
										<Box className={classes.Titre}> Valeur</Box>
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<StyledTableRow key={"1"}>
									<StyledTableCell
										align="center"
										width={100}
										height={35}
										fontSize={28}>
										<Box className={classes.Titre2}> produit_id</Box>
									</StyledTableCell>
									<StyledTableCell
										align="center"
										width={100}
										height={35}
										fontSize={28}>
										<Box className={classes.Titre2}> {produit_id}</Box>
									</StyledTableCell>
								</StyledTableRow>
								<StyledTableRow key={"1"}>
									<StyledTableCell
										align="center"
										width={100}
										height={35}
										fontSize={28}>
										<Box className={classes.Titre2}> Produit</Box>
									</StyledTableCell>
									<StyledTableCell
										align="center"
										width={100}
										height={35}
										fontSize={28}>
										<Box className={classes.Titre2}> {Produit}</Box>
									</StyledTableCell>
								</StyledTableRow>
								<StyledTableRow key={"1"}>
									<StyledTableCell
										align="center"
										width={100}
										height={35}
										fontSize={28}>
										<Box className={classes.Titre2}> Vendeur</Box>
									</StyledTableCell>
									<StyledTableCell
										align="center"
										width={100}
										height={35}
										fontSize={28}>
										<Box className={classes.Titre2}> {Vendeur}</Box>
									</StyledTableCell>
								</StyledTableRow>
								<StyledTableRow key={"1"}>
									<StyledTableCell
										align="center"
										width={100}
										height={35}
										fontSize={28}>
										<Box className={classes.Titre2}> Categorie</Box>
									</StyledTableCell>
									<StyledTableCell
										align="center"
										width={100}
										height={35}
										fontSize={28}>
										<Box className={classes.Titre2}> {Categorie}</Box>
									</StyledTableCell>
								</StyledTableRow>
								<StyledTableRow key={"1"}>
									<StyledTableCell
										align="center"
										width={100}
										height={35}
										fontSize={28}>
										<Box className={classes.Titre2}> Encheri</Box>
									</StyledTableCell>
									<StyledTableCell
										align="center"
										width={100}
										height={35}
										fontSize={28}>
										<Box className={classes.Titre2}> {Encheri}</Box>
									</StyledTableCell>
								</StyledTableRow>
								<StyledTableRow key={"1"}>
									<StyledTableCell
										align="center"
										width={100}
										height={35}
										fontSize={28}>
										<Box className={classes.Titre2}> Description</Box>
									</StyledTableCell>
									<StyledTableCell
										align="center"
										width={100}
										height={35}
										fontSize={28}>
										<Box className={classes.Titre2}> {Description}</Box>
									</StyledTableCell>
								</StyledTableRow>
								<StyledTableRow key={"1"}>
									<StyledTableCell
										align="center"
										width={100}
										height={35}
										fontSize={28}>
										<Box className={classes.Titre2}> prix</Box>
									</StyledTableCell>
									<StyledTableCell
										align="center"
										width={100}
										height={35}
										fontSize={28}>
										<Box className={classes.Titre2}> {prix}</Box>
									</StyledTableCell>
								</StyledTableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</div>
	);
};

export default Produit;
