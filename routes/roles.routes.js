const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/authentification.middlewares')
const Sanitize = require('../middlewares/sanitizeBody.middlewares')
const RoleController = require('../controllers/roles.controllers')

//Basic routes
router.post('/', RoleController.createRole)
router.get('/', Auth, RoleController.getRoles)
router.put('/', Auth,Sanitize.sanitizeBody("roles"),RoleController.updateRole)
router.delete('/',RoleController.deleteRole)

module.exports = router;