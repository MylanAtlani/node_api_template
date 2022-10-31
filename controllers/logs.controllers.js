const LogService = require('../services/logs.services')

exports.createLog = async function (req, res, next) {
    try {
        let log = await LogService.createLog(req.body);
        return res.status(200).json({status: 200, data: log, message: "Log Successfully Created"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.getLogs = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    const page = req.query.page ? req.query.page : 0;
    const limit = req.query.limit ? req.query.limit : 10;
    const query = req.query.query
    try {
        let logs = await LogService.getLogs(query, page, limit);
        return res.status(200).json({status: 200, data: logs, message: "Successfully Logs Retrieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateLog = async function (req, res) {
    try {
        let log = await updateLog(req.log_id, req.body)
        return res.status(200).json({status: 200, data: log, message: "Log Successfully updated"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.deleteLog = async function (req, res) {
    try {
        let log = await deleteLog(req?.body?.id)
        return res.status(200).json({status: 200, data: log, message: "Log Successfully deleted"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}