var exports = module.exports = {};
var neo4jclient = require("../neo4jclient.js");
var async = require('async')

exports.showUser = function (req, res) {
    var userId = req.params.userId;
    neo4jclient.getUserFromId(userId, function (error, user) {
        if (error) {
            res.render("error_page")
        } else {
            async.parallel({
            groups: function (callback) {
                neo4jclient.getGroupsOfUser(userId, function(error, groups){
                    callback(error, groups);
                });
            },
            friends: function (callback) {
                neo4jclient.getFriends(userId, req.session.passport.user, function(error, friends){
                    callback(error, friends)
                })
            },
            events: function(callback) {
                neo4jclient.getUserActityFeed(userId, function (error, events){
                    callback(error, events);
                });
            }, 
            availableBooks: function(callback) {
                neo4jclient.getAvailableBooks(userId, function (error, availableBooks){
                    callback(error, availableBooks);
                });   
            }
        },
        function(err, results) {
            res.render('show_user', {title: user.name, availableBooks: results.availableBooks, 
                ruser:user, events:results.events, friends:results.friends ,action: "timeline"});
        });
        }
    })
}
