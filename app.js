const express = require('express')
const mongoose = require('mongoose')
const app = express()

const clienti_routes = require('./routes/clienti.js')
const sedi_routes = require('./routes/sedi.js')
const investigatori_routes = require('./routes/investigatori.js')
const prove_routes = require('./routes/prove.js')
const informatori_routes = require('./routes/informatori.js')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(5000))
    .catch((err) => console.log(Error))

app.use(express.json())
app.use('/boscombe/', clienti_routes)
app.use('/boscombe/', sedi_routes)
app.use('/boscombe/', investigatori_routes)
app.use('/boscombe/', prove_routes)
app.use('/boscombe/', informatori_routes)

app.get('/boscombe', function(request, response){
    response.sendFile('index.html',  {root: './web'});
});
app.get('/boscombe/styles.css', function(request, response){
    response.sendFile('styles.css',  {root: './web'});
});
app.get('/boscombe/script.js', function(request, response){
    response.sendFile('script.js',  {root: './web'});
});
app.get('/boscombe/op.js', function(request, response){
    response.sendFile('op.js',  {root: './web'});
});