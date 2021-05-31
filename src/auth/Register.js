const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('./UserModel')

router.get('/', async (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/')
    }

    userExists = await User.findOne()

    if(userExists){
        return res.redirect('/')
    }


    res.render('register')
})

router.post('/', passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/register'
}))

module.exports = router