'use strict'

//Modularización: Parte de la configuración con express
const express = require ('express') //Lee en la carpeta node modules donde está express y lo importa
const bodyParser = require('body-parser') //Al hacer peticiones de tipo post permite parsear el cuerpo de la petición
const hbs = require('express-handlebars')
const app = express()
const api = require('./routes')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use('/api',api)

app.engine('.hbs', hbs({  //Por defecto busca en la capeta views los layouts que utilizará
  defaultLayout: 'default',
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/', (req, res) => {
  res.render('product')
})


module.exports = app