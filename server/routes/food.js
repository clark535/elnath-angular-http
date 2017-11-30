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

router.post('/', function(req, res){
    var newFood = req.body;
    //attempt to connect to the database
    pool.connect(function(errorConnectingToDatabase, client, done){
        if (errorConnectingToDatabase) {
            //there was an error connecting to the database
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //we connected to the database
            //now, we are going to get things from the database
            client.query(`INSERT INTO food (name, deliciousness_rating, is_hot) 
            VALUES ($1, $2, $3);`, [newFood.name, newFood.deliciouness_rating, newFood.is_hot], 
            function(errorMakingQuery, result){
                done();//have to write it with the VALUES ($1, $2, $3, ect..)', [req.body.--, req.body.--]
                if (errorMakingQuery) {
                    //query failed, did you test in postico?
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.sendStatus(201);//201 is created.
                }
            });//copy and paste form database.js
        }
    });
});


module.exports = router;