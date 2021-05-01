const express = require('express')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const date = require('dayjs')
const localizedFormat = require('dayjs/plugin/localizedFormat') 
require('dayjs/locale/es')

const foodRoutes = require('./food')
const createPedidos = require('./createPedido')
const listPedidos = require('./listPedidos')
const listCalendar = require('./listCalendar')

const { Food, DayMenu } = require('./model')
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



app.post('/create-menu', async (req, res) => {
    if(req.body.comida1 && req.body.comida2){

        const search1 = await Food.findOne({
            where: {
                name: req.body.comida1
            }
        })

        const search2 = await Food.findOne({
            where: {
                name: req.body.comida2
            }
        })

        console.log('Id comida1: ' + search1.id)
        console.log('Id comida2: ' + search2.id)

        newTodayMenu = DayMenu.build({
            comida1: search1.id,
            comida2: search2.id,
            date: req.body.date
        })
        await newTodayMenu.save().then( (e) => {
            console.log(e)
            res.redirect('/')
        })
        
    }
})


app.use('/food', foodRoutes)

app.listen(port, () => {
    console.log('Running on port: ', port)
})