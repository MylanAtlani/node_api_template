const UserService = require('../services/users.services')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../config/config.json')
const saltRounds = 10;
const validator = require("validator")
const {updateUser, deleteUser, getUser} = require("../services/users.services");
const {uploadFile} = require("../utils/aws.js")
exports.createUser = async function (req, res, next) {
    try {
        let user = await UserService.createUser(req.body);
        return res.status(200).json({status: 200, data: user, message: "User Successfully Created"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.searchUsers = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    const page = req.query.page ? req.query.page : 0;
    const limit = req.query.limit ? req.query.limit : 10;
    const search = req.query.search ? new RegExp(req.query.search, 'i') : null
    console.log(search)
    let query = search !== null ? {$or: [{email: search}, {firstname: search}, {lastname: search}]} : {}
    try {
        let users = await UserService.getUsers(query, page, limit);
        return res.status(200).json({status: 200, data: users, message: "Successfully Users Retrieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getUsers = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    const page = req.query.page ? req.query.page : 0;
    const limit = req.query.limit ? req.query.limit : 10;
    const query = req.query.query
    try {
        let users = await UserService.getUsers(query, page, limit);
        return res.status(200).json({status: 200, data: users, message: "Successfully Users Retrieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateUser = async function (req, res) {
    try {
        let user = await updateUser(req.body.id, req.body)
        return res.status(200).json({status: 200, data: user, message: "User Successfully updated"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.deleteUser = async function (req, res) {
    try {
        let user = await deleteUser({_id: req?.body?.id})
        return res.status(200).json({status: 200, data: user, message: "User Successfully deleted"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.getMe = async function (req, res) {
    try {
        console.log(req.user_id)
        let user = await UserService.getUser({_id:req.user_id})
        console.log(user)
        return res.status(200).json({status: 200, data: user, message: "User Successfully retrieved"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.login = async function (req, res) {
    try {
        let user = await UserService.getUser({email: req.body.email})
        if (await user.comparePassword(req.body.password)) {
            // save user token
            user.token = jwt.sign({user_id: user._id, email: user.email}, config.secret, {expiresIn: "1d"});
            user.refresh_token = jwt.sign({
                user_id: user._id, email: user.email
            }, config.refreshTokenSecret, {expiresIn: "7d",});
            user.update({token: user.token, refresh_token: user.refresh_token})
            return res.status(200).json({status: 200, data: user, message: "User Successfully logged in"});
        }
        return res.status(500).json({status: 400, message: "password is incorrect"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.register = async function (req, res) {
    try {
        if (!validator.isStrongPassword(req.body.password)) return res.status(500).json({
            status: 500,
            message: 'Your password must contains at least minimum 8 character, 1 lowercase, 1 uppercase, 1 number and 1 symbols'
        })
        let user = await UserService.createUser(req.body)
        user.token = jwt.sign({user_id: user._id, email: user.email}, config.secret, {expiresIn: "1d"});
        user.refresh_token = jwt.sign({
            user_id: user._id, email: user.email
        }, config.refreshTokenSecret, {expiresIn: "7d"});
        await user.update({token: user.token, refresh_token: user.refresh_token})
        return res.status(200).json({status: 200, data: user, message: "User Successfully register"});
    } catch (e) {
        console.log(req.body)
        console.log(e)
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.updateToken = (req, res) => {
    const refresh_token = req.body.refresh_token;
    jwt.verify(refresh_token, secret, async function (err, decoded) {
        if (err) return res.status(500).send({auth: false, message: "Failed to authenticate token."}); else {
            const User_id = decoded.id;
            let user = await UserService.getUser({_id: User_id})
            const token = jwt.sign({id: user._id}, secret, {expiresIn: "1d"});
            await UserService.updateUser({_id: user._id}, {token: token})
            return res.status(200).send({auth: true, token: token, id: user._id});
        }
    });
}

exports.uploadPicture = async (req, res) => {
    try {
        const {id} = req.body;
        if (req.file) {
            const find = await UserService.getUser({_id: id});
            console.log(find)
            let url = await uploadFile(find._id + req.file.originalname,req.file)
            console.log(url)
            if (!find) {
                    res.status(404).json({status:404, message: "User not found"})
            }
            await UserService.updateUser({_id: id}, {picture_url: url})
            res.status(200).json({message: 'Picture successfully added to user'})
        } else {
            res.status(400).json({message: 'User Image does not exists'})
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({status: 400, message: e.message});
    }
}
