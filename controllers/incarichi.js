const Incarico = require('../models/Incarico.js')

const getIncarichi = ((req, res) => {
    Incarico.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getIncarico = ((req, res) => {
    Incarico.findOne({ _id: req.params.incaricoID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Incarico non trovato'}))
})

const createIncarico = ((req, res) => {
    Incarico.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({msg:  error }))
})

const updateIncarico = ((req, res) => {
    Incarico.findOneAndUpdate({ _id: req.params.incaricoID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Incarico non trovato' }))
})

const deleteIncarico = ((req, res) => {
    Incarico.findOneAndDelete({ _id: req.params.incaricoID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Incarico non trovato' }))
})


module.exports = {
    getIncarichi,
    getIncarico,
    createIncarico,
    updateIncarico,
    deleteIncarico
}