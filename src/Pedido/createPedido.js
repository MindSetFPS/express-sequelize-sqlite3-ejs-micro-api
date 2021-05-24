const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')

const {  Pedido, PedidoItems  } = require('./PedidoModel')
const Calendar = require('../Calendar/CalendarModel')
const Food = require('../Food/FoodModel')
const {Location} = require('./PedidoModel')

const e = require('express')


router.get('/', async (req, res) => {
    console.log(dayjs().format('YYYY-MM-DD'))

    
    const formatedDate = dayjs().format('YYYY-MM-DD')
    
    try {
        await Calendar.findOne({
            where: {
                date: formatedDate
            },
            include: [
                { model: Food, as: 'Comida1' },
                { model: Food, as: 'Comida2' }
            ]})
            .then(
                query => {
                    res.render('pedido-create', {comida1: query.Comida1, comida2: query.Comida2})
                })  
            } catch (e) {
                console.log(e)
                res.render('pedido-create', {error: 'Para crear un pedido antes tienes que crear un menu que corresponda al dia de hoy.'})
            }
        })
        
router.post('/', async (req, res) => {

    const formatedDate = dayjs().format('YYYY-MM-DD')
    const newDate = dayjs().format('YYYY-MM-DD HH:MM:ss')

    const [pedidoLocation, created] = await Location.findOrCreate({
        where: {
            name: req.body.customerLocation
        }
    }).catch( e => console.log(e))

    console.log(pedidoLocation)


    const pedido = Pedido.build({
        customer: req.body.customerName,
        delivered: false,
        total: '',
        paid: false,
        locationId: pedidoLocation.id,
        createdAt: newDate
    })

    console.log(pedido)

    const Menu = await Calendar.findOne({
        where: {
            date: formatedDate  
        },
        include: [
            {model: Food, as: 'Comida1'},
            {model: Food, as: 'Comida2'}

        ]
    }).catch( e => console.log(e))

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