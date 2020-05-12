'use strict'
const Product =require('../models/product')

//Modularización: Controladores que acceden a la información de la BD

function getProduct(req, res){
	let productId= req.params.productId //viene como parametro en el url

	Product.findById(productId,(err,product)=>{ //recibe el id, un error si existira y producto si lo encuentra
		if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
		if (!product) return res.status(404).send({message:`El producto no existe`})

		res.status(200).send({product}) //si la clave y el valor de la variable tienen el mismo nombre puede reducirse en lugar de escribir: send({product: product})

	})	
}

function getProducts(req, res){
	Product.find({},(err,products)=>{
		if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
		if (!products) return res.status(404).send({message:`No existen productos`})

		res.status(200).send({products})
	})		
}

function saveProduct(req,res){
	console.log('POST /api/product')
	console.log(req.body) //Accesar al cuerpo de la peticion

	let product= new Product() //Crear una variable produc que sea de tipo Product
	product.name= req.body.name //el nombre del producto esta en el cuerpo de lapeticion
	product.picture= req.body.picture
	product.price= req.body.price
	product.category = req.body.category
	product.description= req.body.description

	product.save((err, productStored)=>{ //Recibe funcion de callback para indicar que se ha salvado
		if (err) res.status(500).send({message: `Error al salvar la base de datos: ${err}`})

		res.status(200).send({product: productStored})
	})
}

function updateProduct(req, res){
	let productId= req.params.productId
	let update = req.body

	Product.findByIdAndUpdate(productId, update,(err, productUpdated)=>{ //se pasa un objeto con los campos a actualizar (se encuentran en el body)
		if (err) res.status(500).send({message: `Error al actualizar el producto ${err}`})
		
		res.status(200).send({product: productUpdated})
	})
}

function deleteProduct(req, res){
	let productId= req.params.productId

	Product.findById(productId,(err, product)=>{
		if (err) res.status(500).send({message: `Error al borrar el producto ${err}`})
		
		product.remove(err=>{
			if (err) res.status(500).send({message: `Error al borrar el producto ${err}`})
			res.status(200).send({message: `El producto ha sido eliminado`})				
		})
	})
}

module.exports = {
	getProduct,
	getProducts,
	saveProduct,
	updateProduct,
	deleteProduct
}