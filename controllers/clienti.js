const Cliente = require('../models/Cliente.js')
const Afferenza = require('../models/Afferenza.js')
const {Incarico,Investigatore} = require('../models/Investigatore.js')
const Informatore = require('../models/Informatore.js')
const Collaborazione = require('../models/Collaborazione.js')

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

const getMentoriIncarichi = (async function (req, res){
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

const getClientiInfCosto = (async function (req, res){
    let incarichi = await Incarico.find({'costo_orario': req.params.costoOrario})
                                    .populate('investigatoreID')
                                    .select('investigatoreID -_id');
    
    let investigatoriIDs = []
    incarichi.forEach((i) => investigatoriIDs.push(i.investigatoreID._id));

    let informatoriIDs = await Informatore.find({'titolo_studio': {$ne: null}})
                                            .select('_id');

    let informatori = await Collaborazione.find({'investigatoreID': {$in: investigatoriIDs}, 'informatoreID': {$in: informatoriIDs}})
                                             .populate('informatoreID')
                                             .select('informatoreID -_id');
    let informatoriNominativi = []
    informatori.forEach((i) => informatoriNominativi.push(informatori.informatoreID.nome + ' ' + informatori.informatoreID.cognome));
    informatori = [...new Set(informatori)];

    res.status(200).json({informatori})
})

module.exports = {
    getClienti,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente,
    getMentoriIncarichi,
    getClientiInfCosto
}