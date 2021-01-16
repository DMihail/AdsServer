const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/api/login ', jsonParser, function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/api/register  ', jsonParser, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
