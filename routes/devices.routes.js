const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/authentification.middlewares')
const Sanitize = require('./../middlewares/sanitizeBody.middlewares')
const DeviceController = require('./../controllers/devices.controllers')

//Basic routes
router.post('/', DeviceController.createDevice)
router.get('/', Auth,DeviceController.getDevices)
router.put('/', Auth,Sanitize.sanitizeBody("devices"),DeviceController.updateDevice)
router.delete('/',DeviceController.deleteDevice)

module.exports = router;