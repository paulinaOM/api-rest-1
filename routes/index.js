'use strict'

const express = require ('express') //Lee en la carpeta node modules donde está express y lo importa
const productCtrl = require('../controllers/product')
const userCtrl= require('../controllers/user')
const auth= require('../middlewares/auth')
const api = express.Router()

//Modularización: Desarrollar las rutas: tipo get, post y put
api.get('/product', productCtrl.getProducts)
api.get('/product/:productId',productCtrl.getProduct)
api.post('/product',auth, productCtrl.saveProduct)
api.put('/product/:productId', auth, productCtrl.updateProduct) //para actualizar un producto
api.delete('/product/:productId', auth, productCtrl.deleteProduct)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private',auth, (req,res)=>{
	res.status(200).send({message: 'Tienes acceso'})
})

module.exports = api