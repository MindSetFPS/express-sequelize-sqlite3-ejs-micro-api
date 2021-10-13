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
            { model: Food },
            { model: Food }
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

router.get('/api/all', async (req, res) => {
    console.log('New request for /calendar/api/all')
    formatedDate = date().format('YYYY-MM-DD')
    const calendars = await Calendar.findAll({
        where: {
            date: {[Op.gte]: formatedDate}
        },
        include: [
            { model: Food, as: 'Comida1' },
            { model: Food, as: 'Comida2' }
        ]
    }).catch( e => console.error(e))

    if(!calendars.length > 0){
        console.log('no')
        return res.json({ ok: false, message: 'Crea un calendario.', link: '/calendar/create-menu'})
    }else{
        console.log(calendars)
    }

    res.json(calendars)
})

router.get('/api/list', async (req, res) => {
    console.log('New request for /calendar/api/list')
    formatedDate = date().format('YYYY-MM-DD')
    calendar = await Calendar.findOne({
        where: {
            date: {[Op.gte]: formatedDate}
        },
        include: [
             {model: Food, as: 'Comida1'} ,
             {model: Food, as: 'Comida2'} ,
        ],
        order: [['id', 'DESC']]
    }).catch( e => console.error(e))

    if(!calendar){
        console.log('No existe en la base de datos')
        res.json({ok: false, message: 'Crea un calendario.', link: '/calendar/create-menu'})
    }

    if(calendar){
        console.log('Correcto')
        res.json({ok: true, message: 'Ok', calendar: calendar})
    }
    

})

router.post('/api/create', async (req, res) => {
    console.log('New request to /calendar/api/create')
    console.log(req.body)
    
    if( !req.body.comida1 || !req.body.comida2 || !req.body.date){
        res.status(400).json({message: 'Faltan datos', error: true})
    }

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

    if( !search1 || !search2 ){
        res.status(400).json({error: true, message: 'La comida no existe.'})
    }

    console.log('Id comida1: ' + search1)
    console.log('Id comida2: ' + search2.id)

    newTodayMenu = Calendar.build({
        Comida1Id: search1.id,
        Comida2Id: search2.id,
        date: req.body.date
    })

    await newTodayMenu.save().then( (e) => {
        console.log(e)
        res.status(200).json({ok: true, message: 'Nuevo menu guardado'})
    })

})

router.get('/delete/:id', (req, res) => {
    Calendar.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/calendar/list')
})

router.get('/api/delete/:id', async (req, res) => {
    const menu = await Calendar.destroy({
        where: {
            id: req.params.id
        }
    }).catch(e => console.error(e))

    if(!menu){
        return res.status(404).json({ok: false, message: 'No encontrado'})
    }

    res.json({ok: true, message: 'Succesfully deleted'})
})


module.exports = router;