'use strict';

angular.module('socklessJS.services.localStorage', [])
    .service('localStorage', function ($window) {

        //TODO: Should use $cookies (ngCookies) to persist state if not browser supports local storage
        var ls = $window.localStorage;

        var _collection = function (name) {

            if(typeof name != 'string') throw Error('You must provide a collection name');

            var _getCollection = function () {

                //Try catch to handle erronous existing data
                try {
                    return angular.fromJson( ls.getItem(name) ) || {};
                }
                catch(e)
                {
                    ls.setItem(name, undefined);
                    return {};
                }

            }

            var _saveCollection = function (value) {
                ls.setItem(name, angular.toJson(value));
            }

            var _set = function (key, value) {
                var collection = _getCollection();
                collection[key] = value;
                _saveCollection(collection);
            };

            var _get = function (key) {
                var collection = _getCollection();
                return collection[key];
            };

            return {
                set: _set,
                get: _get
            }

        };

        return {
            collection: _collection
        }
    });
