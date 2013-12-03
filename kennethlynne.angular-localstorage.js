'use strict';

angular.module('kennethlynne.angular-localstorage', ['ngCookies'])
    .service('localStorage', function ($window, $cookies) {

        function browserHaslocalStorageSupport() {

            if (!('localStorage' in $window && $window['localStorage'] !== null)) return false;
            try {
                // When Safari (OS X or iOS) is in private browsing mode, it appears as though localStorage
                // is available, but trying to call .setItem throws an exception.
                $window.localStorage.setItem('key', '');
                $window.localStorage.removeItem('key');
            }
            catch (e) {
                return false;
            }

            return true;
        }

        var ls = $window.localStorage;

        var _collection = function (name) {

            if (typeof name != 'string') throw Error('You must provide a collection name');

            var _getCollection = function () {

                //Try catch to handle erroneous existing data
                try {
                    var data = browserHaslocalStorageSupport() ? ls.getItem(name) : $cookies[name];
                    return angular.fromJson(data || "{}");
                }
                catch (e) {
                    return {};
                }
            }

            var _saveCollection = function (value) {
                var data = angular.toJson(value);
                if (!browserHaslocalStorageSupport()) {
                    $cookies[name] = data;
                }
                else {
                    ls.setItem(name, data);
                }
            };

            var _set = function (key, value) {
                var collection = _getCollection();
                collection[key] = value;
                _saveCollection(collection);
            };

            var _get = function (key) {
                return _getCollection()[key];
            };

            return {
                set: _set,
                get: _get
            }

        };

        return {
            collection: _collection,
            mode: function () {
                return browserHaslocalStorageSupport() ? 'localStorage' : 'cookies'
            }
        }
    });
