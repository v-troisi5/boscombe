const mongoose = require('mongoose')

const ConsulenteSchema = new mongoose.Schema({
    informatoreID: {type: mongoose.Schema.Types.ObjectId, ref: "Informatore"},
    area_competenza: {type: String, required: true},
    titolo_studio: String
})

const Consulente = mongoose.model('Consulente', ConsulenteSchema)

module.exports = Consulente
