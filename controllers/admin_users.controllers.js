const AdminUserService = require('../services/admin_users.services')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../config/config.json')
const saltRounds = 10;
const validator = require("validator")
const {updateAdminUser, deleteAdminUser} = require("../services/admin_users.services");

exports.createAdminUser = async function (req, res, next) {
    try {
        let adminUser = await AdminUserService.createAdminUser(req.body);
        return res.status(200).json({status: 200, data: adminUser, message: "AdminUser Successfully Created"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.searchAdminUsers = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    const page = req.query.page ? req.query.page : 0;
    const limit = req.query.limit ? req.query.limit : 10;
    const search = req.query.search ? new RegExp(req.query.search, 'i') : null
    console.log(search)
    let query = search !== null ? {$or: [{email: search}, {firstname: search}, {lastname: search}]} : {}
    try {
        let adminUsers = await AdminUserService.getAdminUsers(query, page, limit);
        return res.status(200).json({status: 200, data: adminUsers, message: "Successfully AdminUsers Retrieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getAdminUsers = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    const page = req.query.page ? req.query.page : 0;
    const limit = req.query.limit ? req.query.limit : 10;
    const query = req.query.query
    try {
        let adminUsers = await AdminUserService.getAdminUsers(query, page, limit);
        return res.status(200).json({status: 200, data: adminUsers, message: "Successfully AdminUsers Retrieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateAdminUser = async function (req, res) {
    try {
        let adminUser = await updateAdminUser(req.body.id, req.body)
        return res.status(200).json({status: 200, data: adminUser, message: "AdminUser Successfully updated"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.deleteAdminUser = async function (req, res) {
    try {
        let adminUser = await deleteAdminUser({_id: req?.body?.id})
        return res.status(200).json({status: 200, data: adminUser, message: "AdminUser Successfully deleted"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.getMe = async function (req, res) {
    try {
        let user = await AdminUserService.getAdminUser({_id:req.user_id})
        return res.status(200).json({status: 200, data: user, message: "User Successfully retrieved"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.login = async function (req, res) {
    try {
        let adminUser = await AdminUserService.getAdminUser({email: req.body.email})
        if (await adminUser.comparePassword(req.body.password)) {
            // save adminUser token
            adminUser.token = jwt.sign({adminUser_id: adminUser._id, email: adminUser.email, role: adminUser.role_id}, config.secret, {expiresIn: "1d"});
            adminUser.refresh_token = jwt.sign({
                adminUser_id: adminUser._id, email: adminUser.email, role: adminUser.role_id
            }, config.refreshTokenSecret, {expiresIn: "7d",});
            adminUser.update({token: adminUser.token, refresh_token: adminUser.refresh_token})
            return res.status(200).json({status: 200, data: adminUser, message: "AdminUser Successfully logged in"});
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
        let adminUser = await AdminUserService.createAdminUser(req.body)
        adminUser.token = jwt.sign({adminUser_id: adminUser._id, email: adminUser.email}, config.secret, {expiresIn: "1d"});
        adminUser.refresh_token = jwt.sign({
            adminUser_id: adminUser._id, email: adminUser.email
        }, config.refreshTokenSecret, {expiresIn: "7d"});
        await adminUser.update({token: adminUser.token, refresh_token: adminUser.refresh_token})
        return res.status(200).json({status: 200, data: adminUser, message: "AdminUser Successfully register"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.updateToken = (req, res) => {
    const refresh_token = req.body.refresh_token;
    jwt.verify(refresh_token, secret, async function (err, decoded) {
        if (err) return res.status(500).send({auth: false, message: "Failed to authenticate token."}); else {
            const AdminUser_id = decoded.id;
            let adminUser = await AdminUserService.getAdminUser({_id: AdminUser_id})
            const token = jwt.sign({id: adminUser._id}, secret, {expiresIn: "1d"});
            await AdminUserService.updateAdminUser({_id: adminUser._id}, {token: token})
            return res.status(200).send({auth: true, token: token, id: adminUser._id});
        }
    });
}

exports.uploadPicture = async (req, res) => {
    try {
        const {id} = req.body;
        if (req.file) {
            const pathName = req.file.path;
            console.log(pathName)
            const find = await AdminUserService.getAdminUser({_id: id});
            if (!find) {
                    res.status(404).json({status:404, message: "AdminUser not found"})
            }
            await AdminUserService.updateAdminUser({_id: id}, {picture_url: pathName})
            res.status(200).json({message: 'Picture successfully added to adminUser'})
        } else {
            res.status(400).json({message: 'AdminUser Image does not exists'})
        }
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}