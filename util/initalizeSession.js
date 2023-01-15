const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStategy = require('passport-local');
const localStrategy = require('passport-local').Strategy;


function initalizeSession(userDB){
    passport.use(new LocalStategy(function verify(username, password, cb){

        const query = userDB.where("username", "==", username).get()
            .then(user => {
                bcrypt.compare(password, user.data()['password'], (err, match) =>{
                    if(err) throw err;
                    if(!match){ return cb(null, false, {message: 'Username or Password is incorrect'})}

                    else{
                        return cb(null, user);
                    }

                });
            });


    }));

    passport.use('signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            try{
                if(err) return done(err);
                var userInfo = new accountScheme;
                userInfo.name = req.body.name;
                userInfo.email = email;
                userInfo.password = hashedPassword;
                const user = userDB.set(user);
                return done(null, user)
            } catch(error){
                done(error);
            }
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        const user = userDB.doc(id).get()
            .then(user => done(null, user))
            .catch(err => done(err, user));
    })
}

module.exports = { initalizeSession };