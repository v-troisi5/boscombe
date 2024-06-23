const express = require('express')
const router = express.Router()

const  { 
    getInformatori,
    getInformatore,
    createInformatore,
    updateInformatore,
    deleteInformatore 
} = require('../controllers/informatori.js')

router.get('/informatori', getInformatori)

router.get('/informatori/:informatoreID', getInformatore)

router.post('/informatori', createInformatore) 

router.put('/informatori/:informatoreID', updateInformatore) 

router.delete('/informatori/:informatoreID', deleteInformatore)

module.exports = router