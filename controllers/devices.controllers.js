const DeviceService = require('../services/devices.services')

exports.createDevice = async function (req, res, next) {
    try {
        let device = await DeviceService.createDevice(req.body);
        return res.status(200).json({status: 200, data: device, message: "Device Successfully Created"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.getDevices = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    const page = req.query.page ? req.query.page : 0;
    const limit = req.query.limit ? req.query.limit : 10;
    const query = req.query.query
    try {
        let devices = await DeviceService.getDevices(query, page, limit);
        return res.status(200).json({status: 200, data: devices, message: "Successfully Devices Retrieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateDevice = async function (req, res) {
    try {
        let device = await updateDevice(req.body.id, req.body)
        return res.status(200).json({status: 200, data: device, message: "Device Successfully updated"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.deleteDevice = async function (req, res) {
    try {
        let device = await deleteDevice(req?.body?.id)
        return res.status(200).json({status: 200, data: device, message: "Device Successfully deleted"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}