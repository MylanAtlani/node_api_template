const mongoose = require('mongoose');
const checker = require('validator');
const bcrypt = require("bcrypt");

const AdminUserSchema = new mongoose.Schema({
    email: {
        required: true,
        //unique: true,
        type: String,
        validate: {
            validator: function (v) {
                return checker.isEmail(v)
            },
            message: "Email is invalid"
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return checker.isMobilePhone(v)
            },
            message: "Phone number is invalid"
        }
    },
    username: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    picture_url: String,
    firstname: String,
    lastname: String,
    password: {
        required: true,
        type: String
    },
    role_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    token: String,
    refresh_token: String
})

AdminUserSchema.pre('save', function (next) {
    const adminUser = this;

    // only hash the password if it has been modified (or is new)
    if (!adminUser.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(adminUser.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            adminUser.password = hash;
            next();
        });
    });
});

AdminUserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
};

const AdminUser = mongoose.model('AdminUser', AdminUserSchema)

module.exports = AdminUser;