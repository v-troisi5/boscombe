const express = require('express')
const mongoose = require('mongoose')
const app = express()

const clienti_routes = require('./routes/clienti.js')
const incarichi_routes = require('./routes/incarichi.js')
const sedi_routes = require('./routes/sedi.js')
const investigatori_routes = require('./routes/investigatori.js')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(5000))
    .catch((err) => console.log(Error))

app.use(express.json())
app.use('/boscombe/', clienti_routes)
app.use('/boscombe/', incarichi_routes)
app.use('/boscombe/', sedi_routes)
app.use('/boscombe/', investigatori_routes)