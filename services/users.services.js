const User = require('../models/users.models')

exports.createUser = async function (user) {

    try {
        return await User.create(user);
    } catch (e) {
        // Log Errors
        throw Error('Error while creating user: ' + e)
    }
}

exports.getUsers = async function (query, page, limit) {

    try {
        return await User.find(query).limit(limit).skip( limit * page);
    } catch (e) {
        // Log Errors
        console.log(e)
        throw Error('Error while Paginating Users')
    }
}

exports.getUser = async function (query) {

    try {
        return await User.findOne(query);
    } catch (e) {
        // Log Errors
        throw Error('Error while getting user')
    }
}

exports.deleteUser = async function (query) {
    try {
        return await User.deleteOne(query);
    } catch (e) {
        // Log Errors
        throw Error(e)
    }
}

exports.updateUser = async function (query, body) {
    try {
        return await User.findOneAndUpdate({_id: query}, body, {new: true});
    } catch (e) {
        // Log Errors
        throw Error('Error while updating user')
    }
}