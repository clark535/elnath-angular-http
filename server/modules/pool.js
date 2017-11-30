var pg = require('pg');


var config = {
    database: 'restaurant', //name of our database
    host: 'localhost', //where is your datebase - which computer
    port: 5432, //the port number for your database - 5432 is default
    max: 10, // how many connections at one time
    idleTimeoutMillis: 30000 // 30 secdons to try to connect to our database
};

module.exports = new pg.Pool(config);