const router = require('express').Router()
const Customer = require('./CustomerModel')


router.get('/', async (req, res) => {
    const customers = await Customer.findAll().catch( e => console.error(e))
    res.json(customers)
})

router.post('/', async (req, res) => {

})

module.exports = router