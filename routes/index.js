var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/reg/:name', function(req, res, next) {
  res.render('index', { name: req.params['name'] });
});
module.exports = router;
