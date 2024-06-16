const mongoose = require('mongoose')

const IncaricoSchema = new mongoose.Schema({
    data: Date,
    tipo_incarico: {type: String, required: true},
    costo_orario: Number
})

const ClienteSchema = new mongoose.Schema({
    nominativo: String,
    recapito: String,
    incarichi: [IncaricoSchema]
})

const Incarico = mongoose.model('Incarico', IncaricoSchema)
const Cliente = mongoose.model('Cliente', ClienteSchema)

ClienteSchema.index(
    {_id: 1, "incarichi.data": 1},
    {unique: true}
);

module.exports = Incarico
module.exports = Cliente