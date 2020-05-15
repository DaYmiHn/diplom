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


    if (data.zakaz != 'посылка') {
      var json = JSON.parse(data.zakaz);

      const results = Object.values(json).reduce((acc, value) => {
        acc[value[3]] = [...(acc[value[3]] || []), value.slice(0, -1)]
        return acc;
      }, {});

      console.log(results);

      for (let key in results){
        let sql = `INSERT INTO 'package' (id, address_A, address_B, cost, email, fast ,name ,options ,phone  ,startTime, endTime ,status ,ves, zakaz, shop) 
    VALUES (NULL,'${data.address_A}','${data.address_B}','${data.cost}','${data.email}','${data.fast}','${data.name}','${data.options}','${data.phone}','${data.startTime}','${data.endTime}','moderate','${data.ves}','${results[key]}','${key}');`;
        db.run(sql, (err, row) => {
          if (err) {
            console.error(err.message);
          } else{
            console.log('Done');
            console.log(sql);
          }
        });
        // console.log(results[key]);
      }
    } else {
      let sql = `INSERT INTO 'package' (id, address_A, address_B, cost, email, fast ,name ,options ,phone  ,startTime, endTime ,status ,ves, zakaz) 
    VALUES (NULL,'${data.address_A}','${data.address_B}','${data.cost}','${data.email}','${data.fast}','${data.name}','${data.options}','${data.phone}','${data.startTime}','${data.endTime}','created','${data.ves}','${data.zakaz}');`;
        db.run(sql, (err, row) => {
          if (err) {
            console.error(err.message);
          } else{
            console.log('Done');
          }
        });
    }

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
    let performing;
    if (data.status == 'inwork') {
      performing = data.id_cur; 
    } else {
      performing = 'NULL'; 
    }
    let sql = `UPDATE 'package' SET status = '${data.status}', performing = ${performing} WHERE id = ${data.id_pac};`;
    db.run(sql, (err, row) => {
      if (err) {
        console.error(err.message );
        console.error(sql);
      } else{
        console.log('Done');
      }
    });
    // socket.emit('reload');
  });

  socket.on('upd mag', function(data) {
    if (typeof data.mag.name != 'undefined') {
      let sql = `UPDATE 'user' SET name = '${data.mag.name}' WHERE id = ${data.mag.id};`;
      db.run(sql, (err, row) => {
        if (err) {
          console.error(err.message );
          console.error(sql);
        } else{
          console.log('Done');
        }
      });
    }
    if (typeof data.mag.log != 'undefined') {
      let sql = `UPDATE 'user' SET log = '${data.mag.log}' WHERE id = ${data.mag.id};`;
      db.run(sql, (err, row) => {
        if (err) {
          console.error(err.message );
          console.error(sql);
        } else{
          console.log('Done');
        }
      });
    }
    if (typeof data.mag.pas != 'undefined') {
      let sql = `UPDATE 'user' SET pas = '${data.mag.pas}' WHERE id = ${data.mag.id};`;
      db.run(sql, (err, row) => {
        if (err) {
          console.error(err.message );
          console.error(sql);
        } else{
          console.log('Done');
        }
      });
    }
    if (typeof data.mag.act == 'undefined') {
      socket.emit('reload');
    }
  });

});