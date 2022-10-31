const Notification = require('../models/notifications.models')

exports.createNotification = async function (notification) {

    try {
        return await Notification.create(notification);
    } catch (e) {
        // Log Errors
        throw Error('Error while creating notification: ' + e)
    }
}

exports.getNotifications = async function (query, page, limit) {

    try {
        return await Notification.find(query).limit(limit).skip( limit * page);
    } catch (e) {
        // Log Errors
        console.log(e)
        throw Error('Error while Paginating Notifications')
    }
}

exports.getNotification = async function (query) {

    try {
        return await Notification.findOne(query);
    } catch (e) {
        // Log Errors
        throw Error('Error while getting notification')
    }
}

exports.deleteNotification = async function (query) {
    try {
        return await Notification.deleteOne(query);
    } catch (e) {
        // Log Errors
        throw Error('Error while deleting notification')
    }
}

exports.updateNotification = async function (query, body) {
    try {
        return await Notification.findOneAndUpdate({_id: query}, body, {new: true});
    } catch (e) {
        // Log Errors
        throw Error('Error while updating notification')
    }
}