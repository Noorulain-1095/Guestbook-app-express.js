const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {addGuestPage, addGuest, deleteGuest, editGuest, editGuestPage} = require('./routes/guest');
const port = 2000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'guestbook'
});

// connect to database
db.connect((err) => {
    if (err){
	db.query("CREATE DATABASE guestbook", function (err, result) {
    if (err) throw err;
    console.log("Database created");
	});
	var sql = "CREATE TABLE guests (id int(5) NOT NULL AUTO_INCREMENT, user_name VARCHAR(255), email VARCHAR(255), comment VARCHAR(255), PRIMARY KEY (`id`) )";
	db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
	});
	}
   console.log('Connected to database');
});
global.db = db;



// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(express.static(path.join(__dirname, 'views/assets'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', getHomePage);
app.get('/add', addGuestPage);
app.get('/edit/:id', editGuestPage);
app.get('/delete/:id', deleteGuest);
app.post('/add', addGuest);
app.post('/edit/:id', editGuest);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});