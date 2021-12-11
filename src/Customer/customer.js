const router = require('express').Router()
const Customer = require('./CustomerModel')


router.get('/all', async (req, res) => {
    console.log('New request for /customer/all')
    const customers = await Customer.findAll().catch( e => console.error(e))
    res.json(customers)
})

router.post('/', async (req, res) => {

})

module.exports = router