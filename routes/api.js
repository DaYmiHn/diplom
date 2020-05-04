var express = require('express');
var router = express.Router();


var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('database.db');

//==========================================PACKAGE====================================================

router.route('/package/:id')
	.get(function(req, res) {
		db.each('SELECT * FROM `package` WHERE `id` = '+req.params.id, (err, row)=> {
			console.log(row.address_A);
    		res.send(row); 
		});
  	})
	.post(function(req, res) {
		db.run("INSERT INTO `package` (id,name,email,address_A,address_B,cost,options,startTime,fast) VALUES (NULL,'1','1','123','23',23,'kuj','324','234');");
		res.send('Add a book');
	})
	.put(function(req, res) {
		res.send('Update the book');
	})
	.delete(function(req, res) {
		res.send('Delete the book');
	});

//==========================================USER====================================================
router.route('/user/:id*?')
	.get(function(req, res) {
		if (!req.params.id) {
			db.each(`SELECT * FROM user WHERE log = '${req.query.log}' AND pas = '${req.query.pas}'`, function(err, row) {
				res.cookie('auth', 'true' );
				res.cookie('id',  row.id);
	  			res.send('document.location.reload(true);');
			}, function(err, rows) {
				if (rows == 0) {
					res.send('alert("Неправильный логин или пароль!");');
				}
			});
		}
  	})
	.post(function(req, res) {
		console.log(`INSERT INTO 'user' (log,pas) VALUES ('${req.body.log}','${req.body.pas}');`);
		db.run(`INSERT INTO 'user' (log,pas) VALUES ('${req.body.log}','${req.body.pas}');`, function(err, row) {
	  			if (!err){res.cookie('auth', 'true' ); res.send('document.location.reload(true);');}
				else res.send("alert('Логин уже есть');");
			});
	})
	.put(function(req, res) {
		res.send('Update the book');
	})
	.delete(function(req, res) {
		res.send('Delete the book');
	});

//================================================================================================
module.exports = router;
	// db.close(); 
