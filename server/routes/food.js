var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function(req, res) {
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM food ORDER BY id; ', function(errorMakingQuerry, result){
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

router.delete('/:id', function(req, res){
    var foodToRemove = req.params.id;
    //attempt to connect to the database
    pool.connect(function(errorConnectingToDatabase, client, done){//connects to the database
        if (errorConnectingToDatabase) {
            //there was an error connecting to the database
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //we connected to the database
            //now, we are going to get things from the database
            client.query(`DELETE FROM food WHERE id=$1;`, [foodToRemove], function(errorMakingQuery, result){
                done();
                if (errorMakingQuery) {
                    //query failed, did you test in postico?
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.sendStatus(200);//200 is all good.
                }
            });//copy and paste form database.js
        }
    });
});

router.put('/', function(req, res){
    var foodToChange = req.body;
    pool.connect(function(errorConnectingToDatabase, client, done){//connects to the database
        if (errorConnectingToDatabase) {
            //there was an error connecting to the database
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //we connected to the database
            //now, we are going to get things from the database
            client.query(`UPDATE food SET name=$1, deliciousness_rating=$2, is_hot=$3 WHERE id = $4;`, 
            [foodToChange.name, foodToChange.deliciousness_rating, foodToChange.is_hot, foodToChange], 
            function(errorMakingQuery, result){
                done();
                if (errorMakingQuery) {
                    //query failed, did you test in postico?
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.sendStatus(200);//200 is all good.
                }
            });//copy and paste form database.js
        }
    });
});

module.exports = router;