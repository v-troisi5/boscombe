const mongoose = require('mongoose')

const IncaricoSchema = new mongoose.Schema({
    data: Date,
    tipo_incarico: {type: String, required: true},
    costo_orario: Number,
    clienteID: {type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true}
})

const Incarico = mongoose.model('Incarico', IncaricoSchema)

IncaricoSchema.index(
    {_id: 1, clienteID: 1},
    {unique: true}
);

module.exports = Incarico