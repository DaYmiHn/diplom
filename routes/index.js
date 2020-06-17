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
            // console.log(row);
            packages.push(row);    
          });

          var edit;
          db.all(`SELECT id,name,cost FROM product `, (err, row )=> {
            edit = row;
            
          });
          var categorys = [];
          db.each(`SELECT distinct category, mag FROM product `, (err, row )=> {
            if(err) throw err;
            // console.log(row);
            categorys.push(row);    
          });




          // console.log(products);
          db.each(`SELECT * FROM user WHERE id = '${req.cookies['id']}'`, function(err, row) {
            // console.log(shops.products);
            res.render('index', { auth: 'true', shops: data, products: products, user: row, packages: packages, edit:JSON.stringify(edit), categorys: categorys});
            // delete shops;
          });
      });
  		
  	} else {
  		res.render('auth', { auth: 'false' });
  	}
});











router.get('/api', function(req, res, next) {
    
    db.all(`SELECT id,name,cost FROM product `, (err, row )=> {
      // if(err) throw err;
      // // console.log(row);
      // var products = row;  
      res.render('table', {
        title: 'Title',
        products: JSON.stringify(row)
      });
    });
    // console.log(JSON.stringify(products));
});



router.get('/getTov', function(req, res, next) {
    var products = [];
    db.all(`SELECT * FROM product `, (err, row )=> {
        
    res.send(row); 
    });
});







router.post('/api', function(req, res, next) {
    console.log(req.body);
    res.send(req.body.value); 
});



router.get('/shop/:shop', function(req, res, next) {
    // console.log(req.body);
    res.render('shop/shops');
});





module.exports = router;

