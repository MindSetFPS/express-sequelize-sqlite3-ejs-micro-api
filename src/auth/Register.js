const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    res.render('register')
})

router.post('/', passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/register'
}))

module.exports = router