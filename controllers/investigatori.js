const Afferenza = require('../models/Afferenza.js')
const Investigatore = require('../models/Investigatore.js')

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
    Afferenza.create({'sedeID': req.params.sedeID, 'investigatoreID': investigatore._id})
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
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Investigatore non trovato' }))
})


module.exports = {
    getInvestigatori,
    getInvestigatore,
    createInvestigatore,
    updateInvestigatore,
    deleteInvestigatore
}