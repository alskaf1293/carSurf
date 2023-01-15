let bcrypt = require('bcrypt');
let { getAuth, createUserWithEmailAndPassword } = require("firebase-admin/auth");

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




function createUser(app, email, password){
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}





/*
function createUser(userDB, req, email, password){
    console.log("please work")
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        try{
            if(err){ 
                return err;
            }
            var userInfo = accountScheme();
            userInfo.name = "Steven King";
            userInfo.password = hashedPassword;
            console.log(userInfo);

            const user = userDB.doc(email).set(userInfo);
            return;
        } catch(error){
            console.log(error);
            throw error;
        }
})};
*/

module.exports = {createUser};