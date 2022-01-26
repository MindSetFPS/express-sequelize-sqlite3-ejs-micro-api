const router = require('express').Router()
const date = require('dayjs')
const localizedFormat = require('dayjs/plugin/localizedFormat') 
require('dayjs/locale/es')

const { Op } = require('sequelize')
const Food  = require('../Food/FoodModel')
const Calendar = require('./CalendarModel')
const { Pedido, PedidoItems, Location } = require('../Pedido/PedidoModel')
const Customer = require('../Customer/CustomerModel')

router.get('/api/all', async (req, res) => {
    console.log('New request for /calendar/api/all')
    formatedDate = date().format('YYYY-MM-DD')
    const calendars = await Calendar.findAll({
        where: {
            date: {[Op.lte]: formatedDate}
        },
        include: [
            { model: Food, as: 'Comida1' },
            { model: Food, as: 'Comida2' }
        ],
        order: [['date', 'DESC']]
    }).catch( e => console.error(e))

    console.log(calendars)

    if(!calendars.length > 0){
        console.log('no')
        return res.json({ ok: false, message: 'Crea un calendario.', link: '/calendar/create-menu'})
    }else{
        console.log(calendars)
    }
    res.json(calendars)
})
 
router.get('/api/list', async (req, res) => {
    console.log('New request for /calendar/api/list')
    formatedDate = date().format('YYYY-MM-DD')
    calendar = await Calendar.findOne({
        where: {
            date: {[Op.gte]: formatedDate}
        },
        include: [
             {model: Food, as: 'Comida1'} ,
             {model: Food, as: 'Comida2'} ,
        ],
        order: [['id', 'DESC']]
    }).catch( e => console.error(e))

    if(!calendar){
        console.log('No existe en la base de datos')
        res.json({ok: false, message: 'Crea un calendario.', link: '/calendar/create-menu'})
    }

    if(calendar){
        console.log('Correcto')
        res.json({ok: true, message: 'Ok', calendar: calendar})
    }    
})

router.get('/api/:id', async (req, res) => {
    console.log('New request for /calendar/api/:id')
    formatedDate = date().format('YYYY-MM-DD')

    let calendar = ''

    try {
        calendar = await Calendar.findByPk(req.params.id).catch(e => console.error(e))
        console.log(calendar)
    } catch (error) {
        console.error(error)
    }

    // console.log(calendar)

    const pedidos = await Pedido.findAll({
        where: {
            createdAt: {
                [Op.startsWith]: calendar.date
            }
        },
        include: [  
            {
                model: Food,
                through: {
                    attributes: ['quantity']
                },
                order: [[Food, PedidoItems, 'id', 'DESC']]
            },
            {
                model: Location
            },{
                model: Customer
            },
        ],
    })

    res.json({ok: true, calendar: calendar, pedidos: pedidos})
})

router.post('/api/create', async (req, res) => {
    console.log('New request to /calendar/api/create')
    console.log(req.body)
    
    if( !req.body.comida1 || !req.body.comida2 || !req.body.date){
        res.status(400).json({message: 'Faltan datos', error: true})
    }

    const search1 = await Food.findOne({
        where: {
            name: req.body.comida1
        }
    }).catch( e => console.error(e))
  
    const search2 = await Food.findOne({
        where: {
            name: req.body.comida2
        }
    }).catch( e => console.error(e))

    if( !search1 || !search2 ){
        return res.status(404).json({error: true, message: 'Uno o mas de estos platillos no existen.'})
    }

    console.log('Id comida1: ' + search1)
    console.log('Id comida2: ' + search2.id)

    newTodayMenu = Calendar.build({
        Comida1Id: search1.id,
        Comida2Id: search2.id,
        date: req.body.date
    })

    await newTodayMenu.save().then( (e) => {
        console.log(e)
        return res.status(200).json({ok: true, message: 'Nuevo menu guardado'})
    })

})

router.get('/delete/:id', (req, res) => {
    Calendar.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/calendar/list')
})

router.get('/api/delete/:id', async (req, res) => {
    const menu = await Calendar.destroy({
        where: {
            id: req.params.id
        }
    }).catch(e => console.error(e))

    if(!menu){
        return res.status(404).json({ok: false, message: 'No encontrado'})
    }
    res.json({ok: true, message: 'Succesfully deleted'})
})

module.exports = router;