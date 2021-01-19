const express = require('express');
const passport = require('passport');
const {login, registration, getCurrentUser, uploadItemImage,
  createItem, getItems, getItem, updateItem, deleteItem} = require('../controllers/functions/apiFunctions');
const router = express.Router();

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

router.post('/api/login', passport.authenticate('local', { session: false }), async function(req, res, next) {
  await login(req.body, res);
});

router.post('/api/register',  async function(req, res, next) {
  await registration(req.body, res);
});

router.post('/api/items/:id/images', async function(req, res, next) {
  await uploadItemImage(req, res);
});

router.post('/api/items',  async function(req, res, next) {
  await createItem(req, res);
});

module.exports = router;
