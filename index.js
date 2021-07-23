const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
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
const customers = require('./src/Customer/customers')


require('./src/auth/passport')

const dayjs = require('dayjs')

dayjs.extend(localizedFormat)

const app = express()
const port = 3000

app.use(session({
    secret: 'secret key',
    resave: true,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


app.use(express.json())
app.use(express.urlencoded());
app.use(express.static('dist'))


app.use('/', createPedidos)
//app.use('/login', login)
//app.use('/register', register )
app.use('/food', foodRoutes)
//app.use(isAutenticated)
app.use('/pedidos', listPedidos )
app.use('/calendar', listCalendar)
app.use('/accounts', accounts)
app.use('/customers', customers)

app.listen(port, () => {
    console.log('Running on port: ', port)
})