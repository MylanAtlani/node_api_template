const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/authentification.middlewares')
const Sanitize = require('../middlewares/sanitizeBody.middlewares')
const LogController = require('../controllers/logs.controllers')

//Basic routes
router.post('/', Auth,LogController.createLog)
router.get('/', Auth,LogController.getLogs)
router.put('/', Auth,Sanitize.sanitizeBody("logs"),LogController.updateLog)
router.delete('/',LogController.deleteLog)

module.exports = router;