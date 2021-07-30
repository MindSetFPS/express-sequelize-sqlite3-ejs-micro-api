const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')
const e = require('express')

const isAuth = require('../auth/passport')

const Calendar = require('../Calendar/CalendarModel')
const Customer = require('../Customer/CustomerModel')
const Food = require('../Food/FoodModel')
const {Location} = require('./PedidoModel')

const {  Pedido, PedidoItems  } = require('./PedidoModel')
        
router.post('/', async (req, res) => {
    const formatedDate = dayjs().format('YYYY-MM-DD')
    const newDate = dayjs().format('YYYY-MM-DD HH:MM:ss')

    const [pedidoLocation, created] = await Location.findOrCreate({
        where: {
            name: req.body.customerLocation
        }
    }).catch( e => console.error(e))

    const [pedidoCustomer, createdCustomer] = await Customer.findOrCreate({
        where: {
            name: req.body.customerName.trim()
        }
    }).catch( e => console.error(e) )

    const pedido = Pedido.build({
        customerId: pedidoCustomer.id,
        delivered: false,
        total: '',
        paid: false,
        locationId: pedidoLocation.id,
        createdAt: newDate
    })

    const Menu = await Calendar.findOne({
        where: {
            date: formatedDate  
        },
        include: [
            {model: Food, as: 'Comida1'},
            {model: Food, as: 'Comida2'}

        ]
    }).catch( e => console.error(e))

    const food1Id = Menu.Comida1.id
    const food2Id = Menu.Comida2.id

    pedidoComida1Quantity = PedidoItems.build({
        pedidoId: pedido.id,
        foodId: food1Id,
        quantity: req.body.comida1Quantity || 0
    })

    pedidoComida2Quantity = PedidoItems.build({
        pedidoId: pedido.id,
        foodId: food2Id,
        quantity: req.body.comida2Quantity || 0
    })

    await pedido.save()
    await pedidoComida1Quantity.save()
    await pedidoComida2Quantity.save()

    res.redirect('/')
})

module.exports = router;