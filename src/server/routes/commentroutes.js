var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'mysql-311app.cc9yj0tsmaa6.us-east-1.rds.amazonaws.com',
  user     : 'ubuntu',
  password : '1234567890',
  database : '311app'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected (For Comments) ...");
} else {
    console.log("Error connecting database (For Comments)...");
}
});

exports.getComments = function(req,res){
  connection.query('SELECT * FROM comments WHERE issueId = ?', req.params.id, function (error, results, fields) {
    if (error) {
      console.error('Error connecting: ' + error.stack);
      return;
    }
    res.send(results)
  });
}
