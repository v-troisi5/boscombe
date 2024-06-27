const Prova = require('../models/Prova.js')
const {Incarico,Investigatore} = require('../models/Investigatore.js')
const Afferenza = require('../models/Afferenza.js')

const getProve = ((req, res) => {
    Prova.find({})
        .then(result => res.status(200).json({result}))
        .catch(error => res.status(500).json({msg: error}))
})

const getProva = ((req, res) => {
    Prova.findOne({ _id: req.params.provaID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Prova non trovata'}))
})

const createProva = ((req, res) => {
    Prova.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({msg:  error}))
})

const updateProva = ((req, res) => {
    Prova.findOneAndUpdate({ _id: req.params.provaID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Prova non trovata'}))
})

const deleteProva = ((req, res) => {
    Prova.findOneAndDelete({ _id: req.params.provaID })
        .then(result => res.status(200).json({result}))
        .catch((error) => res.status(404).json({msg: 'Prova non trovata'}))
})

const getProveVolatili = (async function(req, res){
    let prove = await Prova.find({'volatilità': 'Massima', 'sedeID': req.params.sedeID})
                            .populate('sedeID')
                            .select('sedeID -_id')
                            .catch((error) => res.status(404).json({msg: error}))


    console.log(prove);
                            
    let esperti = [];
    prove.forEach((p) => esperti.push(p.sedeID.esperti))
    esperti = [...new Set(esperti)];
    
    res.status(200).json({esperti}); 
})


module.exports = {
    getProve,
    getProva,
    createProva,
    updateProva,
    deleteProva,
    getProveVolatili
}