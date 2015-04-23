var config = module.exports = {};

config.env = 'dev';
config.hostname = 'dev.example.com';

config.facebook = {}
config.facebook.clientID = '635482949856311'
config.facebook.clientSecret = 'eac0b0051d188ce6cb5f88e54eebde64'
config.facebook.callbackURL = 'http://localhost:3000/auth/fb/callback'

config.goodreads = {}
config.goodreads.clientID = 'QLM3lL2nqXe4LujHQt12A'
config.goodreads.clientSecret = 'Aegcm52QdTinBh6g5fZe81S5cVYdKk9P6IDVS38pDOw'
config.goodreads.callbackURL = 'http://localhost:3000/auth/goodreads/callback'

config.neo4jservice = {}
config.neo4jservice.baseurl = 'http://localhost:8389/neo4j/v1'
