const express = require('express')
const User = require('../auth/UserModel')
const router = express.Router()

router.get('/api/get', async (req, res)=> {
    console.log('New request to /accounts/api/get')
    const usersExist = await User.findOne().catch( e => console.error(e))

    console.log(req.user)

    if(!usersExist){
        console.log(usersExist)
        res.json({ok: true, exists: false})
    }else{
        res.json({ok: true, exists: true})
    }

})

module.exports = router;