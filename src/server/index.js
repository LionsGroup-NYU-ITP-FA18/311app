const express = require('express');
const os = require('os');

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/hello', (req, res) => res.send({express: "Hello From Express" }));
app.get('/api/311', (req, res) => res.send({express: "Hello From 311 App" }));
app.listen(8080, () => console.log('Listening on port 8080!'));
