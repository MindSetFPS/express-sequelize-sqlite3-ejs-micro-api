const express = require('express')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const date = require('dayjs')
const localizedFormat = require('dayjs/plugin/localizedFormat') 
require('dayjs/locale/es')

const foodRoutes = require('./src/Food/food')
const createPedidos = require('./src/Pedido/createPedido')
const listPedidos = require('./src/Pedido/listPedidos')
const listCalendar = require('./src/Calendar/listCalendar')

const dayjs = require('dayjs')

dayjs.extend(localizedFormat)

const app = express()
const port = 3000

nunjucks.configure('views', {
    autoescape: true,
    noCache: true,
    express: app
})

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('static'))

app.set('view engine', '.njk')
app.set('view cache', false)

app.use('/', createPedidos )
app.use('/pedidos', listPedidos )
app.use('/calendar', listCalendar)
app.use('/food', foodRoutes)

app.listen(port, () => {
    console.log('Running on port: ', port)
})