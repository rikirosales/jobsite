// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
  locations: String,
   site: String,
   date: String,
   url: String,
   title: String,
   description: String,
   company: String,
   salary: String
},{ collection : 'jobCollection' });

module.exports = mongoose.model('Bear', BearSchema);



//new Schema({ url: String, text: String, id: Number}, 
//           { collection : 'question' });   // collection name


