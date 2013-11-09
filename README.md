angular-localstorage
====================

Yet another local storage service for Angular

TODO: Expand readme and set up demo page using GitHub pages

Example use: 

```javascript
angular.module('yourModule', ['KLLocalStorage'])
.controller('yourCtrl', [
  '$scope',
  'localStorage',
  function($scope, localStorage) {
 	
 	localStorage.collection('settings').set('message',{text: 'Hello world'}); //It supports objects
 	alert(localStorage.collection('settings').get('message').text); //Alerts "Hello world"
}]);
```

##Testing

To run tests: ```grunt test```
