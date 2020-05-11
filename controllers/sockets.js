var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('database.db');

var io = require('socket.io')(server);
connections = [];


io.sockets.on('connection', function(socket) {
  console.log("Подключился - "+ socket.id);
  connections.push(socket);

  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Отключился - "+ socket.id);
  });

  socket.on('set avatar', function(data) {
    db.run(`UPDATE 'user' SET avatar = '${data.ava}' WHERE id = ${data.idUser};`, (err, row) => {
      if (err) {
        console.error(err.message);
        // console.error(`INSERT INTO 'user' (avatar) VALUES ('${data.ava}') WHERE id = ${data.idUser};`);
      } else{
        console.log('Done');
      }
    });
    socket.emit('reload');
  });



  socket.on('new zakaz', function(data) {
    let sql = `INSERT INTO 'package' (id, address_A, address_B, cost, email, fast ,name ,options ,phone ,rules ,startTime ,status ,ves) 
VALUES (NULL,'${data.address_A}','${data.address_B}','${data.cost}','${data.email}','${data.fast}','${data.name}','${data.options}','${data.phone}','${data.rules}','${data.startTime}','created','${data.ves}');`;
    db.run(sql, (err, row) => {
      if (err) {
        console.error(err.message);
      } else{
        console.log('Done');
      }
    });
    socket.emit('reload');
  });


  socket.on('new tovar', function(data) {
    var db = new sqlite3.Database('database.db');
    db.serialize(function() {
        let sql = `INSERT INTO 'product' (id, name, cost, image, mag) 
    VALUES (NULL,'${data.tovar.name}','${data.tovar.cost}','${data.tovar.image}','${data.tovar.id_mag}');`;
        db.run(sql, (err, row) => {
          if (err) {
            console.error(err.message);
            console.error(sql);
          } else{
            console.log('Done');
          }
          db.close();
        });
    });
      socket.emit('reload');
    });


  socket.on('upd status package', function(data) {
    let sql = `UPDATE 'package' SET status = '${data.status}' WHERE id = ${data.id_pac};`;
    db.run(sql, (err, row) => {
      if (err) {
        console.error(err.message );
        console.error(sql);
      } else{
        console.log('Done');
      }
    });
    socket.emit('reload');
  });

});