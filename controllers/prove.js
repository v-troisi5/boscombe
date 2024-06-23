const Prova = require('../models/Prova.js')

const getProve = ((req, res) => {
    Prova.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getProva = ((req, res) => {
    Prova.findOne({ _id: req.params.provaID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Prova non trovato'}))
})

const createProva = ((req, res) => {
    Prova.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({msg:  error }))
})

const updateProva = ((req, res) => {
    Prova.findOneAndUpdate({ _id: req.params.provaID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Prova non trovato' }))
})

const deleteProva = ((req, res) => {
    Prova.findOneAndDelete({ _id: req.params.provaID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Prova non trovato' }))
})


module.exports = {
    getProve,
    getProva,
    createProva,
    updateProva,
    deleteProva
}