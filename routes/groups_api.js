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

exports.showGroup = function(req, res) {
    var groupId = req.params.groupId;
    neo4jclient.getGroup(groupId, function(err, group){
        if(err)
            console.error("Error!! while getting message")
        else
            res.render('show_group', {group: group});
    });
}