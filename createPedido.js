const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')
const { Food, DayMenu } = require('./model')
const e = require('express')


router.get('/', async (req, res) => {


    console.log(dayjs().format('YYYY-MM-DD'))

    const date = new Date()

    const formatedDate = dayjs().format('YYYY-MM-DD')
    
    try {
        await DayMenu.findOne({
            where: {
                date: formatedDate
            },
            include: [
            { model: Food, as: 'Comida1' },
            { model: Food, as: 'Comida2' }
        ]}).then( query => res.render('create-pedido', {comida1: query.Comida1, comida2: query.Comida2}) )  
    } catch (e) {
        console.log(e)
    }

    
})

module.exports = router;