
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const userDB = db.collection("users");

const accountScheme = {

    name: "",
    email: "",
    password: "",
    driverReview: {},
    passengerReviews: {},
    ridesGiven: 0,
    ridesReceived: 0

}


function createAccount(){
    passport.use('signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            try{
                if(err) return done(err);
                var user = new accountScheme;
                user.name = req.body.name;
                user.email = email;
                user.password = hashedPassword;
                const user = userDB.set(user);
                return done(null, user)
            } catch(error){
                done(error);
            }
        })
    }))
}

module.exports = {createAccount}