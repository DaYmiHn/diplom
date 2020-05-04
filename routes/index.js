var express = require('express');
var router = express.Router();
const app = express('express');
    // , cookieParser = require('cookie-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.cookie('userid1', '2222222222' );
  	console.log(req.cookies['userid1']);
  	res.render('index', { title: 'Express' });
});
router.get('/reg/:name', function(req, res, next) {
  	res.render('index', { name: req.params['name'] });
});
module.exports = router;
