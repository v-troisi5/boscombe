const express = require('express')
const router = express.Router()

const  { 
    getInformatori,
    getInformatore,
    createInformatore,
    updateInformatore,
    deleteInformatore,
    createConsulente,
    deleteConsulente,
    deleteContattiInSede
} = require('../controllers/informatori.js')

router.get('/informatori', getInformatori)

router.get('/informatori/:informatoreID', getInformatore)

router.post('/informatori', createInformatore) 

router.put('/informatori/:informatoreID', updateInformatore) 

router.delete('/informatori/:informatoreID', deleteInformatore)

router.post('/informatori/consulenti', createConsulente) 

router.delete('/informatori/consulenti/:consulenteID', deleteConsulente) 

router.delete('/informatori/contattiSede/:nomeSede', deleteContattiInSede) 

module.exports = router