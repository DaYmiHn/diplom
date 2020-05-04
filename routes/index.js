var express = require('express');
var router = express.Router();
const app = express('express');

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('database.db');


var shops = {
  data: [],
  log: function (message) {
    console.log(this.data);
  },
  init: function() {
    db.each(`SELECT * FROM shop `, (err, row )=> {
		if(err) throw err;
		shops.data.push(row);    
	});
  }
};    shops.init();

/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log(shops.data[0]['name']);
  	if (req.cookies['auth'] == 'true') {
  		res.render('index', { auth: 'true', shops: shops.data});
  	} else {
  		res.render('auth', { auth: 'false' });
  	}
});
router.get('/reg/:name', function(req, res, next) {
  	res.render('index', { name: req.params['name'] });
});
module.exports = router;
