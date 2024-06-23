const mongoose = require('mongoose')

const CollaborazioneSchema = new mongoose.Schema({
    informatoreID: {type: mongoose.Schema.Types.ObjectId, ref: "Informatore"},
    investigatoreID: {type: mongoose.Schema.Types.ObjectId, ref: "Investigatore"}
})

const Collaborazione = mongoose.model('Collaborazione', CollaborazioneSchema)

module.exports = Collaborazione