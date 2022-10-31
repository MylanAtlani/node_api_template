const NotificationService = require('../services/notifications.services')

exports.createNotification = async function (req, res, next) {
    try {
        let notification = await NotificationService.createNotification(req.body);
        return res.status(200).json({status: 200, data: notification, message: "Notification Successfully Created"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.getNotifications = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    const page = req.query.page ? req.query.page : 0;
    const limit = req.query.limit ? req.query.limit : 10;
    const query = req.query.query
    try {
        let notifications = await NotificationService.getNotifications(query, page, limit);
        return res.status(200).json({status: 200, data: notifications, message: "Successfully Notifications Retrieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateNotification = async function (req, res) {
    try {
        let notification = await updateNotification(req.body.id, req.body)
        return res.status(200).json({status: 200, data: notification, message: "Notification Successfully updated"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.deleteNotification = async function (req, res) {
    try {
        let notification = await deleteNotification(req?.body?.id)
        return res.status(200).json({status: 200, data: notification, message: "Notification Successfully deleted"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}