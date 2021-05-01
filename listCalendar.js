const router = require('express').Router()
const date = require('dayjs')
const localizedFormat = require('dayjs/plugin/localizedFormat') 
require('dayjs/locale/es')

const foodRoutes = require('./food')
const createPedidos = require('./createPedido')

const { Op } = require('sequelize')
const { Food, DayMenu, Pedido, PedidoItems } = require('./model')



router.get('/create-menu', (req, res) => {
    Food.findAll().then(
        food => {
            res.render('create-today-menu', {menu: food})
        }
    )
})


router.get('/list', (req, res)=> {
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

router.get('/delete/:id', (req, res) => {
    DayMenu.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/calendar/list')
})


module.exports = router;