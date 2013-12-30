kennethlynne.angular-localstorage [![Build Status](https://travis-ci.org/kennethlynne/angular-localstorage.png?branch=master)](https://travis-ci.org/kennethlynne/angular-localstorage) [![Code Climate](https://codeclimate.com/repos/52c126e46956804e75002b3c/badges/45bff5a1e5d95ec7452a/gpa.png)](https://codeclimate.com/repos/52c126e46956804e75002b3c/feed)
====================

Yet another local storage service for Angular. It supports fallback to cookies, and is tested.
This service abstracts local storage. It lets the user handle data in collections rather than plain key value pairs and handles serialization and deserialization of objects.

TODO: 
* Set up demo page using GitHub pages

##Usage

* ```bower install https://github.com/kennethlynne/angular-localstorage.git```
* Add ```kennethlynne.angular-localstorage``` as a dependancy to your app module.

```javascript
angular.module('yourModule', ['kennethlynne.angular-localstorage'])
	.controller('yourCtrl', function($scope, localStorage) {

		localStorage.collection('settings')
			.set('message',{text: 'Hello world'}); //It supports objects
		
		var message = localStorage.collection('settings').get('message');
		
		alert(message.text); //Alerts "Hello world"
		
	});
```

##Testing

To run tests: ```grunt test```
