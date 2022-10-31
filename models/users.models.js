const mongoose = require('mongoose');
const checker = require('validator');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: {
        required: true,
        unique: true,
        type: String,
        validate: {
            validator: function (v) {
                return checker.isEmail(v)
            },
            message: "Email is invalid"
        }
    },
    username: {
        type: String
    },
    birthdate: {
        type: Date
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    description: {
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
    token: String,
    refresh_token: String
})

UserSchema.pre('save', function (next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
};

const User = mongoose.model('User', UserSchema)

module.exports = User;