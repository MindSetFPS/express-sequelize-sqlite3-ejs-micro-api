const router = require('express').Router()
const date = require('dayjs')
const localizedFormat = require('dayjs/plugin/localizedFormat') 
require('dayjs/locale/es')

const foodRoutes = require('./food')
const createPedidos = require('./createPedido')

const { Op } = require('sequelize')
const { Food, DayMenu, Pedido, PedidoItems } = require('./model')

router.get('/', (req, res) => {
    res.send('test')
})

module.exports = router;
