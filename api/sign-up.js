let bcrypt = require('bcrypt');


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




function createUser(db, req, email, password){
    console.log("please work")
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        try{
            if(err){
                console.log(err); 
                return null;
            }
            var userInfo = accountScheme();
            userInfo.name = "Steven King";
            userInfo.password = hashedPassword;
            console.log(userInfo);

            const user = userDB.doc(email).set(userInfo);
            return done(null, user)
        } catch(error){
            return null;
        }
})};