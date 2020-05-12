'use stric'

//Modularización:  Modelo de productos
const mongoose = require('mongoose')
const Schema = mongoose.Schema //utilizar esquema de mongoose

const ProductSchema =Schema({
	name: String,
	picture: String,
	price: {type: Number, default: 0},
	category: {type: String, enum: ['computers', 'phones', 'accesories']}, //la categoria será solo una de esas
	description: String,
})

module.exports= mongoose.model('Product', ProductSchema )//para exportar el modelo se indica el nombre y el esquema. Así desde el resto de la aplicación será accesible el modelo importándolo
