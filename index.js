const express = require('express')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const date = require('dayjs')
const localizedFormat = require('dayjs/plugin/localizedFormat') 
require('dayjs/locale/es')


const foodRoutes = require('./food')
const createPedidos = require('./createPedido')
const listPedidos = require('./listPedidos')

const { Op } = require('sequelize')
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

app.get('/create-menu', (req, res) => {
    Food.findAll().then(
        food => {
            res.render('create-today-menu', {menu: food})
        }
    )
})

app.get('/calendar', (req, res)=> {

    formatedDate = date().format('YYYY-MM-DD')

    DayMenu.findAll({
        where: {
            date: {[Op.gte]: formatedDate}
        },
        include: [
            { model: Food, as: 'Comida1' },
            { model: Food, as: 'Comida2' }
        ]

    }).then(
        menuList => {
            const clientMenuList = []
            menuList.forEach(element => {
                const x = {
                    fecha : date(element.date).locale('es').format('LL'),
                    comida1 : element.Comida1,
                    comida2 : element.Comida2,
                    id: element.id
                }

                clientMenuList.push(x)
            })

            console.log(typeof clientMenuList)

            res.render('calendar', {menuList: clientMenuList, date: date().locale('es').format('LL')})
        }
    )
})

app.get('/calendar/delete/:id', (req, res) => {
    DayMenu.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/calendar')
})

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