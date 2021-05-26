const express = require('express')
const passport = require('passport')
const router = express.Router()


router.get('/', (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    res.render("login")
})

router.post('/',  passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login'
}))



module.exports = router;