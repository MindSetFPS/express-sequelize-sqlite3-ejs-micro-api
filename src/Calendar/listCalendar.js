const router = require('express').Router()
const date = require('dayjs')
const localizedFormat = require('dayjs/plugin/localizedFormat') 
require('dayjs/locale/es')

const { Op } = require('sequelize')
const Food  = require('../Food/FoodModel')
const Calendar = require('./CalendarModel')

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

router.post('/create-menu', async (req, res) => {
    if(req.body.comida1 && req.body.comida2){

        const search1 = await Food.findOne({
            where: {
                name: req.body.comida1
            }
        }).catch( e => console.error(e))
        
        const search2 = await Food.findOne({
            where: {
                name: req.body.comida2
            }
        }).catch( e => console.error(e))

        console.log('Id comida1: ' + search1)
        console.log('Id comida2: ' + search2.id)

        newTodayMenu = Calendar.build({
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

router.get('/list', (req, res)=> {
    formatedDate = date().format('YYYY-MM-DD')
    Calendar.findAll({
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
    ).catch( e => console.log(e) )
})

router.get('/api/list', async (req, res) => {
    formatedDate = date().format('YYYY-MM-DD')
    comidas = await Calendar.findOne({
        where: {
            date: {[Op.gte]: formatedDate}
        },
        include: [
            { model: Food, as: 'Comida1'},
            { model: Food, as: 'Comida2'}
        ]
    })
    res.json(comidas)
})

router.get('/delete/:id', (req, res) => {
    Calendar.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/calendar/list')
})


module.exports = router;