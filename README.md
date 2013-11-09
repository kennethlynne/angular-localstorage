angular-localstorage
====================

Yet another local storage service for Angular.
This service abstracts local storage, and lets the user handle data in collections rather than plain key value. This enforces proper namespacing.
It handles serialization and deserialization of objects.

TODO: 
* Expand readme
* Set up demo page using GitHub pages
* Implement fallback to cookies if browser does not support local storage

##Usage

* ```bower install https://github.com/kennethlynne/angular-localstorage.git```
* Add ```KLLocalStorage``` as a dependancy to your app module.

```javascript
angular.module('yourModule', ['KLLocalStorage'])
	.controller('yourCtrl', function($scope, localStorage) {

		localStorage.collection('settings')
			.set('message',{text: 'Hello world'}); //It supports objects
		
		var messageObject = localStorage.collection('settings').get('message');
		
		alert(messageObject.text); //Alerts "Hello world"
		
	});
```

##Testing

To run tests: ```grunt test```
