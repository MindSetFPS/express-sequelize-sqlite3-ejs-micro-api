const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const { createServer } = require('http')
const { Server } = require('socket.io')

//const session = require('express-session')
const session = require('cookie-session')
const cookieParser = require('cookie-parser')

const passport = require('passport')
const localizedFormat = require('dayjs/plugin/localizedFormat') 
require('dayjs/locale/es')

const isAutenticated = require('./src/auth/passport')

const accounts = require('./src/Accounts/Accounts')
const createPedidos = require('./src/Pedido/createPedido')
const customers = require('./src/Customer/customers')
const foodRoutes = require('./src/Food/food')
const login = require('./src/auth/Login')
const listPedidos = require('./src/Pedido/listPedidos')
const Calendar = require('./src/Calendar/Calendar')
const register = require('./src/auth/Register')

const { NODE_ENV, PORT, SECRETKEY, KEYONE, KEYTWO } = require('./config')

require('./src/auth/passport')

const dayjs = require('dayjs')
dayjs.extend(localizedFormat)

//setup socket.io and express
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
})

if(NODE_ENV === 'development') app.use(cors({origin: 'http://localhost:8080'}))

app.use(session({
    name: 'user',
    secret: SECRETKEY ,
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: false,
    keys: [KEYONE, KEYTWO]
}))
app.use(cookieParser(process.env.COOKIEPARSERKEY))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded());
app.use(express.static('dist'))

app.use('/login', login)
app.use('/register', register )
app.use('/accounts', accounts)
app.use('/food', foodRoutes)
app.use('/', createPedidos)
app.use('/pedidos', listPedidos )
app.use('/calendar', Calendar)
app.use('/customers', customers)
app.use(isAutenticated)


io.on("connection", (socket)=>{
    console.log('client successfully connected!')
    socket.on("NewPedido", (arg)=>{
        console.log('\x1b[32m', 'Actualizando clientes.','\x1b[0m')
        socket.broadcast.emit("UpdatePedidos")
    })

})

//app.listen doesnot work with socketio 
httpServer.listen(PORT, () => {
    console.log('Running on port: ', PORT)
    console.log(`http://localhost:${PORT}`)
})