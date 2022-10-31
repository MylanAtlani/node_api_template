const Log = require('../models/logs.models')

exports.createLog = async function (log) {

    try {
        return await Log.create(log);
    } catch (e) {
        // Log Errors
        throw Error('Error while creating log: ' + e)
    }
}

exports.getLogs = async function (query, page, limit) {

    try {
        return await Log.find(query).limit(limit).skip( limit * page);
    } catch (e) {
        // Log Errors
        console.log(e)
        throw Error('Error while Paginating Logs')
    }
}

exports.getLog = async function (query) {

    try {
        return await Log.findOne(query);
    } catch (e) {
        // Log Errors
        throw Error('Error while getting log')
    }
}

exports.deleteLog = async function (query) {
    try {
        return await Log.deleteOne(query);
    } catch (e) {
        // Log Errors
        throw Error('Error while deleting log')
    }
}

exports.updateLog = async function (query, body) {
    try {
        return await Log.findOneAndUpdate({_id: query}, body, {new: true});
    } catch (e) {
        // Log Errors
        throw Error('Error while updating log')
    }
}