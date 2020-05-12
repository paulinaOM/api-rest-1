//Controlador encargado del registor y autenticacion de usuarios en la APIRest

'use strict'

const User =require('../models/user')
const service = require('../services')

function signUp(req, res){
 const user = new User({
 	email: req.body.email,
 	displayName: req.body.displayName,
 	password: req.body.password

 })
 user.save((err)=>{
 	if (err) res.status(500).send({message: `Error al crear el usuario: ${err}`})

	return res.status(201).send({token: service.createToken(user)}) //los servicios ayudan a crear funciones que serán repetidas a a lo largo del codigo
 })
}

function signIn(req, res){ //buscar en la bd los usuarios que tengan un email determinado, si lo encuentra se dará acceso creando un token que viajárá en la cabecera
	User.find({email: req.body.email}, (err, user)=>{
		if (err) return res.status(500).send({message: err})
		if (!user) return res.status(404).send({message: 'No existe el usuario'}) //Si no existe el usuario

		req.user=user
		res.status(200).send({
			message: 'Te has logueado correctamente',
			token: service.createToken(user)
		})
	})
}

module.exports ={
	signUp,
	signIn
}