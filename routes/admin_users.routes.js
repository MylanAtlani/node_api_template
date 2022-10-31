const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/authentification.middlewares')
const Sanitize = require('../middlewares/sanitizeBody.middlewares')
const AdminUserController = require('../controllers/admin_users.controllers')
const multer = require("../config/multerConfig")
const Rights = require('../middlewares/rightsVerification')

//Auth
router.post('/login', AdminUserController.login)
router.post('/update_token', AdminUserController.updateToken)

//Search
router.get('/search', Auth, AdminUserController.searchAdminUsers)

//Upload
router.post('/upload', multer.upload.single("avatar"), AdminUserController.uploadPicture)

//Advanced routes
router.get('/me', Auth,AdminUserController.getMe)

//Basic routes
router.post('/',Auth,Rights(4,"admin_users"), AdminUserController.createAdminUser)
router.get('/', Auth,AdminUserController.getAdminUsers)
router.put('/', Auth,Sanitize.sanitizeBody("adminUsers"),AdminUserController.updateAdminUser)
router.delete('/',AdminUserController.deleteAdminUser)

module.exports = router;