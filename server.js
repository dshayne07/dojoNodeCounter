// require express
var express = require("express");
var path = require("path");
var session = require('express-session');
// create the express app
var app = express();
app.use(session({secret: 'codingdojorocks'}));  // string for encryption
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
    if(req.session.counter)
        req.session.counter++;
    else
        req.session.counter = 1;
    res.render("index", {counter: req.session.counter});
});
app.get('/add2', function(req, res){
    req.session.counter++;
    res.redirect('/');
});
app.get('/reset', function(req, res){
    req.session.counter = 0;
    res.redirect("/");
});
// post route for adding a user
// app.post('/users', function(req, res) {
//     console.log("POST DATA", req.body);
//     // This is where we would add the user to the database
//     // Then redirect to the root route
//     res.redirect('/');
// })
// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});