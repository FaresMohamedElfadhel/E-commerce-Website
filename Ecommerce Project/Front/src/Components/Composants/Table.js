import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#93B7BE",
		color: theme.palette.common.black,
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

export default function CustomizedTables(props) {
	function createData(
		_id,
		produit_id,
		Encheri,
		Vendeur,
		Description,
		prix,
		Categorie,
		Produit
	) {
		return {
			_id,
			produit_id,
			Encheri,
			Vendeur,
			Description,
			prix,
			Categorie,
			Produit,
		};
	}
	const rows = [];
	props.Productss.map((prod) => {
		console.log(prod._id);
		var data = createData(
			prod._id,
			prod.produit_id,
			prod.Encheri,
			prod.Vendeur,
			prod.Description,
			prod.prix,
			prod.Categorie,
			prod.Produit
		);
		rows.push(data);
	});
	const id = props.id;

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell width={110}>produit id</StyledTableCell>
						<StyledTableCell align="center" width={110}>
							Produit
						</StyledTableCell>
						<StyledTableCell align="center" width={110}>
							Vendeur
						</StyledTableCell>
						<StyledTableCell align="center" width={110}>
							Categorie
						</StyledTableCell>
						<StyledTableCell align="center" width={110}>
							Encheri
						</StyledTableCell>
						<StyledTableCell align="center" width={110}>
							prix
						</StyledTableCell>
						<StyledTableCell align="center" width={160}>
							Description
						</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<StyledTableRow key={row.produit_id}>
							<StyledTableCell component="th" scope="row">
								{row.produit_id}
							</StyledTableCell>
							<StyledTableCell
								align="center"
								onClick={() => {
									console.log(row);
									var a = [
										row._id,
										row.produit_id,
										row.Produit,
										row.Vendeur,
										row.Categorie,
										row.Encheri,
										row.Description,
										row.prix,
									].join("/");
									alert(a);
									window.location.href = "/Produit/" + a;
									console.log("yew", row, " .");
								}}>
								{row.Produit}
							</StyledTableCell>
							<StyledTableCell
								align="center"
								onClick={() => {
									var a = [
										row._id,
										row.produit_id,
										row.Produit,
										row.Vendeur,
										row.Categorie,
										row.Encheri,
										row.Description,
										row.prix,
									].join("/");
									alert(a);
									window.location.href = "/Produit/" + a;
									console.log("yew", row, " .");
								}}>
								{row.Vendeur}
							</StyledTableCell>
							<StyledTableCell
								align="center"
								onClick={() => {
									var a = [
										row._id,
										row.produit_id,
										row.Produit,
										row.Vendeur,
										row.Categorie,
										row.Encheri,
										row.Description,
										row.prix,
									].join("/");
									alert(a);
									window.location.href = "/Produit/" + a;
									console.log("yew", row, " .");
								}}>
								{row.Categorie}
							</StyledTableCell>
							<StyledTableCell
								align="center"
								onClick={() => {
									var a = [
										row._id,
										row.produit_id,
										row.Produit,
										row.Vendeur,
										row.Categorie,
										row.Encheri,
										row.Description,
										row.prix,
									].join("/");
									alert(a);
									window.location.href = "/Produit/" + a;
									console.log("yew", row, " .");
								}}>
								{(row.Encheri && "Avec enchere") ||
									(!row.Encheri && "Sans enchere")}
							</StyledTableCell>
							<StyledTableCell
								align="center"
								onClick={() => {
									var a = [
										row._id,
										row.produit_id,
										row.Produit,
										row.Vendeur,
										row.Categorie,
										row.Encheri,
										row.Description,
										row.prix,
									].join("/");
									alert(a);
									window.location.href = "/Produit/" + a;
									console.log("yew", row, " .");
								}}>
								{(row.prix == 0 && "Aucune enchere emise") || row.prix}
							</StyledTableCell>
							<StyledTableCell
								align="center"
								onClick={() => {
									var a = [
										row._id,
										row.produit_id,
										row.Produit,
										row.Vendeur,
										row.Categorie,
										row.Encheri,
										row.Description,
										row.prix,
									].join("/");
									alert(a);
									window.location.href = "/Produit/" + a;
									console.log("yew", row, " .");
								}}>
								{row.Description}
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
