var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function(req, res) {
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM food; ', function(errorMakingQuerry, result){
                done();
                if (errorMakingQuerry) {
                    console.log('error making query', errorMakingQuerry)
                    res.sendStatus(500)
                } else {
                    res.send(result.rows);
                }
            })
        }
    })
    //res.sendStatus(200);
});

module.exports = router;