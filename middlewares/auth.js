'use strict'

const services = require('../services')

function isAuth(req, res, next){  //Next: Al ser un middleware se usa para que pase la ejecuccion de la funcionalidad al controlador final
	if(!req.headers.authorization){
		return res.status(403).send({message: 'No tienes autorización'})
	}

	const token = req.headers.authorization.split(' ')[1]//Toma el token de las cabeceras, se desglosa con el parametro split-> convierte la cabecera en un array separando por espacios
															//Queremos el elemento posicion [1] = contiene el token
	services.decodeToken(token)
		.then(response =>{ //si todo está bien, el usuario recibe la respuesta proveniente de services/index.js
			req.user = response
			next()
		})
		.catch(response =>{ //si ha ocurrido algun error
			res.status(response.status)
		})
}

module.exports = isAuth