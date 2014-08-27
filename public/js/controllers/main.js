angular.module('contactsController', [])	
	
	.controller('mainController', ['$scope','$http','Contacts', function($scope, $http, Contacts) {
		$scope.formData = {};		
				
		Contacts.get()
			.success(function(data) {				
				$scope.contacts = data;				
			});

		// CREATE
		$scope.createContact = function() {
			$scope.loading = true;
			if ($scope.formData.name != undefined) {								
				Contacts.create($scope.formData)					
					.success(function(data) {						
						$scope.formData = {};
						$scope.contacts = data;
					});
			}
		};
		
		// DELETE
		$scope.deleteContact = function(id) {
			$scope.loading = true;
			Contacts.delete(id)				
				.success(function(data) {					
					$scope.contacts = data;
				});
		};
		
		// SHOW
		$scope.showContact = function(id) {
			var btnadd = document.getElementById('addbutton');
			btnadd.style.display='none';
			var btnedit = document.getElementById('savebutton');
			btnedit.style.display='block';			
			Contacts.show(id)				
				.success(function(dataone) {
					$scope.formData = dataone;					
				});		
		};
		
		// EDIT
		$scope.editContact = function(id) {			
			var btnadd = document.getElementById('addbutton');
			btnadd.style.display='block';
			var btnedit = document.getElementById('savebutton');
			btnedit.style.display='none';
			if ($scope.formData.name != undefined) {
				Contacts.edit(id, $scope.formData)				
					.success(function(data) {
						$scope.contacts = data;						
						$scope.formData = {};
					});
			}
		};
	}]);