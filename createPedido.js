const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')
const { Food, DayMenu, Pedido, PedidoItems  } = require('./model')
const e = require('express')


router.get('/', async (req, res) => {
    console.log(dayjs().format('YYYY-MM-DD'))

    const date = new Date()

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
    }
})

router.post('/', async (req, res) => {

    const pedido = Pedido.build({
        customer: req.body.customerName,
        delivered: false,
        total: '',
        paid: false,
        location: req.body.customerLocation
    })

    console.log(req.body)
    console.log(pedido)

    await pedido.save()

    res.redirect('/')
})

module.exports = router;