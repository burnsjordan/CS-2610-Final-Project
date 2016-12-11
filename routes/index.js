var express = require('express');
var router = express.Router();
//var db = require('../bin/www');
//console.log(db);
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/noteStore', (err, database) => {
  db = database;
});

/* GET home page. */
router.get('/', (req, res) => {
    db.collection('notes').find().toArray((err, result) => {
        if (err) return console.log(err);
        // renders index.ejs
        res.render('index.ejs', {
            notes: result,
            title: "Notes"
        });
    });
});

router.post('/add', (req, res) => {
    db.collection('notes').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('saved to database');
        res.redirect('/');
    });
});

router.delete('/notes', (req, res) => {
  db.collection('notes').findOneAndDelete({title: req.body.title},
  (err, result) => {
    if (err) return res.send(500, err);
    res.send('A darth vadar quote got deleted');
  });
});

router.put('/notes', (req, res) => {
    db.collection('notes').findOneAndUpdate({
        title: req.body.oldTitle
    }, {
        $set: {
            title: req.body.title,
            body: req.body.body
        }
    }, {
        sort: {
            _id: -1
        },
        upsert: true
    }, (err, result) => {
        if (err) return res.send(err);
        res.send(result);
    });
});

module.exports = router;
