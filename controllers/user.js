var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('database.db');

var id;
module.exports = {
  getId: function (req, res, log) {
  	// console.log(`SELECT * FROM user WHERE log = '${log}'`);
    db.each(`SELECT * FROM user WHERE log = '${log}'`, function(err, row) {
    	if (!err) {
	    	res.cookie('id',  row['id']);
	    	// console.log(row['id']+"  2");
			id = row.id;
			return id;
    	}
	});
	// console.log(id+"  3");
	
  },
  getTrue: function (req, res) {
  	// console.log(`SELECT * FROM user WHERE log = '${req.query.log}' AND pas = '${req.query.pas}'`);
    db.each(`SELECT * FROM user WHERE log = '${req.query.log}' AND pas = '${req.query.pas}'`, function(err, row) {
		res.cookie('auth', 'true' );
		res.cookie('id',  row.id);
		res.send('done');
	}, function(err, rows) {
		// console.log(rows);
		if (rows == 0) {
			res.send('nope');
		}
	});
  },
  newUser: function (req, res) {
    console.log(`INSERT INTO 'user' (log,pas,email,name) VALUES ('${req.body.log}','${req.body.pas}','${req.body.email}','${req.body.name}');`);
		db.run(`INSERT INTO 'user' (log,pas,email,name) VALUES ('${req.body.log}','${req.body.pas}','${req.body.email}','${req.body.name}');`, function(err, row) {
	  			if (!err){
	  				db.each(`SELECT * FROM user WHERE log = '${req.body.log}'`, function(err, row) {
				    	if (!err) {
							res.cookie('id',  row.id);
			  				res.cookie('auth', 'true' );
			  				res.send('done');
				    	}
					});
	  				
	  			}
				else res.send('nope');
			});
  }
};