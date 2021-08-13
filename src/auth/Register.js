const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('./UserModel')

router.get('/', async (req, res) => {
    // if(req.isAuthenticated()){
    //     return res.redirect()
    // }

    userExists = await User.findOne()

    if(userExists){
        return res.json({ok: true, exist: true})
    }

    res.json({ok: true, exist: false})
})

router.post('/', (req, res, next)=>{
        console.log('New request to /register ')
        return next()
    },
    passport.authenticate('register', {
        successRedirect: '/#/login',
    }
))

module.exports = router