const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('./UserModel')


router.get('/', async (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect('/')
    }

    usersExist = await User.findOne().catch( e => console.error(e))
    console.log(usersExist)

    if(usersExist){
        return res.render("login") 
    }

    res.redirect('/register')

})

router.post('/',  passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login'
}))



module.exports = router;