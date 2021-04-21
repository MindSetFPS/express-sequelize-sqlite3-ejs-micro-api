const express = require('express')
const Food = require('./model')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));


app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

//-- ROUTES --//
app.get('/', (req, res) => {
    Food.findAll()
        .then(food => 
            res.render('index', {menu: food})
        )
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