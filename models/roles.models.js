const mongoose = require('mongoose');
const checker = require('validator');
const { ObjectId } = require('mongoose');

const RolesSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique: true
    },
    description: String,
    //rights charts 0=NONE, 2=READ, 4=CREATE, 6=UPDATE, 7=DELETE
    roles:{
        type:Number,
        required:true,
        default:0
    },
    admin_users:{
        type:Number,
        required:true,
        default:0
    },
    users:{
        type:Number,
        required:true,
        default:0
    },
    notifications:{
        type:Number,
        required:true,
        default:0
    },
    posts:{
        type:Number,
        required:true,
        default:0
    },
    likes:{
        type:Number,
        required:true,
        default:0
    },
    friends:{
        type:Number,
        required:true,
        default:0
    },
    devices:{
        type:Number,
        required:true,
        default:0
    },
    comments:{
        type:Number,
        required:true,
        default:0
    },
    created_at: {
        type:Date,
        default: Date.now()
    }
})

const Role = mongoose.model('Role', RolesSchema)

module.exports = Role;