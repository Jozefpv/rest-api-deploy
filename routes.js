const express = require('express')
const router = express.Router()
const {Apartamento } = require('./apartamento')

router.get('/aparta', async (req, res) => {
    const apartamentos = await Apartamento.find()
    res.json(apartamentos)
})

module.exports = router