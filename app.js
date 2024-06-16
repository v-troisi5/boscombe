const express = require('express')
const mongoose = require('mongoose')
const app = express()

//temporaneo, qui mettere l'index principale dell'applicazione
const clienti_routes = require('./routes/clienti.js')
const incarichi_routes = require('./routes/incarichi.js')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(5000))
    .catch((err) => console.log(Error))

app.use(express.json())
app.use('/boscombe/', clienti_routes)
app.use('/boscombe/', incarichi_routes)