'use strict'

//Modularización:  Modelo de usuarios
const mongoose = require('mongoose')
const Schema = mongoose.Schema //utilizar esquema de mongoose
const bcrypt= require('bcrypt-nodejs') //libreria para contraseñas
const crypto = require('crypto')

const UserSchema = new Schema({
	email: {type: String, unique: true,lowercase:true},
	displayName: String,
	avatar: String,
	password: {type: String, select: false}, //Para que cada que se haga un get no envie la contraseña
	signupDate: {type: Date, default: Date.now()},
	lastLogin: Date
})

//Antes de que se guarde llamar funcion para encriptar la contraseña
UserSchema.pre('save', (next) =>{
	let user = this
	//if (!user.isModified('password')) return next() //si el usuario no ha modificado su contraseña

	bcrypt.genSalt(10, (err,salt)=>{
		if (err) return next(err)

		bcrypt.hash(user.password,salt,null,(err,hash) => {
			if (err) return next(err)

			user.password = hash

			next()
		})
	})
})//next para pasar a la sig middlewar

UserSchema.methods.gravatar = function () {
	if(!this.emai) return `https://gravatar.com/avatar/?s=200&d=retro`

	const md5 =	crypto.createHash('md5').update(this.email).digest('hex') //crear uh hash para md5. Hex= devuelve en formato hexadecimal
	return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User',UserSchema)