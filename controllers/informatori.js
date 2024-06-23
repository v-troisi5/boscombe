const Informatore = require('../models/Informatore.js')
const Consulente = require('../models/Consulente.js')

const getInformatori = ((req, res) => {
    Informatore.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getInformatore = ((req, res) => {
    Informatore.findOne({ _id: req.params.informatoreID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Informatore non trovato'}))
})

const createInformatore = ((req, res) => {
    Informatore.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({msg:  error }))
})

const updateInformatore = ((req, res) => {
    Informatore.findOneAndUpdate({ _id: req.params.informatoreID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Informatore non trovato'}))
})

const deleteInformatore = ((req, res) => {
    Informatore.findOneAndDelete({ _id: req.params.informatoreID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Informatore non trovato'}))
})

const createConsulente = (async function(req, res) {
    let informatore = new Informatore(req.body);
    await informatore.save();

    informatoreID = informatore._id;

    let consulente = new Consulente(req.body);
    consulente.$set('informatoreID', informatoreID);
    await consulente.save()
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({msg: error}))
})

const deleteConsulente = (async function(req, res) {
    let consulente = await Consulente.findOneAndDelete({'informatoreID': req.params.consulenteID});
    let informatore = await Informatore.findByIdAndDelete(req.params.consulenteID)
        .then(result => res.status(200).json({result}))
        .catch((error) => res.status(404).json({msg: 'Consulente non trovato'}))
})

module.exports = {
    getInformatori,
    getInformatore,
    createInformatore,
    updateInformatore,
    deleteInformatore,
    createConsulente,
    deleteConsulente
}