const bodyParser = require('body-parser')
const express = require('express')

//const session = require('express-session')
const session = require('cookie-session')
const cookieParser = require('cookie-parser')

const passport = require('passport')
const localizedFormat = require('dayjs/plugin/localizedFormat') 
require('dayjs/locale/es')

require('dotenv').config()

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
const port = process.env.ENVIRONMENT == 'development' ? 4500 : 3000

app.use(session({
    name: 'sessionCookie',
    secret: 'secret key',
    keys: ['key1', 'key2']
}))
app.use(cookieParser("secret key"))

// if(process.env.ENVIRONMENT=='development'){
    const cors = require('cors')
    app.use(cors())
// }
app.use(passport.initialize())
app.use(passport.session())


app.use(express.json())
app.use(express.urlencoded());
app.use(express.static('dist'))

app.use('/login', login)
app.use('/register', register )
app.use(isAutenticated)
app.use('/', createPedidos)
app.use('/food', foodRoutes)
app.use('/pedidos', listPedidos )
app.use('/calendar', listCalendar)
app.use('/accounts', accounts)
app.use('/customers', customers)

app.listen(port, () => {
    console.log('Running on port: ', port)
})