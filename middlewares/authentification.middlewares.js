const jwt = require('jsonwebtoken')
const config = require('../config/config.json')

module.exports = (req,res,next) => {
    const token = req?.headers['authorization']
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.status(401).send({status:401,"error": true, "message": 'Unauthorized access.'});
            }
            req.decoded = decoded;
            req.user_id = decoded.user_id;
            req.role = decoded.role
            next();
        });
    } else {
        return res.status(403).send({status:403,
            "error": true,
            "message": 'No token provided.'
        });
    }
}