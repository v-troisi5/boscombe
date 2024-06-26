const Cliente = require('../models/Cliente.js')
const Afferenza = require('../models/Afferenza.js')
const {Incarico,Investigatore} = require('../models/Investigatore.js')

const getClienti = ((req, res) => {
    Cliente.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getCliente = ((req, res) => {
    Cliente.findOne({ _id: req.params.clienteID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Cliente non trovato'}))
})

const createCliente = ((req, res) => {
    Cliente.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({msg:  error }))
})

const updateCliente = ((req, res) => {
    Cliente.findOneAndUpdate({ _id: req.params.clienteID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Cliente non trovato' }))
})

const deleteCliente = ((req, res) => {
    Cliente.findOneAndDelete({ _id: req.params.clienteID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Cliente non trovato' }))
})

const getAfferenzeMentoriIncarichi = (async function (req, res){
    let incarichi = await Incarico.find({'clienteID': req.params.clienteID, 'tipo_incarico': req.params.tipoIncarico})
                                    .populate('investigatoreID')
                                    .select('investigatoreID -_id')

    let mentoriIDs = []
    incarichi.forEach((i) => mentoriIDs.push(i.investigatoreID.mentore));

    Afferenza.find({'investigatoreID': {$in: mentoriIDs}})
             .populate('sedeID')
             .then(result => res.status(200).json({ result }))
             .catch((error) => res.status(500).json({msg: error}))
})

const getIncarichiOrd = (async function (req, res){
    Cliente.aggregate(
        [
            {
                '$unwind': {'path' : '$incarichi'}
            },
            {
                '$match': { 
                    'nominativo': req.params.nominativo,
                    'incarichi.tipo_incarico': req.params.tipoIncarico
                }
            },
            {
                '$group': { 
                    '_id': '$incarichi.data',
                    'sommaCostiOrari': {
                        $sum: "$incarichi.costo_orario"
                    }
                }
            },
            {
                '$sort': { 
                    'incarichi_data': 1
                }
            }
        ]
    )
    .then(result => res.status(200).json({result}))
    .catch((error) => res.status(500).json({msg: error}))
})

module.exports = {
    getClienti,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente,
    getAfferenzeMentoriIncarichi,
    getIncarichiOrd
}