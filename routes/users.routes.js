const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/authentification.middlewares')
const Sanitize = require('./../middlewares/sanitizeBody.middlewares')
const UserController = require('./../controllers/users.controllers')
const multer = require("../config/multerConfig")
const Rights = require('../middlewares/rightsVerification')
//Auth
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/update_token', UserController.updateToken)

//Search
router.get('/search', Auth, UserController.searchUsers)

//Upload
router.post('/upload', multer.upload.single("avatar"), UserController.uploadPicture)

//Advanced routes
router.get('/me', Auth,UserController.getMe)

//Basic routes
router.post('/',Auth , UserController.createUser)
router.get('/',UserController.getUsers)
router.put('/', Auth,Sanitize.sanitizeBody("users"),UserController.updateUser)
router.delete('/',UserController.deleteUser)

module.exports = router;