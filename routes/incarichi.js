const express = require('express')
const router = express.Router()

const  { 
    getIncarichi,
    getIncarico,
    createIncarico,
    updateIncarico,
    deleteIncarico 
} = require('../controllers/incarichi.js')

router.get('/incarichi', getIncarichi)

router.get('/incarichi/:incaricoID', getIncarico)

router.post('/incarichi', createIncarico) 

router.put('/incarichi/:incaricoID', updateIncarico) 

router.delete('/incarichi/:incaricoID', deleteIncarico)

module.exports = router