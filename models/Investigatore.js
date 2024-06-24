const mongoose = require('mongoose')

const IncaricoSchema = new mongoose.Schema({
    data: Date,
    tipo_incarico: {type: String, required: true},
    costo_orario: Number,
    clienteID: {type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true}
})

const InvestigatoreSchema = new mongoose.Schema({
    matricola: {type: String, unique: true, required: true, minlength: 9, maxlength: 9},
    nominativo: String,
    data_nascita: Date,
    codice_fiscale: {type: String, unique: true, minlength: 16, maxlength: 16},
    mentore: {type: mongoose.Schema.Types.ObjectId, ref: "Investigatore"},
    incarichi: [IncaricoSchema]
})

const Incarico = mongoose.model('Incarico', IncaricoSchema)
const Investigatore = mongoose.model('Investigatore', InvestigatoreSchema)

module.exports = Incarico
module.exports = Investigatore
