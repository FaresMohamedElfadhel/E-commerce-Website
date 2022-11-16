import React from "react";
import { makeStyles } from "@material-ui/core";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@material-ui/core/TextField";
import Link from "@mui/material/Link";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
	Corp: {
		display: "flex",
		height: "100vh",
		flexDirection: "row",
	},
	Gauche: {
		width: "50%",
		height: "100%",
		margin: "auto",
	},
	BoiteForm: {
		width: "60%",
		height: "auto",
		borderRadius: "15px",
		border: "1px solid #CECECE",
		margin: "auto",
		marginTop: "90px",
	},
	BlocTitre: {
		margin: "auto",
		width: "25%",
	},
	Titre: {
		fontSize: 28,
		fontWeight: "bold",
		marginTop: "20px",
		margin: "auto",
	},
	BlocEcris: {
		marginRight: "auto",
		marginLeft: "10px",
		width: "60%",
	},
	Ecris: {
		fontSize: 14,
		fontWeight: "bold",
		marginTop: "20px",
		margin: "auto",
	},
	BlocInput: {
		width: "70%",
		marginTop: "10px",
		marginLeft: "10px",
		height: "40px",
	},
	input1: {
		height: "40px",
		width: "250px",
		fontSize: 12,
	},
	Actions: {
		width: "80%",
		height: "380px",
		margin: "auto",
		marginTop: "20px",
		display: "flex",
		flexDirection: "row",
	},
	Gauche2: {
		width: "100%",
		height: "380px",
	},
	Bloctit: {
		width: "80%",
		margin: "auto",
		marginTop: "30px",
		display: "flex",
		flexDirection: "row",
	},
	g: {
		width: "50%",
	},
}));
const ButtonSpe = styled(Button)({
	boxShadow: "none",
	textTransform: "none",
	width: "80%",
	height: "40px",
	marginRight: "auto",
	marginLeft: "auto",
	fontSize: 18,
	padding: "6px 12px",
	lineHeight: 1.5,
	border: "solid 0.5px #93B7BE",
	borderRadius: "5px",
	backgroundColor: "#93B7BE",
	color: "#002626",
	fontFamily: " 'Manrope', sans-serif",
	fontWeight: "bold",
	"&:hover": {
		backgroundColor: "#93B7BE",
		boxShadow: "none",
	},
});
const Login = () => {
	const classes = useStyles();
	const [UserName, setUserName] = React.useState("");
	const [mdp, setPassword] = React.useState("");
	const [Email, setEmail] = React.useState("");

	const handleCreateCompte = async (e) => {
		console.log("on go creer le compte");
		console.log("name ",UserName," mdp ",mdp," mail",Email)
		await axios({
			method: "post",
			url: "http://localhost:5000/Utilisateur/CreeCompte",
			withCredentials: true,
			data: { mdp, User:UserName, email:Email },
		}).then((res) => {
			if (res.status == 200) {
				window.location.href = "/Produits";
			} else {
				console.log("ERREUR statut :", res.status, "Message :", res.error);
			}
		});
	};

	return (
		<div className={classes.Corp}>
			<div className={classes.Gauche}>
				<div className={classes.BoiteForm}>
					<Avatar
						sx={{ margin: "auto", marginTop: "20px", bgcolor: "#93B7BE" }}>
						<LockOutlinedIcon />
					</Avatar>
					<div className={classes.BlocTitre}>
						<Box className={classes.Titre}>Sign Up</Box>
					</div>
					<div className={classes.Actions}>
						<div className={classes.Gauche2}>
							<div className={classes.Bloctit}>
								<TextField
									id="outlined-basic"
									label="UserName"
									variant="outlined"
									size="small"
									fullWidth
									onChange={(e) => {
										setUserName(e.target.value);
									}}
									value={UserName}
								/>
							</div>
							<div className={classes.Bloctit}>
								<TextField
									id="outlined-basic"
									label="Mot de passe"
									variant="outlined"
									type="password"
									size="small"
									fullWidth
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									value={mdp}
								/>
							</div>
							<div className={classes.Bloctit}>
								<TextField
									id="outlined-basic"
									label="Email"
									variant="outlined"
									size="small"
									fullWidth
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									value={Email}
								/>
							</div>

							<div className={classes.Bloctit} style={{ marginTop: "60px" }}>
								<ButtonSpe
									onClick={() => {
										handleCreateCompte();
									}}>
									{" "}
									Creer Compte{" "}
								</ButtonSpe>
							</div>
							<div style={{ width: "55%", margin: "auto", marginTop: "10px" }}>
								<Link href="Principal" variant="body2">
									{"Already have account ? Login"}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
