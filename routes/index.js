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
  passport.authenticate('item', async function(err, item, info) {
    if (item) {
      await updateItem(req, res);
    } else if (info){
      res.status(422).send(info);
    } else if (!item){
      res.status(404).send({});
    }
  })(req, res, next);
});

router.delete('/api/items/:id', async function(req, res, next) {
  await deleteItem(req, res);
});


router.post('/api/login', function(req, res, next) {
  passport.authenticate('local', async function(err, user, info) {
    console.log(info)
    if (user) {
      await login(req.body, res);
    } else {
      res.status(422).send({
        "field": info,
        "message":"Wrong email or password"
      });
    }
  })(req, res, next);
});

router.post('/api/register',  async function(req, res, next) {
  passport.authenticate('register', async function(err, user, info) {
    if (user) {
      await registration(req.body, res);
    } else {
      res.status(422).send({
        "field": info,
        "message":"Wrong email or password"
      });
    }
  })(req, res, next);
});

router.post('/api/items/:id/images', async function(req, res, next) {
  await uploadItemImage(req, res);
});

router.post('/api/items', function(req, res, next) {
  passport.authenticate('item', async function(err, item, info) {
    if (item) {
      await createItem(req, res);
    } else {
      res.status(422).send( info);
    }
  })(req, res, next);
});

module.exports = router;
