import { React, useContext, useEffect, useState } from "react";
import axios from 'axios';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";

import Produits from "./Components/Pages/Produits";
import Produit from "./Components/Pages/Produit";
import Login from "./Components/Pages/Login";
import SignUp from "./Components/Pages/SignUp";
import User from "./Components/UserContext";
function App() {
	var us = {
		client: "",
		User: "",
		email: "",
		type: "",
	};
	const [user, setUser] = useState(us);
	useEffect(() => {
		const GetInfo = async () => {
			console.log('on get les info')
			await axios({
				method: "get",
				url: "http://localhost:5000/Utilisateur/RecupCl",
				withCredentials: true,
			})
				.then((res) => {
					console.log("recupe données client ", res.status);
					if (res.status == 201) {
						if (
							window.location.href != "http://localhost:3000/Login" &&
							window.location.href != "http://localhost:3000/Principal" &&
							window.location.href != "http://localhost:3000/SignUp"
						)
							window.location.href = "/Login";
					}
					if (res.status == 200) {
						console.log("*************************************");
						console.log(res.data);
						console.log("*************************************");
						us.client = res.data.client;
						us.User = res.data.User;
						us.email = res.data.email;
						us.type = res.data.type;
						setUser(us);
						console.log("Notre utilisateur ", us);
						console.log("Notre utilisateur contexte", User);
					}
				})
				.catch((err) => {
					console.log("thardet", err);
				});
		};

		GetInfo();
	}, []);
	return (
		<User.Provider value={user}>
			<Router>
				<div className="App">
					<div className="principal">
						<Switch>
							<Route path="/Principal">{<Login />}</Route>
							<Route path="/Produits">{<Produits />}</Route>
							<Route path="/SignUp">{<SignUp />}</Route>
							<Route path="/Produit/:id/:produit_id/:Produit/:Vendeur/:Categorie/:Encheri/:Description/:prix">
								{<Produit />}
							</Route>

							<Redirect to="/Principal" />
						</Switch>
					</div>
				</div>
			</Router>
		</User.Provider>
	);
}

export default App;
