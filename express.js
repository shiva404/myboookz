var express = require('express'), stylus = require('stylus'), nib = require('nib');
var app = express();
var config = require('./oauth.js');
var routes = require('./routes');
var passport = require('passport'), 
    FacebookStrategy = require('passport-facebook').Strategy;

url = require('url');

goodreads = require('./goodreads.js');
gr = new goodreads.client({'key': config.goodreads.clientID,'secret':config.goodreads.clientSecret, "callback": config.goodreads.callbackURL });

fakeSession = {};

var neo4jclient = require("./neo4jclient.js");

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib())
}
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.static(__dirname + '/public'));
    app.use(stylus.middleware(
        { src: __dirname + '/public'
            , compile: compile
        }
    ));
    app.use(express.logger());
    app.use(express.cookieParser('password123'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({ secret: 'my_precious' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
});


passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user.id);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    neo4jclient.getUserFromId(id, function(error, resultUser){
        console.log("deserializing user:" + resultUser);
        if(!error) done(null, resultUser);
        else done(error, null)
    })
});

passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {

        neo4jclient.getUserFromFbId(profile._json.id, function(error, resultUser){

            if (!error && resultUser != null) {
                done(null, resultUser)
            } else {
                if(error.code = "NOT_FOUND"){
                    var user = {fbId: profile.id, name:profile.displayName, email: profile._json.email};
                    console.log("Creating user:" + JSON.stringify(user));
                    neo4jclient.createUser(user, function(error, createdUser){
                        if(error && createdUser == null){
                            alert("User creation failed");
                        }
                        done(null, createdUser);
                    });
                } else {
                    console.log(error);
                    alert("Internal server occurred!!");
                }
            }
        });
    }
));

//passport.use(new GoodreadsStrategy({
//        consumerKey: config.goodreads.clientID,
//        consumerSecret: config.goodreads.clientSecret,
//        callbackURL: "http://127.0.0.1:8080/auth/goodreads/callback"
//    },
//    function(token, tokenSecret, profile, done) {
//        console.log("Gooooot aaaacccc ((((((((((" + token);
//        done(null, profile)
//    }
//));

app.get('/', ensureAuthenticated, function(req, resp){
    neo4jclient.getUserFromId(req.session.passport.user, function(err, user){
        if(err)
            console.log(err);
        else
            resp.render('account', {user: user});
    })
});
app.get('/ping', routes.ping);
app.get('/account', ensureAuthenticated, function(req, res){
    neo4jclient.getUserFromId(req.session.passport.user, function(err, user){
        if(err)
            console.log(err);
        else
            res.render('account', {user: user});
    })
});

app.get('/auth/fb/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/account');
});

app.get('/auth/goodreads/callback', function(req, res) {
    var oauthToken = fakeSession.oauthToken;
    var oauthTokenSecret = fakeSession.oauthTokenSecret;
    console.log(req + "oauthToken: " + oauthToken + "oauthTokenSecret" + oauthTokenSecret);
    var params = url.parse(req.url, true);
    return gr.processCallback(oauthToken, oauthTokenSecret, params.query.authorize, function(callback) {
        //res.write(JSON.stringify(callback));
        //to-do call neo4j to collect data for the user
        var fields = {goodreadsId: callback.userid, goodreadsAccessToken: callback.accessToken }
        neo4jclient.updateFields(fields, req.session.passport.user, function(error, data){
            if(error != null){
                //todo: toast message saying error occurred
            }
            res.redirect('/');
        });
    });
});

app.get('/auth/goodreads',function(req, resp){
    return gr.requestToken(function(callback) {
        fakeSession.oauthToken = callback.oauthToken;
        fakeSession.oauthTokenSecret = callback.oauthTokenSecret;
        console.log("redirecting yo" + callback.url);
        resp.redirect(callback.url)
    });
});

app.get('/auth/facebook',
    passport.authenticate('facebook'),
    function(req, res){
    });

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.render('index', { title: "Start Bootstrap"});
}

app.listen(8080);
