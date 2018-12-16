const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

const login = require('./routes/loginroutes');
const issues = require('./routes/issueroutes');
const users = require('./routes/userroutes');
const mun = require('./routes/municipalityroutes');
const comments = require('./routes/commentroutes');

app.use(express.static('dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.Router();
app.use('/api', router);
app.listen(3000, () => console.log('Listening on port 3000!'));

// Test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to the municipality 311 app' });
});

// Routes to handle user registration
router.post('/register/',login.register);
router.post('/login/',login.login);

// Routes for issues
router.get('/issues/',issues.issues);
router.get('/issues/municipality/:id/',issues.munIssues);
router.get('/issues/:id/',issues.singleIssue);
router.put('/issues/update/progress/:id/',issues.updateIssueProgress);
router.put('/issues/update/user/:id/',issues.updateIssueUser);

// Routes to get user information
router.get('/users/:username/',users.oneUser);
router.delete('/users/:username/',users.removeUser);
router.get('/users/municipality/:id/',users.getUsersFromMun);

// Routes to get municipality information
router.get('/municipality/:id/',mun.singleMun);
//router.put('/municipality/:id/',mun.changeMun);

// Routes to get user comments from users
router.get('/comments/:id/',comments.getComments);
