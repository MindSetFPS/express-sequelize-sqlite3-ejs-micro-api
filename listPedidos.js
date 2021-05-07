const router = require('express').Router()
const date = require('dayjs')
const localizedFormat = require('dayjs/plugin/localizedFormat') 
require('dayjs/locale/es')

const foodRoutes = require('./food')
const createPedidos = require('./createPedido')

const { Op, where } = require('sequelize')
const { Food, DayMenu, Pedido, PedidoItems } = require('./model')

router.get('/', async (req, res) => {

    selectedDate = date().subtract(5, 'h').second(0).minute(0).hour(0).format('YYYY-MM-DD')
    console.log(selectedDate)
    pedidos = await Pedido.findAll({
        where: {
            createdAt: {
               [Op.substring] : selectedDate
            },
            paid: false
                  
        },
        include: [
            {
                model: Food, 
                through: [] },
        ],      
    }).catch( e => console.log(e) )
    res.render('list-pedidos', {pedidos: pedidos})
})

router.get('/paid', async (req, res) => {

    selectedDate = date().subtract(5, 'h').second(0).minute(0).hour(0).format('YYYY-MM-DD')
    console.log(selectedDate)
    pedidos = await Pedido.findAll({
        where: {
            createdAt: {
               [Op.substring] : selectedDate
            },
            paid: true
                  
        },
        include: [
            {
                model: Food, 
                through: [] },
        ],      
    }).catch( e => console.log(e) )
    res.render('list-pedidos', {pedidos: pedidos})
})

router.post('/update/:id', async (req, res) => {
    
    const search = await Pedido.findByPk( req.params.id )

    if (req.body.delivered || req.body.paid ){
        if (req.body.delivered){
            search.update({delivered: true})
            console.log('Entregado')
        }
        if (req.body.paid){
            search.update({paid: true})
            console.log('Pagado')

        }
    }

    res.redirect('/pedidos')

    console.log(req.body)
})

router.get('/details/:id', async (req, res) => {
    const search = await Pedido.findByPk(req.params.id, {
        include: [
            {model: Food}
        ]
    })

    console.log(search.food[0].pedidoItems.quantity)
    res.render('pedido-details', {pedido: search} )
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
