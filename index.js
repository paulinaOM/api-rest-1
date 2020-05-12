'use strict'

//Modularización: Parte que se conecta a la base de datos
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')


mongoose.connect(config.db,(err,res)=>{ //URL de la base de datos
 	if (err) {
 		return console.log(`Error al conectarse a la base de datos ${err}`)
 	}
	console.log('Conexion a la base de datos establecida')

	app.listen(config.port,()=>{ //arrow sustituye a la palabra function
		console.log(`API REST corriendo en http://localhost:${config.port}`)
	})
})

/*Añadir las peticiones o escuchas.
Parámetros: url , callback, para finalizar la peticion agregar que se enviará*/
/*app.get('/hola/:name',(req,res)=>{ //siempre que pongamos dos puntos son parámetros
	res.send({message: `Hola ${req.params.name}!`})
})*/



