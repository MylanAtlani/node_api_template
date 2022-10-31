const admin = require("firebase-admin");

const serviceAccount = require("../config/squadra-e25c4-firebase-adminsdk-n8xx8-b4d448041f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});