const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

function connectToDB(app){
    return getFirestore(app);
}

exports.module = { connectToDB };