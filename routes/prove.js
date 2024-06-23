const express = require('express')
const router = express.Router()

const  { 
    getProve,
    getProva,
    createProva,
    updateProva,
    deleteProva 
} = require('../controllers/prove.js')

router.get('/prove', getProve)

router.get('/prove/:provaID', getProva)

router.post('/prove', createProva) 

router.put('/prove/:provaID', updateProva) 

router.delete('/prove/:provaID', deleteProva)

module.exports = router