const mongoose = require('mongoose')

const AfferenzaSchema = new mongoose.Schema({
    sedeID: {type: mongoose.Schema.Types.ObjectId, ref: "Sede"},
    investigatoreID: {type: mongoose.Schema.Types.ObjectId, ref: "Investigatore"},
    data_insediamento: Date
})

const Afferenza = mongoose.model('Afferenza', AfferenzaSchema)

module.exports = Afferenza