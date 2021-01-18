const express = require('express');
const bodyParser = require('body-parser');
const {login, registration, getCurrentUser, uploadItemImage, createItem, getItems, getItem, updateItem, deleteItem} = require('../src/functions/apiFunctions');
const router = express.Router();
const jsonParser = bodyParser.json();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/api/me', async function(req, res, next) {
  await getCurrentUser(req.headers.authorization, res);
});


router.get('/api/items', async function(req, res, next) {
  await getItems(req.headers.authorization, res);
});


router.get('/api/items/:id', async function(req, res, next) {
  await getItem(req, res);
});

router.put('/api/items/:id', async function(req, res, next) {
  await updateItem(req, res);
});

router.delete('/api/items/:id', async function(req, res, next) {
  await deleteItem(req, res);
});

router.post('/api/login', jsonParser, async function(req, res, next) {
  await login(req.body, res);
});

router.post('/api/register', jsonParser, async function(req, res, next) {
  await registration(req.body, res);
});

router.post('/api/items/:id/images', jsonParser, async function(req, res, next) {
 await uploadItemImage(req, res);
});

router.post('/api/items', jsonParser, async function(req, res, next) {
  await createItem(req, res);
});

module.exports = router;
