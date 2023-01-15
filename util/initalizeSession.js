const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function accountScheme() {
    return {
        name: "",
        email: "",
        password: "",
        driverReview: {},
        passengerReviews: {},
        ridesGiven: 0,
        ridesReceived: 0
    }
}



function initalizeSession(userDB){

    console.log("hello");



    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
            const user = User.doc(username).get()
              .then(user => {
                  bcrypt.compare(password, user.data()['password'], (err, match) => {
                      if (err) throw err;
                      if (!match) { return done(null, false, { message: 'Password does not match.' }); }
                      else { return done(null, user); }
                  });
              })
              .catch(err => {
                  console.log(err);
                  return done(null, false, { message: 'No user found.' });
              });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        const user = User.doc(id).get()
          .then(user => done(null, user))
          .catch(err => done(err, user));
    });
}

module.exports = { initalizeSession };