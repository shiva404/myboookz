var config = module.exports = {};

config.env = 'dev';
config.hostname = 'dev.example.com';

config.facebook = {}
config.facebook.clientID = '1388491331468994'
config.facebook.clientSecret = '48fa75bb950bce707f1ac31d078d9569'
config.facebook.callbackURL = 'http://localhost:3000/auth/fb/callback'

config.goodreads = {}
config.goodreads.clientID = 'QLM3lL2nqXe4LujHQt12A'
config.goodreads.clientSecret = 'Aegcm52QdTinBh6g5fZe81S5cVYdKk9P6IDVS38pDOw'
config.goodreads.callbackURL = 'http://localhost:3000/auth/goodreads/callback'

config.neo4jservice = {}
config.neo4jservice.baseurl = 'http://localhost:8389/neo4j/v1'