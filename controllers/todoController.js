var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // use native mongoose promises﻿

//connect to the database
mongoose.connect('mongodb://test:test@ds161179.mlab.com:61179/alistairtodoapp');

//create a scheme - This will be like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'get flowers'}).save(function(err){
//     if (err) throw err;
//     console.log('item saved');
//
// });

//var data = [{item: 'Item 1'}, {item: 'Item 2'}, {item: 'Item 3'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app){

    app.get('/todo', function(req, res){
        //get data from mongo and pass it to the view
        Todo.find({},function(err,data){
            if (err) throw err;
            res.render('todo', {todos: data});
        });

    });

    app.post('/todo', urlencodedParser, function(req, res){
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item', function(req, res){
        //delete the requested item from mongodb
        Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });

}
