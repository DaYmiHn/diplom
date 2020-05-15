var express = require('express');
var router = express.Router();
var user = require('../controllers/user.js')

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
			user.getTrue(req, res);
		} else {
			res.send(user.getId(req, res, req.params.id));
		}
  	})
	.post(function(req, res) {
		user.newUser(req, res)
	})
	.put(function(req, res) {
		res.send('Update the book');
	})
	.delete(function(req, res) {
		res.send('Delete the book');
	});

//================================================================================================
router.route('/tovar/:act')
	.post(function(req, res) {
		if (req.params.id == 'add'){
			let sql = `INSERT INTO 'product' (id, name, cost, image, mag) VALUES (NULL,'${req.params.name}','${req.params.cost}','${req.params.image}','${req.params.id_mag}');`;
	        db.run(sql, (err, row) => {
	          if (err) {
	            console.error(err.message);
	            console.error(sql);
	          } else{
	            res.send('Data Inserted');
	          }
	        });

		} if (req.params.id == 'update'){
			 // $value = mysqli_real_escape_string($connect, $_POST["value"]);
			 // $query = "UPDATE user SET ".$_POST["column_name"]."='".$value."' WHERE id = '".$_POST["id"]."'";
			 // if(mysqli_query($connect, $query))
			 // {
			 //  echo 'Data Updated';
			 // }
			
		} if (req.params.id == 'delete'){
			// $query = "DELETE FROM user WHERE id = '".$_POST["id"]."'";
			//  if(mysqli_query($connect, $query))
			//  {
			//   echo 'Data Deleted';
			//  }
		} if (req.params.id == 'fetch'){
			// $columns = array('first_name', 'last_name');

			// $query = "SELECT * FROM user ";

			// if(isset($_POST["search"]["value"]))
			// {
			//  $query .= '
			//  WHERE first_name LIKE "%'.$_POST["search"]["value"].'%" 
			//  OR last_name LIKE "%'.$_POST["search"]["value"].'%" 
			//  ';
			// }

			// if(isset($_POST["order"]))
			// {
			//  $query .= 'ORDER BY '.$columns[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].' 
			//  ';
			// }
			// else
			// {
			//  $query .= 'ORDER BY id DESC ';
			// }

			// $query1 = '';

			// if($_POST["length"] != -1)
			// {
			//  $query1 = 'LIMIT ' . $_POST['start'] . ', ' . $_POST['length'];
			// }

			// $number_filter_row = mysqli_num_rows(mysqli_query($connect, $query));

			// $result = mysqli_query($connect, $query . $query1);

			// $data = array();

			// while($row = mysqli_fetch_array($result))
			// {
			//  $sub_array = array();
			//  $sub_array[] = '<div contenteditable class="update" data-id="'.$row["id"].'" data-column="first_name">' . $row["first_name"] . '</div>';
			//  $sub_array[] = '<div contenteditable class="update" data-id="'.$row["id"].'" data-column="last_name">' . $row["last_name"] . '</div>';
			//  $sub_array[] = '<button type="button" name="delete" class="btn btn-danger btn-xs delete" id="'.$row["id"].'">Delete</button>';
			//  $data[] = $sub_array;
			// }

			// function get_all_data($connect)
			// {
			//  $query = "SELECT * FROM user";
			//  $result = mysqli_query($connect, $query);
			//  return mysqli_num_rows($result);
			// }

			// $output = array(
			//  "draw"    => intval($_POST["draw"]),
			//  "recordsTotal"  =>  get_all_data($connect),
			//  "recordsFiltered" => $number_filter_row,
			//  "data"    => $data
			// );

			// echo json_encode($output);




		}

	});

module.exports = router;
	// db.close(); 
