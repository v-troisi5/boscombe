const mongoose = require('mongoose')

const InvestigatoreSchema = new mongoose.Schema({
    matricola: {type: String, unique: true, required: true, minlength: 9, maxlength: 9},
    nominativo: String,
    data_nascita: Date,
    codice_fiscale: {type: String, unique: true, minlength: 16, maxlength: 16},
    mentore: {type: mongoose.Schema.Types.ObjectId, ref: "Investigatore"}
})

const Investigatore = mongoose.model('Investigatore', InvestigatoreSchema)

module.exports = Investigatore