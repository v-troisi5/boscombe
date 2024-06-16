const mongoose = require('mongoose')

const EspertoSchema = new mongoose.Schema({
    nome: String,
    cognome: String,
    professione: String
})

const SedeSchema = new mongoose.Schema({
    nome: {type: String, unique: true, required: true},
    via: String,
    civico: Number,
    esperti: [EspertoSchema]
})

const Esperto = mongoose.model('Esperto', EspertoSchema)
const Sede = mongoose.model('Sede', SedeSchema)

SedeSchema.index(
    {nome: 1, "esperti._id": 1},
    {unique: true}
);

module.exports = Esperto
module.exports = Sede