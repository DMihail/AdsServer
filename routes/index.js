const express = require('express');
const bodyParser = require('body-parser');
const {login, registration} = require('../src/functions/apiFunctions');
const router = express.Router();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/api/login', jsonParser, function(req, res, next) {
  login(req.body, res);
  res.send('respond with a resource');
});

router.post('/api/register', jsonParser, function(req, res, next) {
  registration(req.body, res);
  res.send('respond with a resource');
});

module.exports = router;
