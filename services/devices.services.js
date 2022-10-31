const Device = require('../models/devices.models')

exports.createDevice = async function (device) {

    try {
        return await Device.create(device);
    } catch (e) {
        // Log Errors
        throw Error('Error while creating device: ' + e)
    }
}

exports.getDevices = async function (query, page, limit) {

    try {
        return await Device.find(query).limit(limit).skip( limit * page);
    } catch (e) {
        // Log Errors
        console.log(e)
        throw Error('Error while Paginating Devices')
    }
}

exports.getDevice = async function (query) {

    try {
        return await Device.findOne(query);
    } catch (e) {
        // Log Errors
        throw Error('Error while getting device')
    }
}

exports.deleteDevice = async function (query) {
    try {
        return await Device.deleteOne(query);
    } catch (e) {
        // Log Errors
        throw Error('Error while deleting device')
    }
}

exports.updateDevice = async function (query, body) {
    try {
        return await Device.findOneAndUpdate({_id: query}, body, {new: true});
    } catch (e) {
        // Log Errors
        throw Error('Error while updating device')
    }
}