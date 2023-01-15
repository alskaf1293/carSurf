let { getAuth, signInWithEmailAndPassword } = require("firebase-admin/auth");


function login(app, email, password){
    const auth = getAuth(app);{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}
}
module.exports = { login }