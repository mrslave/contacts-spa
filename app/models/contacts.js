var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Contact = new Schema({  
  id : {type: String, require : true, trim : true, unique : true},
  name : {type : String, require : true, trim : true},
  email : {type : String, require : true, trim : true},
  phone : {type : String, default : ''},
  address : {type : String, default : ''},
  birth : {type : String, default : ''},
  desc : {type : String, default : ''}
});

module.exports = mongoose.model('Contact', Contact);