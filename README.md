angular-localstorage
====================

Yet another local storage service for Angular

TODO: Expand readme and set up demo page using GitHub pages

Example use: 

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
