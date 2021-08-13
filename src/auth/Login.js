const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('./UserModel')


router.get('/', async (req, res, next) => {
    if(req.isAuthenticated()){
        return res.json({ok: true, authenticated: true})
    }
    usersExist = await User.findOne().catch( e => console.error(e))

    if(usersExist){
        return res.send("/#/login") 
    }
    console.log(req)
    res.send('/register')

})

router.post('/', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if(err) throw err
        if(!user) res.json({error: "No user"})
        else{
            req.logIn(user, (err) => {
                if(err) throw err
                res.json({msg: "Successfully authenticated", user: req.user})
                //ToDo: Do not send the pasword 🤣
                console.log(req.user)
            })
        }
    }  )(req, res, next)
})



module.exports = router;