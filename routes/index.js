const express = require('express');
const bodyParser = require('body-parser');
const {login, registration, getCurrentUser} = require('../src/functions/apiFunctions');
const router = express.Router();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/api/login', jsonParser, async function(req, res, next) {
  await login(req.body, res);
});

router.post('/api/register', jsonParser, async function(req, res, next) {
  await registration(req.body, res);
});

router.get('/api/me', async function(req, res, next) {
  await getCurrentUser(req.headers.authorization, res);
});

module.exports = router;
