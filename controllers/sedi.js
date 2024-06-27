const Sede = require('../models/Sede.js')
const Prova = require('../models/Prova.js')
const {Incarico,Investigatore} = require('../models/Investigatore.js')
const Afferenza = require('../models/Afferenza.js')

const getSedi = ((req, res) => {
    Sede.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getSede = ((req, res) => {
    Sede.findOne({_id: req.params.sedeID})
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Sede non trovata'}))
})

const createSede = ((req, res) => {
    Sede.create(req.body)
        .then(result => res.status(200).json({result}))
        .catch((error) => res.status(500).json({msg:  error }))
})

const updateSede = ((req, res) => {
    Sede.findOneAndUpdate({_id: req.params.sedeID}, req.body, {new: true, runValidators: true})
        .then(result => res.status(200).json({result}))
        .catch((error) => res.status(404).json({msg: 'Sede non trovata' }))
})

const getEspertiInSede = ((req, res) => {
    Sede.findById({_id: req.params.sedeID})
        .then(result => res.status(200).json(result.esperti))
        .catch(error => res.status(500).json({msg: error}))
})

const getEspertoInSede = ((req, res) => {
    Sede.findById({_id: req.params.sedeID})
        .then(result => res.status(200).json(result.esperti.id(req.params.espertoID)))
        .catch(error => res.status(500).json({msg: error}))
})

const createEsperto = ((req, res) => {
    Sede.findOneAndUpdate({_id: req.params.sedeID}, {$push: {esperti: req.body}}, {new: true, runValidators: true})
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: error}))
})

const updateEsperto = ((req, res) => {
    Sede.findOneAndUpdate({'esperti._id': req.params.espertoID}, {$set: {"esperti.$": req.body}}, {new: true, runValidators: true})
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: error}))
})

const deleteEsperto = ((req, res) => {
    Sede.findOneAndUpdate({_id: req.params.sedeID}, {$pull: {esperti: {_id: req.params.espertoID}}}, {new: true, runValidators: true})
        .then(Prova.updateMany({'espertoID': req.params.espertoID}, {$set: {espertoID: null}}))
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: error}))
})

const getSediProveNoTest = (async function(req, res){
    let prove = await Prova.find({'test_primario': req.params.testPrimario})
                            .populate('incaricoID')
                            .select('incaricoID -_id');

    let investigatoriIDs = [];
    prove.forEach((p) => investigatoriIDs.push(p.incaricoID.investigatoreID));
    
    let investigatori = await Investigatore.where({'_id': {$in: investigatoriIDs}, 'incarichi.1': {'$exists': true }})
                                            .select('_id');
                                            
    investigatoriIDs = [];
    investigatori.forEach((p) => investigatoriIDs.push(p._id));

    Afferenza.where({'investigatoreID': {$in: investigatoriIDs}, 'data_insediamento.$date': {$lt: req.params.data}})
            .populate('sedeID')
            .select('sedeID -_id')
            .then(result => res.status(200).json({result}))
            .catch((error) => res.status(404).json({msg: error}));
})

module.exports = {
    getSedi,
    getSede,
    createSede,
    updateSede,
    getEspertiInSede,
    getEspertoInSede,
    createEsperto,
    updateEsperto,
    deleteEsperto,
    getSediProveNoTest
}