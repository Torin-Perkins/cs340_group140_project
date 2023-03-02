// ./database/db-connector.js starter code copied from https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_goldstem',
    password        : '3647',
    database        : 'cs340_goldstem'
})

// Export it for use in our applicaiton
module.exports.pool = pool;