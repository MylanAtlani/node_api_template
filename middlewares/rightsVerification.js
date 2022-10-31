const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const RolesServices = require("../services/roles.services")

function rightsVerification(neededRights, route) {
  return async function (req, res, next) {
      if (req.role) {
        let role = await RolesServices.getRole({_id: req.role})
        role[route] >= neededRights ? next() : res.status(403).send({status:403, message:"the route is forbidden"})
      } else res.status(403).send({status:403, message:"the route is forbidden"})
  };
}

module.exports = rightsVerification