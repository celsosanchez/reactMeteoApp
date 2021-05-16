var cors = require('cors')
const account = require('./account/lib.js');
const city = require('./city/lib.js');
const home = require('./home.js')

module.exports = function (app) {
    app.post('/login', account.login);
    app.post('/signup', account.signup);
    app.post('/home', account.logout); //every call needing to be authenticated passes by home
    app.delete('/home',city.del);
    app.put('/home', city.add);
    app.get('/home', home.home);
}

