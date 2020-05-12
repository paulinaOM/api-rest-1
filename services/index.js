'use strict'

const jwt = require('jwt-simple')
const moment = require('moment') //Libreria para manejo de fechas en javaScript
const config= require('../config')

function createToken(user){
	const payload= {     //Uno de los datos del token. Viajan en el cliente del servidor
		sub: user._id,   //id publico del usuario
		iat: moment().unix(), //fecha de creacion del token en formato unix
		exp: moment().add(14,'days').unix() //Agregarle 14 días a la fecha en unix
	}

	return jwt.encode(payload, config.SECRET_TOKEN) //codificando. EL SEGUNDO PARÁMETRO ES EL SECRET
}

function decodeToken(token){
	//uso de promesas de forma nativa, sin librerias
	const decoded = new Promise((resolve, reject)=>{ //Resolve: promesa resuelta, reject: error
		try{
			const payload = jwt.decode(token, config.SECRET_TOKEN)

			if (payload.exp <=  moment().unix()){
				reject({
					status: 401,
					message: 'El token ha expirado'
				})
			}
			resolve(payload.sub) //else, si lo anterior no ocurre, se pasa el paylod(mensaje decodificado) y el sub(id del usuario)
		}catch(err){ //El token no es correcto o se ha modificado.
			reject({
				status: 500,
				message: 'Invalid token'
			})
		}
	}) 

	return decoded
}

module.exports = {
	createToken,
	decodeToken
}