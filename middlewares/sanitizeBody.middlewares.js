const sanitize = {
    users: ["password", "email"],
    admin_users: ["password", "email"]
}

exports.sanitizeBody = function(type){
    return async (req, res, next) => {
        try {
            await sanitize[type]?.forEach(field => {
                delete req.body[field];
            })
            next();
        }
        catch (error) {
            next(error)
        }
    }
}

