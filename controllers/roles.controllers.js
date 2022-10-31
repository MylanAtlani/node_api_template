const RoleService = require('../services/roles.services')

exports.createRole = async function (req, res, next) {
    try {
        let role = await RoleService.createRole(req.body);
        return res.status(200).json({status: 200, data: role, message: "Role Successfully Created"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.getRoles = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    const page = req.query.page ? req.query.page : 0;
    const limit = req.query.limit ? req.query.limit : 10;
    const query = req.query.query
    try {
        let roles = await RoleService.getRoles(query, page, limit);
        return res.status(200).json({status: 200, data: roles, message: "Successfully Roles Retrieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateRole = async function (req, res) {
    try {
        let role = await updateRole(req.body.id, req.body)
        return res.status(200).json({status: 200, data: role, message: "Role Successfully updated"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

exports.deleteRole = async function (req, res) {
    try {
        let role = await deleteRole(req?.body?.id)
        return res.status(200).json({status: 200, data: role, message: "Role Successfully deleted"});
    } catch (e) {
        return res.status(500).json({status: 400, message: e.message});
    }
}

// to do for Roles
exports.searchRoles = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    const page = req.query.page ? req.query.page : 0;
    const limit = req.query.limit ? req.query.limit : 10;
    const search = req.query.search ? new RegExp(req.query.search, 'i') : null
    let query = search !== null ? {$or: [{email: search}, {firstname: search}, {lastname: search}]} : {}
    try {
        let roles = await RoleService.getRoles(query, page, limit);
        return res.status(200).json({status: 200, data: roles, message: "Successfully Roles Retrieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}