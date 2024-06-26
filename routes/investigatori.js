const express = require('express')
const router = express.Router()

const  { 
    getInvestigatori,
    getInvestigatore,
    createInvestigatore,
    updateInvestigatore,
    deleteInvestigatore,
    updateSedeCriminologia,
    createIncarico 
} = require('../controllers/investigatori.js')

router.get('/investigatori', getInvestigatori)

router.get('/investigatori/:investigatoreID', getInvestigatore)

router.post('/investigatori/create/:sedeID', createInvestigatore) 

router.put('/investigatori/:investigatoreID', updateInvestigatore) 

router.delete('/investigatori/:investigatoreID', deleteInvestigatore)

router.put('/investigatori/sedi/criminologia', updateSedeCriminologia) 

router.post('/investigatori/incarichi', createIncarico) 

module.exports = router