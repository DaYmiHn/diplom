var express = require('express');
var router = express.Router();


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');


// /* GET home page. */
// router.get('/add/package/', function(req, res, next) {
// 	db.serialize(function() {
// 		db.run("INSERT INTO `package` (id,name,email,address_A,address_B,cost,options,startTime,fast) VALUES (NULL,'1','1','123','23',23,'kuj','324','234');");

// 		db.each('SELECT * FROM `package`', function(err, row) {
// 			console.log(row.id + ': ' + row.name);
// 		});
// 	});
// 	res.send('успешно добавлено');
// });







router.route('/package/:id')
	.get(function(req, res) {
		// console.log('SELECT * FROM `package` WHERE `id` = '+req.params.id);
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


router.route('/user/:id')
	.get(function(req, res) {
		// console.log('SELECT * FROM `package` WHERE `id` = '+req.params.id);
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






module.exports = router;
	// db.close(); 
