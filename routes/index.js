var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  db.collection('notes').find().toArray((err, result) => {
    if (err) return console.log(err);
    // renders index.ejs
    res.render('index.ejs', {notes: result});
  });
});

router.post('/add', (req, res) => {
  db.collection('notes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

module.exports = router;
