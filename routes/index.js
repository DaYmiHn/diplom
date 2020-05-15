var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('database.db');


/* GET home page. */
router.get('/', function(req, res, next) {
  	if (req.cookies['auth'] == 'true') {
      db.serialize(function() {
          var data = [];
          db.each(`SELECT * FROM user WHERE status = 'mag' `, (err, row )=> {
            if(err) throw err;
            data.push(row);
          });
          var products = [];
          db.each(`SELECT * FROM product `, (err, row )=> {
            if(err) throw err;
            // console.log(row);
            products.push(row);    
          });
          var packages = [];
          db.each(`SELECT * FROM package `, (err, row )=> {
            if(err) throw err;
            row['zakaz'] = row['zakaz'].split(' ');
            row['options'] = row['options'].split(',');
            for (let key in row['zakaz']){
              row['zakaz'][key] = row['zakaz'][key].split(',');
            }
            console.log(row);
            packages.push(row);    
          });
          // console.log(products);
          db.each(`SELECT * FROM user WHERE id = '${req.cookies['id']}'`, function(err, row) {
            // console.log(shops.products);
            res.render('index', { auth: 'true', shops: data, products: products, user: row, packages: packages});
            // delete shops;
          });
      });
  		
  	} else {
  		res.render('auth', { auth: 'false' });
  	}
});
router.get('/reg/:name', function(req, res, next) {
  	res.render('index', { name: req.params['name'] });
});
module.exports = router;

