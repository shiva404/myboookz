var ids = {
    facebook: {
        clientID: '136567019835635',
        clientSecret: '925042e37ac32f1591cc9e18cda99297',
        callbackURL: 'http://localhost:8080/auth/fb/callback'
    },
    twitter: {
        consumerKey: 'get_your_own',
        consumerSecret: 'get_your_own',
        callbackURL: "http://127.0.0.1:1337/auth/twitter/callback"
    },
    goodreads: {
        clientID: 'QLM3lL2nqXe4LujHQt12A',
        clientSecret: 'Aegcm52QdTinBh6g5fZe81S5cVYdKk9P6IDVS38pDOw',
        callbackURL: "http://localhost:8080/auth/goodreads/callback"
    },
    google: {
        returnURL: 'http://127.0.0.1:1337/auth/google/callback',
        realm: 'http://127.0.0.1:1337'
    }
}

module.exports = ids
