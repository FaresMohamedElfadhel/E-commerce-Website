const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { Schema } = mongoose;
const User = new mongoose.Schema({
	client: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	mdp: {
		type: String,
		required: true,
	},
	User: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		validate: [isEmail],
		lowercase: true,
		trim: true,
	},
	type:{type: String,},
});

module.exports = mongoose.model("Utilisateurs", User);
