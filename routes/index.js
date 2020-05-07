var express = require('express');
var router = express.Router();

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
    console.log(shops.data);
  }
};    shops.init();




/* GET home page. */
router.get('/', function(req, res, next) {
  	if (req.cookies['auth'] == 'true') {
      db.each(`SELECT * FROM user WHERE id = '${req.cookies['id']}'`, function(err, row) {
        res.render('index', { auth: 'true', shops: shops.data, user: row});
      });
  		
  	} else {
  		res.render('auth', { auth: 'false' });
  	}
});
router.get('/reg/:name', function(req, res, next) {
  	res.render('index', { name: req.params['name'] });
});
module.exports = router;

