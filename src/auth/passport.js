const passport = require('passport')
const PassportStrategy = require('passport-local').Strategy;

const User = require('./UserModel')


passport.serializeUser(function(user, done){
    done(null, user.id)
})  

passport.deserializeUser(function(id, done){
    done(null, {id: 1, name: "cody"})
})


passport.use('login', new PassportStrategy({usernameField: 'email'}, async function(username, password, done){

    user = await User.findOne({
        where: {
            email: username
        }
    })
    .catch( e => console.error(e))
    if( user && user.email == username){        
        return done(null, user)
    }
    return done(null, false)   
}))

passport.use('register', new PassportStrategy({usernameField: 'email'}, async function(username, password, done){

    email = await User.findOne({
        where: {
            email: username
        }
    }).catch(e => console.error(e))


    console.log(email)

    if(email){
        return done(null, false)
    }

    user = await User.create({
        email: username,
        password: password
    }).catch( e => console.error(e) )

    return done(null, user)

}))

function isAutenticated(req, res, next){
    if(req.isAuthenticated()  ) {
        return next(null);
      }
    
      res.redirect('/login')
}

module.exports = isAutenticated