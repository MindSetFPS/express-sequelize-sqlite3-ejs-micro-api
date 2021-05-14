const router = require('express').Router()
const date = require('dayjs')
const localizedFormat = require('dayjs/plugin/localizedFormat') 
require('dayjs/locale/es')

const foodRoutes = require('../Food/food')
const createPedidos = require('./createPedido')

const { Op, where, REAL } = require('sequelize')
const { Pedido, Location, PedidoItems } = require('./PedidoModel')
const Calendar = require('../Calendar/CalendarModel')
const Food = require('../Food/FoodModel')

router.get('/', async (req, res) => {
    selectedDate = date().subtract(5, 'h').second(0).minute(0).hour(0).format('YYYY-MM-DD')
    //selectedDate = '2021-05-08'
  
    console.log('Req Query: ')
    console.log( req.query)
    console.log('End Req Query: ')

    const reqId         = req.params.id
    const reqCustomer   = req.query.customer
    const reqDelivered  = req.query.delivered
    const reqPaid       = req.query.paid
    const reqLocation   = req.query.location
    const reqCreatedAt  = req.query.createdAt

    let pedidoQuery = {}

    if( reqPaid && reqDelivered){
        pedidoQuery.paid = true
        pedidoQuery.delivered = true
    }

    //if(!reqPaid && !reqDelivered){
    //    pedidoQuery.paid = false
    //    pedidoQuery.delivered = false
    //}

    if (!reqPaid && reqDelivered){
        pedidoQuery.delivered = true
    }

    if( reqPaid && !reqDelivered){
        pedidoQuery.paid = true
    }

    if (reqLocation){
        pedidoQuery.location = reqLocation
    }

    pedidoQuery.createdAt = {[Op.substring] : selectedDate}


    pedidos = await Pedido.findAll({
        where: pedidoQuery,
        include: [
            {
                model: Food, 
                through: [] 
            },{
                model: Location
            }
        ],      
    }).catch( e => console.log(e) )

    const locations = await Location.findAll()

    //pedidos.forEach(element => {
//
    //    if( Locations.includes(element.location) ){
    //        console.log(element.location)
    //    } else {
    //        console.log('No esta')
    //        Locations.push(element.location)
    //    }
//
    //});

    res.render('list-pedidos', {pedidos: pedidos, locations: locations})
})

router.post('/update/:id', async (req, res) => {
    const pedido = await Pedido.findByPk( req.params.id, {include: { model: Food}} )

    console.log('Request Body')
    console.log(req.body)

    if (req.body.delivered || req.body.paid ){
        if (req.body.delivered){
            pedido.update({delivered: true})
            console.log('Entregado')
        }
        if (req.body.paid){
            pedido.update({paid: true})
            console.log('Pagado')
        }
    }

    const customerName      = req.body.customerName
    const customerLocation  = req.body.customerLocation
    const comida1Quantity   = req.body.comida1Quantity
    const comida2Quantity   = req.body.comida2Quantity

    if (req.body.comida1Quantity || req.body.comida2Quantity ){
        if (req.body.comida1Quantity){

            const items = await PedidoItems.findOne({
                where: {
                    pedidoId: pedido.id,
                    foodId: pedido.food[0].id
                }
            })

            items.update({quantity: comida1Quantity})

            console.log('items')
            console.log(items)

            //pedido.update({})
        }
        if (req.body.comida2Quantity){
            const items = await PedidoItems.findOne({
                where: {
                    pedidoId: pedido.id,
                    foodId: pedido.food[1].id
                }
            })

            items.update({quantity: comida2Quantity})
            console.log('items')
            console.log(items)

            pedido.update({})
            console.log('')
        }
    }

    //pedido.update({
    //    customer: customerName,
    //})


    res.redirect('/pedidos')
})

router.get('/details/:id', async (req, res) => {
    const search = await Pedido.findByPk(req.params.id, {
        include: [
            {model: Food}
        ]
    })
    res.render('pedido-details', {pedido: search} )
})

router.get('/edit/:id', async (req, res) => {

    const search = await Pedido.findByPk(req.params.id, {
        include: [
            {model: Food}
        ]
    })

    res.render('pedido-edit', {pedido: search})
})

router.get('/delete/:id', (req, res) => {
    Pedido.destroy({
        where: {
            id: req.params.id
        }
    })
    console.log('Deleted...')
    res.redirect('/')
})

module.exports = router;
