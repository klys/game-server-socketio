const {Server} = require( "socket.io");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.db');

const io = new Server({ cors:{origin: "*"} });

io.on("connection", (socket) => {
  // ...
  socket.on('login', (data) => {
    console.log(data);
    db.get('SELECT * FROM users WHERE email = ?', data.email, (err, row) => {
      if (err) {
        console.log(err);
        socket.emit('login', {
          success: false,
          message: 'Error logging in'
        });
      } else {
        if (row) {
          if (row.pw === data.password) {
            socket.emit('login', {
              success: true,
              message: 'Logged in'
            });
          } else {
            socket.emit('login', {
              success: false,
              message: 'Wrong password'
            });
          }
        } else {
          socket.emit('login', {
            success: false,
            message: 'User not found'
          });
        }
      }
    });
  });

  socket.on('signup', (data) => {
    console.log(data);
    db.get('SELECT * FROM users WHERE email = ?', data.email, (err, row) => {
      if (err) {
        console.log(err);
        socket.emit('signup', {
          success: false,
          message: 'Error signing up'
        });
      } else {
        if (row) {
          socket.emit('signup', {
            success: false,
            message: 'User already exists'
          });
        } else {
          db.run('INSERT INTO users (email, pw) VALUES (?, ?)', data.email, data.password, (err) => {
            if (err) {
              console.log(err);
              socket.emit('signup', {
                success: false,
                message: 'Error signing up'
              });
            } else {
              socket.emit('signup', {
                success: true,
                message: 'Signed up'
              });
            }
          });
        }
      }
    });

    });

});

io.listen(3001);