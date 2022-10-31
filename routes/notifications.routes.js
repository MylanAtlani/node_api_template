const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/authentification.middlewares')
const Sanitize = require('./../middlewares/sanitizeBody.middlewares')
const NotificationController = require('./../controllers/notifications.controllers')

//Basic routes
router.post('/', NotificationController.createNotification)
router.get('/', Auth,NotificationController.getNotifications)
router.put('/', Auth,Sanitize.sanitizeBody("notification"),NotificationController.updateNotification)
router.delete('/',NotificationController.deleteNotification)

module.exports = router;