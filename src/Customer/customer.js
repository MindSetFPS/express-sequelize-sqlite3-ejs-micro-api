const router = require('express').Router()
const Customer = require('./CustomerModel')
const { Pedido, PedidoItems } = require('../Pedido/PedidoModel')
const Food = require('../Food/FoodModel')

router.get('/all', async (req, res) => {
    console.log('New re quest for /customer/all')
    const customers = await Customer.findAll({
        include: {
            model: Pedido,
            attributes: ['id'],
            include: {
                model: Food,
                attributes: ['id', 'name'],
                through: {
                    attributes: ['quantity']
                }
            }
        }
    }).catch(e => console.error(e))
    res.json(customers)
})

router.get('/:id', async (req, res) => {
    console.log('New request for /customer/:id')
    console.log(req.params)
    
    const customer = await Customer.findOne({
        where: {
            id: req.params.id
        }
    })

    //how mouch has this customer bought for the last 30 days
    const pedidos = await Pedido.findAll({
        where: {
            customerId: req.params.id
        },
        include:{
            model: Food,
            through: {
                attributes: ['quantity']
            }
        }
    })
    console.log(customer)
    res.json({ok: true, customer: customer, pedidos: pedidos})
})

module.exports = router