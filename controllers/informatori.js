const Informatore = require('../models/Informatore.js')
const Consulente = require('../models/Consulente.js')
const Sede = require('../models/Sede.js')
const Afferenza = require('../models/Afferenza.js')
const Collaborazione = require('../models/Collaborazione.js')
const {Incarico,Investigatore} = require('../models/Investigatore.js')

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

const deleteContattiInSede = (async function(req, res) {
    let sede = await Sede.findOne({'nome': req.params.nomeSede});
    let afferenze = await Afferenza.find({'sedeID': sede._id}).select('investigatoreID -_id');

    let investigatori = [];
    afferenze.forEach((a) => investigatori.push(a.investigatoreID));

    let collaborazioni = await Collaborazione.find({'investigatoreID':{$in: investigatori}})
                                .populate({path: 'informatoreID', match: {'paga': {$lt: 100}}})
                                .select('informatoreID -_id');

    let informatori = [];
    collaborazioni.forEach(function(c){;
        if(c.informatoreID != null)
            informatori.push(c.informatoreID);
    })

    Informatore.updateMany({'_id':{$in: informatori}}, {$set: {contatti: []}})
        .then(result => res.status(200).json({result}))
        .catch((error) => res.status(500).json({msg: 'Impossibile eseguire l\'operazione specificata'}))
})

const getInformatoriCosto = (async function (req, res){
    let incarichi = await Incarico.find({'costo_orario': {$gt: req.params.costoOrario}})
                                    .populate('investigatoreID')
                                    .select('investigatoreID -_id');
    
    console.log(incarichi);

    let investigatoriIDs = []
    incarichi.forEach((i) => investigatoriIDs.push(i.investigatoreID._id));
    investigatoriIDs = [...new Set(investigatoriIDs)];

    console.log(investigatoriIDs);

    let consulenti = await Consulente.find({'titolo_studio': {$ne: null}})
                                            .select('informatoreID -_id');

    let informatoriIDs = []
    consulenti.forEach((i) => informatoriIDs.push(i.informatoreID));
    console.log(informatoriIDs);

    let informatori = await Collaborazione.find({'investigatoreID': {$in: investigatoriIDs}, 'informatoreID': {$in: informatoriIDs}})
                                             .populate('informatoreID')
                                             .select('informatoreID -_id');
    console.log(informatori);

    let informatoriNominativi = []
    informatori.forEach((i) => informatoriNominativi.push(informatori.nome + ' ' + informatori.cognome));
    informatori = [...new Set(informatori)];

    console.log(informatori);

    res.status(200).json({informatori})
})

module.exports = {
    getInformatori,
    getInformatore,
    createInformatore,
    updateInformatore,
    deleteInformatore,
    createConsulente,
    deleteConsulente,
    deleteContattiInSede,
    getInformatoriCosto
}