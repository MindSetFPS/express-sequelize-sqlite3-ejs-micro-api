const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')
const { Food, DayMenu, Pedido, PedidoItems  } = require('./model')
const e = require('express')


router.get('/', async (req, res) => {
    console.log(dayjs().format('YYYY-MM-DD'))

    
    const formatedDate = dayjs().format('YYYY-MM-DD')
    
    try {
        await DayMenu.findOne({
            where: {
                date: formatedDate
            },
            include: [
                { model: Food, as: 'Comida1' },
                { model: Food, as: 'Comida2' }
            ]})
            .then(
                query => {
                    res.render('create-pedido', {comida1: query.Comida1, comida2: query.Comida2})
                })  
            } catch (e) {
                console.log(e)
                res.render('create-pedido', {error: 'Para crear un pedido antes tienes que crear un menu que corresponda al dia de hoy.'})
            }
        })
        
router.post('/', async (req, res) => {        
    const formatedDate = dayjs().format('YYYY-MM-DD')
    const newDate = dayjs().format('YYYY-MM-DD HH:MM:ss')

    const pedido = Pedido.build({
        customer: req.body.customerName,
        delivered: false,
        total: '',
        paid: false,
        location: req.body.customerLocation,
        createdAt: newDate
    })

    const Menu = await DayMenu.findOne({
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

    console.log( req.body )

    pedidoComida1Quantity = PedidoItems.build({
        pedidoId: pedido.id,
        foodId: food1Id,
        quantity: req.body.comida1Quantity
    })

    pedidoComida2Quantity = PedidoItems.build({
        pedidoId: pedido.id,
        foodId: food2Id,
        quantity: req.body.comida2Quantity
    })

    console.log(req.body)
    console.log(pedido)

    await pedido.save()
    await pedidoComida1Quantity.save()
    await pedidoComida2Quantity.save()

    res.redirect('/')
})

module.exports = router;