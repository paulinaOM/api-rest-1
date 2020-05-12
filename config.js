module.exports={
	port: process.env.PORT || 3001,
	db: process.env.MONGOBD_URI || 'mongodb://localhost:27017/shop',
	SECRET_TOKEN: 'miclavedetokens' //lo normal es que sea una clave más larga y dificil de descifrar
}