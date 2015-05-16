var exports = module.exports = {};
var neo4jclient = require("../neo4jclient.js");
var moment = require('moment');

exports.addGroup = function (req, res) {
    var userId = req.session.passport.user;
    neo4jclient.addGroup(req.body.group, userId, function(error, group){
        if(error) {
            res.errorCode = 500;
            res.json(error)
        } else {
            res.send(group)
        }
    })
};