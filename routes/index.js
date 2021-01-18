const express = require('express');
const bodyParser = require('body-parser');
const {login, registration, getCurrentUser, uploadItemImage, createItem} = require('../src/functions/apiFunctions');
const router = express.Router();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const fs = require('fs-extra');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/api/me', async function(req, res, next) {
  await getCurrentUser(req.headers.authorization, res);
});

router.post('/api/login', jsonParser, async function(req, res, next) {
  await login(req.body, res);
});

router.post('/api/register', jsonParser, async function(req, res, next) {
  await registration(req.body, res);
});

router.post('/api/items/:id/images', jsonParser, async function(req, res, next) {
  console.log(req.params.id);
  req.pipe(
      fs.createWriteStream(`file2.jpg`)
  ).on('finish', () => res.end('ok'));
});

router.post('/api/items ', jsonParser, async function(req, res, next) {
  await createItem();
});

module.exports = router;
