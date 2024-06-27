const mongoose = require('mongoose')

const ProvaSchema = new mongoose.Schema({
    nome: {type: String, unique: true, required: true},
    protocollo: {type: String, minLength: 5, maxLength: 5},
    data_ottenimento: Date,
    luogo_ottenimento: String,
    test_primario: String,
    sedeID: {type: mongoose.Schema.Types.ObjectId, ref: "Sede"},
    espertoID: {type: mongoose.Schema.Types.ObjectId, ref: "Esperto"},
    incaricoID: {type: mongoose.Schema.Types.ObjectId, ref: "Incarico"},
    tipologia_traccia: String,
    volatilità: String,
    categoria: String
})

const Prova = mongoose.model('Prova', ProvaSchema)

module.exports = Prova