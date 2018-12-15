var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'mysql-311app.cc9yj0tsmaa6.us-east-1.rds.amazonaws.com',
  user     : 'ubuntu',
  password : '1234567890',
  database : '311app'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected (For Login)... ");
} else {
    console.log("Error connecting database (For Login)... ");
}
});

exports.register = function(req,res){
  var today = new Date();
  var users={
    "username":req.body.username,
    "email":req.body.email,
    "password":req.body.password,
    "admin":req.body.admin,
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "mun_id":req.body.mun_id
  }

  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });
}

exports.login = function(req,res){
  var username= req.body.username;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE username = ?', username, function (error, results, fields) {
  if (error) {
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    if(results.length >0){
      if(results[0].password == password){
        res.send({
          "code":200,
          "success":"login sucessful",
          "mun_id":results[0].mun_id
            });
      }
      else{
        res.send({
          "code":204,
          "success":"Username and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Username does not exist"
          });
    }
  }
  });
}
