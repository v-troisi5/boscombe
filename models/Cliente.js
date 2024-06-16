const mongoose = require('mongoose')

const ClienteSchema = new mongoose.Schema({
    nominativo: String,
    recapito: String
})

const Cliente = mongoose.model('Cliente', ClienteSchema)

module.exports = Cliente