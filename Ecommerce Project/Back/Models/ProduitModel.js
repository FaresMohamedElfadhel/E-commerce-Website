const mongoose = require('mongoose');
const Produit = new mongoose.Schema(
    {
        produit_id: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        Vendeur:{
            type: String,
            required: true,
        },
        Produit: {
            type: String,
            required: true,
            trim: true
        },
        Categorie: {
            type: String,
            required: true
        },
        Encheri: {
            type: Boolean
        },
        Description: {
            type: String,
            required: true,
        },
		prix:{
             type:Number
            },

    }
);

module.exports = mongoose.model('Produits', Produit);