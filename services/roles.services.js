const Role = require('../models/roles.models')

exports.createRole = async function (role) {

    try {
        return await Role.create(role);
    } catch (e) {
        // Log Errors
        throw Error('Error while creating role: ' + e)
    }
}

exports.getRoles = async function (query, page, limit) {

    try {
        return await Role.find(query).limit(limit).skip( limit * page);
    } catch (e) {
        // Log Errors
        console.log(e)
        throw Error('Error while Paginating Roles')
    }
}

exports.getRole = async function (query) {

    try {
        return await Role.findOne(query);
    } catch (e) {
        // Log Errors
        throw Error('Error while getting role')
    }
}

exports.deleteRole = async function (query) {
    try {
        return await Role.deleteOne(query);
    } catch (e) {
        // Log Errors
        throw Error('Error while deleting role')
    }
}

exports.updateRole = async function (query, body) {
    try {
        return await Role.findOneAndUpdate({_id: query}, body, {new: true});
    } catch (e) {
        // Log Errors
        throw Error('Error while updating role')
    }
}