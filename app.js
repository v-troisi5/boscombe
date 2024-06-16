const express = require('express')
const mongoose = require('mongoose')
const app = express()

const clienti_routes = require('./routes/clienti.js')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(5000))
    .catch((err) => console.log(Error))

app.use(express.json())
app.use('/boscombe/', clienti_routes)