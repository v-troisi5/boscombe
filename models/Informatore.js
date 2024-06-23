const mongoose = require('mongoose')

const ContattoSchema = new mongoose.Schema({
    id_contatto: {type: String, unique: true, required: true},
    tipo_contatto: {type: String, required: true}
})

const InformatoreSchema = new mongoose.Schema({
    codice_fiscale: {type: String, unique: true, required: true, minlength: 16, maxlength: 16},
    nome: {type: String, required: true},
    cognome: {type: String, required: true},
    paga: Number,
    descrizione: String,
    contatti: [ContattoSchema]
})

const Contatto = mongoose.model('Contatto', ContattoSchema)
const Informatore = mongoose.model('Informatore', InformatoreSchema)

module.exports = Contatto
module.exports = Informatore
