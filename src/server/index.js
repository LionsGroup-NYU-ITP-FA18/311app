const express = require('express');
const os = require('os');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host     : 'mysql-311app.cc9yj0tsmaa6.us-east-1.rds.amazonaws.com',
  user     : 'ubuntu',
  password : '1234567890',
  database : '311app'
});

app.use(express.static('dist'));

app.get('/api/issues', (req, res) => {

    connection.connect(function(err) {
      if (err) {
          console.error('Error connecting: ' + err.stack);
          return;
      }

      console.log('Connected as id ' + connection.threadId);
    });

    connection.query('SELECT * FROM issues LIMIT 0, 10', function (error, results, fields) {
      if (error) {
        console.error('Error connecting: ' + error.stack);
        return;
      }
      res.send(results)
    });

    connection.end();
});

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/hello', (req, res) => res.send({express: "Hello From Express" }));
app.get('/api/311', (req, res) => res.send({express: "Hello From 311 App" }));
app.get('/api/411', (req, res) => res.send({express: "Hello From 411 App" }));
app.listen(8080, () => console.log('Listening on port 3000!'));
