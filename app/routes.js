var Contact = require('./models/contacts');

var randomHash = (function () {
    var letters = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
    return function (keylen) {
      var result = '';	  
      for (var j=0; j < keylen; j++) {
        result += letters[Math.floor(Math.random() * letters.length)];		
      };	  
      return result;
    };
  })();

module.exports = function(app) {	  
  // get all contacts
  app.get('/api/contacts', function(req, res) {    
    Contact.find(function(err, contacts) {      
      if (err) {
        console.log('error in get all contacts: ' + err);
		res.send(err);
	  }
      res.json(contacts); // return all contacts in JSON format	  
    });
  });

  // create contact and send back all contacts after creation
  app.post('/api/contacts', function(req, res) {      	
    Contact.create({
	  id : randomHash(20),
	  name : req.body.name,
	  email : req.body.email,
	  phone : req.body.phone,
	  address : req.body.address,
	  birth : req.body.birth,
 	  desc : req.body.desc  	  
    },	
    function(err, contact) {
	  if (err) {
	    console.log('error in create contact: ' + err);
		res.send(err);		
	  }  	  
	  Contact.find(function(err, contacts) {
	    if (err) {
		  console.log('error in get all contacts: ' + err);
		  res.send(err);		  
		}		
	    res.json(contacts); // return all contacts in JSON format		
	  });
    });
  });
 
  // delete contact and send back all contacts after deleted
  app.delete('/api/contacts/:contact_id', function(req, res) {	
	Contact.remove({
	  id : req.params.contact_id
	}, function(err, contact) {
	  if (err) {
		console.log('error in delete contact: ' + err);
		res.send(err);		
	  }	  
	  Contact.find(function(err, contacts) {
	    if (err) {
	 	  console.log('error in get all contacts ' + err);
		  res.send(err);		  
		}
        res.json(contacts); // return all contacts in JSON format
	  });
    });
  });

  // show contact
  app.get('/api/contacts/:contact_id', function(req, res) {    
	Contact.findOne( {id : req.params.contact_id},
	  function(err, contact) {      
      if (err) {
        console.log('error in show contact: ' + err);
		res.send(err);		
	  }
      res.json(contact); // return contact in JSON format	  
    });	
  });
  
  // edit contact and send back all contacts after update
  app.post('/api/contacts/edit/:contact_id', function(req, res) {    
	var contact = {
	  id : req.params.contact_id,
	  name : req.body.name,
	  email : req.body.email,
	  phone : req.body.phone,
	  address : req.body.address,
	  birth : req.body.birth,
 	  desc : req.body.desc
	}
	Contact.update( {id : req.params.contact_id}, contact, function(err, contact) {
	  if (err) {
	    console.log('error in update contact: ' + err);
		res.send(err);		
	  }  	  
	  Contact.find(function(err, contacts) {
	    if (err) {
		  console.log('error in get all contacts: ' + err);
		  res.send(err);		  
		}		
	    res.json(contacts); // return all contacts in JSON format
	  });
    });	
  });
       
  // application
  app.get('*', function(req, res) {
	res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};