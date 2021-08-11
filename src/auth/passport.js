const passport = require('passport')
const PassportStrategy = require('passport-local').Strategy;

const User = require('./UserModel')


passport.serializeUser(function(user, done){
    done(null, user.id)
})  

passport.deserializeUser(async function(id, done){
    user = await User.findOne({
        where: {
            id: id
        }
    }).catch(e => console.error(e))
    console.log(user)
    if(!user){
        done(null, false)
    }
    done(null, user)
})


passport.use('login', new PassportStrategy({usernameField: 'email'}, async function(username, password, done){
    user = await User.findOne({
        where: {
            email: username
        }
    }).catch( e => console.error(e))

    console.log(user)

    if( user && user.email == username){       
        if(user.password == password){
            console.log('Succesfull')
            return done(null, user)
        }
        console.log('Incorrect passord')
        return done(null, false, {message: 'Incorrect password'})
    }
    console.log('User not found')
    return done(null, false, {message: 'User not found'})   
}))

passport.use('register', new PassportStrategy({usernameField: 'email'}, async function(username, password, done){

    console.log(username, password, done )

    email = await User.findOne({
        where: {
            email: username
        }
    }).catch(e => console.error(e))
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