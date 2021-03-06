(function() {
    /* Goodreads - Handles all connectivity to Goodreads API */
    /* API Docs: http://www.goodreads.com/api */  var Goodreads, http, oauth, sys, xml2js;
    http = require('http');
    xml2js = require('xml2js');
    oauth = (require('oauth')).OAuth;
    sys = require('sys');
    Goodreads = (function() {
        /* CONFIG */    var clone;
        function Goodreads(config) {
            this.options = {
                host: 'www.goodreads.com',
                port: 80,
                key: config.key,
                secret: config.secret,
                callback: config.callback || 'http://localhost:3000/callback',
                method: 'GET',
                path: '',
                oauth_request_url: 'http://goodreads.com/oauth/request_token',
                oauth_access_url: 'http://goodreads.com/oauth/access_token',
                oauth_version: '1.0',
                oauth_encryption: 'HMAC-SHA1'
            };
            this.oauthAccessToken = '';
            this.oauthAcessTokenSecret = '';
            this.client = null;
        }
        Goodreads.prototype.configure = function(gr_key, gr_secret, gr_callback) {
            this.options.key = gr_key || this.options.key;
            this.options.secret = gr_secret || this.options.secret;
            return this.options.callback = gr_callback || this.options.callback;
        };
        /* BOOKSHELVES */
        Goodreads.prototype.getShelves = function(userId, callback) {
            console.log('Getting shelves ' + userId);
            this.options.path = 'http://www.goodreads.com/shelf/list.xml?user_id=' + userId + "&key=" + this.options.key;
            return this.getRequest(callback);
        };
        Goodreads.prototype.getSingleShelf = function(userId, listId, callback) {
            console.log('Getting list: ' + listId);
            this.options.path = 'http://www.goodreads.com/review/list/' + userId + '.xml?key=' + this.options.key + '&shelf=' + listId;
            return this.getRequest(callback);
        };
        /* NOTE: Not Working Yet!!!! */
        Goodreads.prototype.getFriends = function(userId, accessToken, accessTokenSecret, callback) {
            var oa;
            console.log('Getting friends ' + userId);
            this.options.path = 'http://www.goodreads.com/friend/user/' + userId + '.xml?&key=' + this.options.key;
            oa = new oauth(this.options.oauth_request_url, this.options.oauth_access_url, this.options.key, this.options.secret, this.options.oauth_version, this.options.callback, this.options.oauth_encryption);
            return oa.getProtectedResource(this.options.path, 'GET', accessToken, accessTokenSecret, function(error, data, response) {
                if (error) {
                    return callback('Error getting OAuth request token : ' + JSON.stringify(error), 500);
                } else {
                    return callback(data);
                }
            });
        };
        /* OAUTH */
        Goodreads.prototype.requestToken = function(callback) {
            var oa;
            oa = new oauth(this.options.oauth_request_url, this.options.oauth_access_url, this.options.key, this.options.secret, this.options.oauth_version, this.options.callback, this.options.oauth_encryption);
            return oa.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results) {
                var url;
                if (error) {
                    console.log(error);
                    return callback('Error getting OAuth request token : ' + JSON.stringify(error), 500);
                } else {
                    url = 'https://goodreads.com/oauth/authorize?oauth_token=' + oauthToken + '&oauth_callback=' + oa._authorize_callback;
                    return callback({
                        oauthToken: oauthToken,
                        oauthTokenSecret: oauthTokenSecret,
                        url: url
                    });
                }
            });
        };
        Goodreads.prototype.processCallback = function(oauthToken, oauthTokenSecret, authorize, callback) {
            console.log("got data");
            var oa;
            oa = new oauth(this.options.oauth_request_url, this.options.oauth_access_url, this.options.key, this.options.secret, this.options.oauth_version, this.options.callback, this.options.oauth_encryption);
            console.log(oa);

            return oa.getOAuthAccessToken(oauthToken, oauthTokenSecret, authorize, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
                console.log("oauthAccessToken : " + JSON.stringify(oauthAccessToken))
                var parser;
                parser = new xml2js.Parser();
                if (error) {
                    callback('Error getting OAuth access token : ' + (sys.inspect(error)) + '[' + oauthAccessToken + '] [' + oauthAccessTokenSecret + '] [' + (sys.inspect(results)) + ']', 500);
                } else {
                    oa.get('http://www.goodreads.com/api/auth_user', oauthAccessToken, oauthAccessTokenSecret, function(error, data, response) {
                        if (error) {
                            return callback('Error getting User ID : ' + (sys.inspect(error)), 500);
                        } else {
                            var parseString = parser.parseString(data);
                            console.log("Parsed data" + parseString)
                            return  parseString;
                        }
                    });
                }
                return parser.on('end', function(result) {
                    console.log("Result " + JSON.stringify(result ))
                    if (result.GoodreadsResponse.user[0]['$'].id !== null) {
                        return callback({
                            'userid': result.GoodreadsResponse.user[0]['$'].id,
                            'success': 1,
                            'accessToken': oauthAccessToken,
                            'accessTokenSecret': oauthAccessTokenSecret
                        });
                    } else {
                        return callback('Error: Invalid XML response received from Goodreads', 500);
                    }
                });
            });
        };
        /* API: 'GET' */
        Goodreads.prototype.getRequest = function(callback) {
            var parser, tmp, _options;
            _options = this.options;
            tmp = [];
            parser = new xml2js.Parser();
            return http.request(_options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function(chunk) {
                    return tmp.push(chunk);
                });
                res.on('end', function(e) {
                    var body;
                    body = tmp.join('');
                    return parser.parseString(body);
                });
                return parser.on('end', function(result) {
                    return callback(result);
                });
            }).end();
        };
        clone = function(obj) {
            if (obj !== null || typeof obj !== 'object') {
                return obj;
            }
        };
        return Goodreads;
    })();
    module.exports = {
        client: function(options) {
            return new Goodreads(options);
        }
    };
}).call(this);
