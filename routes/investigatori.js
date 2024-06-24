const express = require('express')
const router = express.Router()

const  { 
    getInvestigatori,
    getInvestigatore,
    createInvestigatore,
    updateInvestigatore,
    deleteInvestigatore 
} = require('../controllers/investigatori.js')

router.get('/investigatori', getInvestigatori)

router.get('/investigatori/:investigatoreID', getInvestigatore)

router.post('/investigatori/:sedeID', createInvestigatore) 

router.put('/investigatori/:investigatoreID', updateInvestigatore) 

router.delete('/investigatori/:investigatoreID', deleteInvestigatore)

module.exports = router