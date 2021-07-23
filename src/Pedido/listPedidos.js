const router = require('express').Router()
const date = require('dayjs')
const localizedFormat = require('dayjs/plugin/localizedFormat') 
require('dayjs/locale/es')


const { Op, where, REAL } = require('sequelize')
const { Pedido, Location, PedidoItems } = require('./PedidoModel')
const Food = require('../Food/FoodModel')
const Customer = require('../Customer/CustomerModel')

router.get('/api/', async(req, res) => {
    selectedDate = date().subtract(5, 'h').second(0).minute(0).hour(0).format('YYYY-MM-DD')
  
    console.log('/api/, Req Query: ')
    console.log( req.query)
    console.log('End Req Query: ')

    const reqId         = req.params.id
    const reqCustomer   = req.query.customer
    const reqDelivered  = parseInt(req.query.delivered)
    const reqPaid       = parseInt(req.query.paid)
    const reqLocation   = req.query.location
    const reqCreatedAt  = req.query.createdAt
    const reqAll        = req.query.all
    const since         = req.query.sincePicker
    const until         = req.query.untilPicker
    let pedidoQuery = {}
    
    if (reqAll){

    } else {
   
        if( reqPaid && reqDelivered){
            console.log('true true')
            pedidoQuery.paid = true
            pedidoQuery.delivered = true
        }
        
        if(!reqPaid && !reqDelivered){
            console.log('false false')
            pedidoQuery.paid = false
            pedidoQuery.delivered = false
        }
        
        if (!reqPaid && reqDelivered){
            console.log('false true')
            pedidoQuery.delivered = true
        }
        
        if( reqPaid && !reqDelivered){
            console.log('true false')
            pedidoQuery.paid = true
        }
    }

    
    if (reqLocation){
        searchedLocation = await Location.findOne({
            where: {
                name: reqLocation
            }
        }).catch( e => console.error(e))
        
        //console.log(searchedLocation)
        
        pedidoQuery.locationId = searchedLocation.id
    }

    console.log('reqCustomer: ', reqCustomer)

    if (reqCustomer){
        searchedCustomer = await Customer.findOne({
            where: {
                name: reqCustomer.trim()
            }
        }).catch((e) => console.error('error: :',e))

        if(searchedCustomer === null){
            res.json(`Error 404.Record with name ${reqCustomer} not found`)
            throw new Error(`Record with name ${reqCustomer} not found.`)
        }
        
        console.log('searchedCustomer: ', searchedCustomer)
        pedidoQuery.customerId = searchedCustomer.id
        
    }
    
    pedidoQuery.createdAt = {[Op.between] : [since, until] }
    
    console.log('line 135', pedidoQuery)

    pedidos = await Pedido.findAll({
        where: pedidoQuery,
        include: [
            {
                model: Food, 
                through: [] 
            },{
                model: Location
            },{
                model: Customer
            }
        ],      
    }).catch( e => console.error(e) )

    //console.log(pedidos)

    res.json(pedidos)
})

router.get('/api/locations', async (req, res) => {
    console.log('Consulting locations')
    
    const places = await Location.findAll()

    res.json(places)
})

router.post('/api/update/:id', async (req, res) => {
    console.log('/api/update/id')
    console.log('Request Body')
    console.log(req.body)
    const pedido = await Pedido.findByPk( req.params.id, {include: { model: Food}} ).catch(err => console.error(err))


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


    if (customerLocation){   
        const [editedLocation, created] = await Location.findOrCreate({
            where: {
                name: customerLocation
            }
        }).catch( e => console.error(e))

        pedido.update({
            locationId: editedLocation.id
        })
    }
        
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
        }
    }

    //pedido.update({
    //    customer: customerName,
    //})

    const pedidoUpdated = await Pedido.findByPk(req.params.id)
    //console.log(pedidoUpdated)

    res.json(pedidoUpdated)
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
