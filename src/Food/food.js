const express = require('express')
const router = express.Router()
const { Op } = require('sequelize')

const Food  = require('./FoodModel')
const { PedidoItems }= require('../Pedido/PedidoModel')

router.get('/api/', (req, res) => {
    console.log('New request for "/food/api"')
    Food.findAll().then(food => 
        res.json(food)
    )
})

router.get('/api/:id', async (req, res) => {
    console.log('New request at /api/food/:id')
    const f = await Food.findOne({
        where: {
            id: req.params.id,
        }
    })

    const pi = await PedidoItems.findAll({
        attributes: ['quantity'],
        where: {
            foodId: req.params.id,
            quantity:  {[Op.gt]: 0}
        }
    })

    res.json({ok: true, data: f, stats: pi})
})

router.post('/create',async (req, res) => {
    if(req.body.name){
        newFood = await Food.build({name: req.body.name, description: req.body.description, link: req.body.link})
        await newFood.save().catch( (e) => console.log(e))
    }
    console.log('Created')
    res.redirect('/')
})

router.post('/api/create',async (req, res) => {
    console.log('Received new request for /food/api/create')
    if(!req.body.name){
        return res.json({error: true, message: 'Faltan datos'})
    }
    newFood = await Food.build({name: req.body.name, description: req.body.description, link: req.body.link})
    await newFood.save().catch( (e) => console.log(e))
    console.log('Created')
    res.json({ok: true, message: 'Comida Creada.'})
})

router.post('/edit/:id', async (req, res) => {
    const search = await Food.findByPk(req.params.id, {
        attributes: ['id', 'name', 'description', 'link'],
        limit: 1,
    })
    search.update({
        name: req.body.name,
        description: req.body.description,
        link: req.body.link
    })
    console.log('Updated...')

    res.redirect('/')
})

router.get('/delete/:id', (req, res) => {
    Food.destroy({
        where: {
            id: req.params.id
        }
    })
    console.log('Deleted...')
    res.redirect('/')
})

module.exports = router;