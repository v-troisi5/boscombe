const mongoose = require('mongoose')
const {Incarico,Investigatore} = require('../models/Investigatore.js')

const ClienteSchema = new mongoose.Schema({
    nominativo: String,
    recapito: String,
    incarichi: [Incarico.schema]
})

const Cliente = mongoose.model('Cliente', ClienteSchema)

module.exports = Cliente