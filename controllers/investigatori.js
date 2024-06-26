const Sede = require('../models/Sede.js')
const Afferenza = require('../models/Afferenza.js')
const Collaborazione = require('../models/Collaborazione.js')
const Informatore = require('../models/Informatore.js')
const Consulente = require('../models/Consulente.js')
const Cliente = require('../models/Cliente.js')
const {Incarico,Investigatore} = require('../models/Investigatore.js')

const getInvestigatori = ((req, res) => {
    Investigatore.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getInvestigatore = ((req, res) => {
    Investigatore.findOne({ _id: req.params.investigatoreID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Investigatore non trovato'}))
})

const createInvestigatore = (async function(req, res){
    let investigatore = await Investigatore.create(req.body);

    await Afferenza.create({'sedeID': req.params.sedeID, 'investigatoreID': investigatore._id});

    let incarichi = await Incarico.create(req.body.incarichi);
    let incarichiIDs = [];
    incarichi.forEach((i) => incarichiIDs.push(i._id));
    
    Incarico.updateMany({'_id':{$in: incarichiIDs}}, {$set: {'investigatoreID': investigatore._id}})
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({msg:  error }))
})

const updateInvestigatore = ((req, res) => {
    Investigatore.findOneAndUpdate({ _id: req.params.investigatoreID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Investigatore non trovato' }))
})

const deleteInvestigatore = ((req, res) => {
    Investigatore.findOneAndDelete({ _id: req.params.investigatoreID })
        .then(result => Afferenza.deleteMany({'investigatoreID': result._id}))
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Investigatore non trovato' }))
})

const createIncarico = (async function(req, res){
    let incarico = await Incarico.create(req.body);

    Cliente.findOneAndUpdate({ _id: incarico.clienteID }, {$push: {incarichi: incarico}}, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({msg: 'Impossibile creare l\'incarico'}))
})

const updateSedeCriminologia = (async function(req, res){
    let consulenti = await Consulente.find({'area_competenza': 'Criminologia'}).select('informatoreID -_id');

    let consulentiIDs = [];
    consulenti.forEach((c) => consulentiIDs.push(c.informatoreID));

    let informatori = await Informatore.where({'_id': {$in: consulentiIDs}, 'contatti.0': {'$exists': true }}).select('_id');

    let informatoriIDs = [];
    informatori.forEach((i) => informatoriIDs.push(i._id));

    let collaborazioni = await Collaborazione.find({'informatoreID': {$in: informatoriIDs}})
                                .populate('investigatoreID')
                                .select('investigatoreID -_id');
    
    let investigatoriIDs = [];
    collaborazioni.forEach((c) => investigatoriIDs.push(c.investigatoreID._id));

    Afferenza.deleteMany({'investigatoreID':{$in: investigatoriIDs}})
        .then(result => res.status(200).json({result}))
        .catch((error) => res.status(500).json({msg: 'Impossibile eseguire l\'operazione specificata'}))  
})


module.exports = {
    getInvestigatori,
    getInvestigatore,
    createInvestigatore,
    updateInvestigatore,
    deleteInvestigatore,
    createIncarico,
    updateSedeCriminologia
}