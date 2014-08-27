angular.module('contactService', [])	
	.factory('Contacts', ['$http',function($http) {
		return {
			get : function() {								
				return $http.get('/api/contacts');
			},
			create : function(contactData) {				
				return $http.post('/api/contacts', contactData);				
			},	
			delete : function(id) {				
				return $http.delete('/api/contacts/' + id);
			},
			show : function(id) {				
				return $http.get('/api/contacts/' + id);
			},
			edit : function(id, contactData) {
				return $http.post('/api/contacts/edit/' + id, contactData);
			}
		}
	}]);