const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const nunjucks = require('nunjucks')
const passport = require('passport')
const localizedFormat = require('dayjs/plugin/localizedFormat') 
require('dayjs/locale/es')

const isAutenticated = require('./src/auth/passport')

const accounts = require('./src/Accounts/Accounts')
const login = require('./src/auth/Login')
const register = require('./src/auth/Register')
const foodRoutes = require('./src/Food/food')
const createPedidos = require('./src/Pedido/createPedido')
const listPedidos = require('./src/Pedido/listPedidos')
const listCalendar = require('./src/Calendar/listCalendar')

require('./src/auth/passport')

const dayjs = require('dayjs')

dayjs.extend(localizedFormat)

const app = express()
const port = 3000

nunjucks.configure('views', {
    autoescape: true,
    noCache: true,
    express: app
})

app.use(session({
    secret: 'secret key',
    resave: true,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


app.use(express.json())
app.use(express.urlencoded());
app.use(express.static('static'))

app.set('view engine', '.njk')
app.set('view cache', false)

app.use('/login', login)
app.use('/register', register )
app.use('/food', foodRoutes)
app.use(isAutenticated)
app.use('/', createPedidos )
app.use('/pedidos', listPedidos )
app.use('/calendar', listCalendar)
app.use('/accounts', accounts)

app.listen(port, () => {
    console.log('Running on port: ', port)
})