var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'mysql-311app.cc9yj0tsmaa6.us-east-1.rds.amazonaws.com',
  user     : 'ubuntu',
  password : '1234567890',
  database : '311app'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected (For Issues) ...");
} else {
    console.log("Error connecting database (For Issues)...");
}
});

exports.issues = function(req,res){
  connection.query('SELECT * FROM issues', req.params.id, function (error, results, fields) {
    if (error) {
      console.error('Error connecting: ' + error.stack);
      return;
    }
    res.send(results)
  });
}

exports.munIssues = function(req,res){
  connection.query('SELECT * FROM issues WHERE mun_id = ?', req.params.id, function (error, results, fields) {
    if (error) {
      console.error('Error connecting: ' + error.stack);
      return;
    }
    res.send(results)
  });
}

exports.singleIssue = function(req,res){
  connection.query('SELECT * FROM issues WHERE issueId = ?', req.params.id, function (error, results, fields) {
    if (error) {
      console.error('Error connecting: ' + error.stack);
      return;
    }
    res.send(results)
  });
}

exports.issuesOfUser = function(req,res){
  connection.query('SELECT * FROM issues WHERE username = ?', req.params.username, function (error, results, fields) {
    if (error) {
      console.error('Error connecting: ' + error.stack);
      return;
    }
    res.send(results)
  });
}
