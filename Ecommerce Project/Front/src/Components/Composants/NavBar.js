import * as React from "react";
import { useState, useLayoutEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logo1 from "../../Images/logo.png";
import { Link } from "react-scroll";
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
	Toolbar: {
		width: "96.4%",
		display: "flex",
		flexdirection: "row",
		[theme.breakpoints.down("900")]: { height: "20px" },
	},
	LogoBloc: {
		marginLeft: "40px",
		width: "10%",
		height: "80%",
		margin: "5px",
	},

	Logo: {
		width: 70,
		height: 70,
		"&:hover": { cursor: "pointer" },
	},
	act: {
		fontFamily: " 'Manrope', sans-serif",
		fontWeight: "bold",
		color: "white",
		fontSize: 14,
	},
	ActionBloc: {
		width: "100%",
		minWidth: "130px",
		fontSize: "14px",
		marginLeft: "25px",
		float: "right",
		marginRight: "45px",
		display: "flex",
		gridTemplateColumns: "repeat(3, 1fr)",
	},
	blo: {
		width: "100%",
	},
	ActionLinks: {
		marginTop: "8px",
		display: "grid",
		gridTemplateColumns: "repeat(5, 1fr)",
	},
	vide: {
		width: "18vw",
		marginRight: "20px",
		height: "40px",
		[theme.breakpoints.down("1000")]: { width: "12vw" },
		[theme.breakpoints.down("600")]: { width: "12vw" },
	},
	vide2: {
		backgroundColor: "green",
		width: "80px",
		height: "10px",
		[theme.breakpoints.down("630")]: { width: "60px" },
	},
	ButtonBloc: {
		width: "25%",
		right: 0,
		height: "40px",
		display: "flex",
		Float: "right",
		[theme.breakpoints.down("650")]: { marginRight: "0px" },
	},
	ActionText: {
		"&:hover": { cursor: "pointer" },
	},
	vidos: {
		width: "15%",
		backgroundColor: "red",
	},
}));


export default function MenuAppBar(props) {
	const classes = useStyles();

	var color;
	if (props.id === "1") color = { color: "black" };
	else color = { color: "white" };
	function useWindowSize() {
		const [size, setSize] = useState([0, 0]);
		useLayoutEffect(() => {
			function updateSize() {
				setSize([window.innerWidth, window.innerHeight]);
			}
			window.addEventListener("resize", updateSize);
			updateSize();
		}, []);
		return size;
	}
	useWindowSize();
	const handleDeconnecter = async  (e) => {
	

		console.log("on go se Deconnecter");

		await axios({
			method: "get",
			url: "http://localhost:5000/Utilisateur/Deconnection",
			withCredentials: true,
		}).then((res) => {
			if (res.status == 200) {
				window.location.href = "/Principal";
			}
		});
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				style={{ background: "transparent", boxShadow: "none" }}>
				<Toolbar className={classes.Toolbar}>
					<div className={classes.LogoBloc} onClick={(e) => {handleDeconnecter()}}>
						<img src={Logo1} className={classes.Logo} alt="fireSpot" />
					</div>

					<div className={classes.ActionBloc}>
						<div className={classes.blo}></div>
						<div className={classes.blo}>
							
						</div>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
