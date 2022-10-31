const users = require('./users.routes');
const adminUsers = require('./admin_users.routes');
const roles = require('./roles.routes')
const posts = require('./posts.routes');
const notifications = require("./notifications.routes");
const likes = require("./likes.routes");
const friends = require("./friends.routes");
const devices = require("./devices.routes");
const comments = require("./comments.routes");
const bills = require("./bills.routes");
const events = require("./events.routes");
const tickets = require("./tickets.routes");
const hashtags = require("./hashtags.routes");
const logs = require("./logs.routes");

module.exports.router = (app) => {
    app.use('/users', users);
    app.use('/admin_users', adminUsers);
    app.use('/roles', roles);
    app.use('/notifications', notifications);
    app.use('/devices', devices);
    app.use('/logs', logs);
}