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
    if (data.status == 'inwork' || data.status == 'done') {
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


  //=============================CHAT======================================================
  socket.on('get all mess', function(data) {
    let sql = `SELECT * FROM 'chat' WHERE n_zak = ${data.id_dialog};`;
    var arr = [];
    console.log(sql);
    db.each(sql, (err, row) => {
      if (data.id_user == row['sender']) {
        arr.push('<div class="msg messageSent">'+row['mess']+'\<i class="material-icons readStatus">done_all</i><span class="timestamp">'+row['time']+'</span></div> -->');
      }else{
        arr.push('<div class="msg messageReceived">'+row['mess']+'\<span class="timestamp">'+row['time']+'</span><span class="status_user">'+row['status_sender']+'</span></div> -->');
      }
    },()=>{
      socket.emit('set all mess', {messages: arr});
    });
    // console.log(arr);
  });
  socket.on('get all dialog', function(data) {
    let sql = `SELECT DISTINCT n_zak FROM 'chat' WHERE sender = ${data.id};`;
    console.error(sql);
    var arr = [];
    db.each(sql, (err, row) => {
      arr.push('<div class="chatButton" data-id="'+row['n_zak']+'"> <div class="chatInfo"> <div class="image"> </div> <p class="name">Диспут №'+row['n_zak']+' </p> <p class="message">Wow!</p> </div>  </div>');
    },()=>{
      socket.emit('set all dialog', {dialogs: arr});
    });
    // console.log(arr);
  });

  socket.on('add mess', function(data, callback) {
    let sql = `SELECT * FROM user WHERE id = ${data.id_user};`;
    // console.log(sql);
    var status = '';
    db.each(sql, (err, row) => {
      // console.log(row);
      switch (row['status']) {
        case 'cur':
          status = "Курьер #"+row['id'];
          break;
        case 'mag':
          status = "Магазин #"+row['id'];
          break;
        case 'cli':
          status = "Клиент #"+row['id'];
          break;
      }
      let sql = `INSERT INTO 'chat' (mess, n_zak, sender, time, status_sender) VALUES ('${data.message}','${data.id_dialog}','${data.id_user}','${data.time}','${status}');`;
      db.run(sql, (err, row) => {
        socket.broadcast.emit('show new mess',  {arr:data, stat:status});
        callback();
      });
    });
  });



socket.on('new disput', function(data, callback) {
  let sql = `SELECT * FROM 'chat' WHERE n_zak = ${data.id_pac};`;
  db.all(sql, (err, row) => {
    console.log(row);
    if (row.length == 0) {
      let sql = `SELECT * FROM 'package' WHERE id = ${data.id_pac};`;
      db.each(sql, (err, row) => {
        let time = new Date().toString().substr(16, 5);
        db.serialize(function() {
          db.run(` INSERT INTO chat(mess,n_zak,sender,time,status_sender) VALUES ('Клиент создал диспут по заказу №${data.id_pac}',${data.id_pac},${data.id_user},'${time}','');`);
          if (row['shop']) 
          db.run(`INSERT INTO chat(mess,n_zak,sender,time,status_sender) VALUES ('Магазин присоединился',${data.id_pac},${row['shop']},'${time}','');`);
          
          db.run(`INSERT INTO chat(mess,n_zak,sender,time,status_sender) VALUES ('Курьер присоединился',${data.id_pac},${row['performing']},'${time}','');`,()=>{
            callback();
          });
        });
      });
      
    } else {
      callback();
    }
  });
});



socket.on('finish package', function(data, callback) {
  //
  let sql = `UPDATE 'package' SET status = 'finished', rating = ${data.vote} WHERE id = ${data.id};`;
  db.run(sql, (err, row) => {
    let sql = `UPDATE 'user' SET rating = (select avg(rating) from package where shop = (select shop from package where id = ${data.id})) WHERE id = (select shop from package where id = ${data.id});`;
    db.run(sql, (err, row) => {
      if (err) {
        console.error(err.message );
        console.error(sql);
      } else{
        console.log(sql);

        console.log('Done');
        callback();
      }
    });
  });
  // socket.emit('reload');
});


socket.on('remove disput', function(data, callback) {
  let sql = `DELETE FROM chat WHERE n_zak = ${data.id};`;
  console.log(sql);
  db.run(sql, (err, row) => {
    if (err) {
      console.error(err.message );
      console.error(sql);
    } else{
      console.log('Done');
      callback();
    }
  });
  // socket.emit('reload');
});








});