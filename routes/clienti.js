const express = require('express')
const router = express.Router()

const  { 
    getClienti,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente,
    getMentoriIncarichi
} = require('../controllers/clienti.js')

router.get('/clienti', getClienti)

router.get('/clienti/:clienteID', getCliente)

router.post('/clienti', createCliente) 

router.put('/clienti/:clienteID', updateCliente) 

router.delete('/clienti/:clienteID', deleteCliente)

router.get('/clienti/:clienteID/incarichi/:tipoIncarico', getMentoriIncarichi)

module.exports = router