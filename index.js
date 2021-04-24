const express = require('express')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')

const foodRoutes = require('./food')
const createPedidos = require('./createPedido')

const { Food } = require('./model')


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

app.get('/today', (req, res) => {
    Food.findAll().then(
        food => {
            res.render('create-today-menu', {menu: food})
        }
    )
})

app.use('/food', foodRoutes)

app.listen(port, () => {
    console.log('Running on port: ', port)
})