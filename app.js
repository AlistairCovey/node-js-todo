var express = require('express');
var todoController = require('./controllers/todoController');

//start the express engine
var app = express();

//set up the template engine
app.set('view engine', 'ejs');

//static files - using the css
app.use(express.static('./public'));

//fire controllers
todoController(app);


//listening to a port
app.listen(3000);
console.log('you are listening to port 3000');
