const express = require('express')
const router = express.Router()

const  { 
    getSedi,
    getSede,
    createSede,
    updateSede,
    getEspertiInSede,
    getEspertoInSede,
    createEsperto,
    updateEsperto,
    deleteEsperto,
    getSediProveNoTest 
} = require('../controllers/sedi.js')

router.get('/sedi', getSedi)

router.get('/sedi/:sedeID', getSede)

router.post('/sedi', createSede) 

router.put('/sedi/:sedeID', updateSede) 

router.get('/sedi/:sedeID/esperti', getEspertiInSede)

router.get('/sedi/:sedeID/esperti/:espertoID', getEspertoInSede)

router.post('/sedi/:sedeID/esperti', createEsperto) 

router.put('/sedi/:sedeID/esperti/:espertoID', updateEsperto) 

router.delete('/sedi/:sedeID/esperti/:espertoID', deleteEsperto)

router.get('/sedi/prove/test/:testPrimario/:data', getSediProveNoTest)

module.exports = router