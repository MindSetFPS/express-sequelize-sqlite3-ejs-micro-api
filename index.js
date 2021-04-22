const express = require('express')
const Food = require('./model')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')

const app = express()
const port = 3000

nunjucks.configure('views', {
    autoescape: true,
    noCache: true,
    express: app
})

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', '.njk')
app.set('view cache', false)

//-- ROUTES --//
app.get('/', (req, res) => {
    Food.findAll()
    .then(food => {
        res.render('index.njk', {menu: food})
        console.log(typeof food )
    })
})

app.get('/api/', (req, res) => {
    Food.findAll().then(food => 
        res.json(food)
    )
})

app.post('/create',async (req, res) => {
    console.log('New request received')

    if(req.body.name){
        newFood = Food.build({name: req.body.name, description: req.body.description, link: req.body.link})
        await newFood.save()
    }
    res.redirect('/')
})

app.get('/edit/:id', async (req, res) => {
    console.log('New edit request.')
    const search = await Food.findByPk(req.params.id, {
        attributes: ['id', 'name', 'description', 'link'],
        limit: 1,
    })

    console.log(search)
    res.render('edit', {food: search  })
})

app.post('/edit/:id', async (req, res) => {
    console.log('Editing...')
    const search = await Food.findByPk(req.params.id, {
        attributes: ['id', 'name', 'description', 'link'],
        limit: 1,
    })

    search.update({
        name: req.body.name,
        description: req.body.description,
        link: req.body.link
    })

    res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
    console.log('New delete request')
    console.log(req.params)
    Food.destroy({
        where: {
            id: req.params.id
        }
    })
    console.log('deleteado')
    res.redirect('/')
})

app.listen(port, () => {
    console.log('Running on port: ', port)
})