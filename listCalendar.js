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
            
            if(Array.isArray(food) && food.length){
                res.render('create-today-menu', {menu: food})
            } else {

                res.render('create-today-menu', {menu: food, error: 'Para crear un Menu,  primero tienes que agregar al menos 2 platillos.'})
            }


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

            if(Array.isArray(menuList) && menuList.length){  
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
                
                console.log(clientMenuList)
                
                return res.render('calendar', {menuList: clientMenuList, date: date().locale('es').format('LL')})
            }
                res.render('calendar', {date: date().locale('es').format('LL'), error: 'Crea tu primer Menu.'})
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