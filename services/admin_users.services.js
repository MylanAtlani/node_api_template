const AdminUser = require('../models/admin_users.models')

exports.createAdminUser = async function (adminUser) {

    try {
        return await AdminUser.create(adminUser);
    } catch (e) {
        // Log Errors
        throw Error('Error while creating adminUser: ' + e)
    }
}

exports.getAdminUsers = async function (query, page, limit) {

    try {
        return await AdminUser.find(query).limit(limit).skip( limit * page);
    } catch (e) {
        // Log Errors
        console.log(e)
        throw Error('Error while Paginating AdminUsers')
    }
}

exports.getAdminUser = async function (query) {

    try {
        return await AdminUser.findOne(query);
    } catch (e) {
        // Log Errors
        throw Error('Error while getting adminUser')
    }
}

exports.deleteAdminUser = async function (query) {
    try {
        return await AdminUser.deleteOne(query);
    } catch (e) {
        // Log Errors
        throw Error('Error while deleting adminUser')
    }
}

exports.updateAdminUser = async function (query, body) {
    try {
        return await AdminUser.findOneAndUpdate({_id: query}, body, {new: true});
    } catch (e) {
        // Log Errors
        throw Error('Error while updating adminUser')
    }
}