
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;


const accountScheme = {

    name: "",
    email: "",
    password: "",
    driverReview: {},
    passengerReviews: {},
    ridesGiven: 0,
    ridesReceived: 0

}



function createAccount(userDB){
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
}

module.exports = {createAccount}