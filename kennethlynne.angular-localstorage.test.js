'use strict';

describe('Service: localStorage', function () {

    var localStorage, window, localStorageMemory, $cookies;

    beforeEach(function() {

        localStorageMemory = {};

        window = {

            localStorage: {

                setItem: function (key, value) {
                    localStorageMemory[key] = String(value);
                },

                getItem: function (key) {
                    return localStorageMemory[key];
                },

                removeItem: function (key) {
                    delete localStorageMemory[key];
                }
            }
        };

        $cookies = {};

        module('kennethlynne.angular-localstorage', function ($provide) {
            $provide.value('$window', window);
            $provide.value('$cookies', $cookies);
        });

        inject(function(_localStorage_) {
            localStorage = _localStorage_;
        });
    });

    it('should return something', function () {
        expect(!!localStorage).toBe(true);
    });

    it('should expose a collection API', function() {
        expect(typeof localStorage.collection).toBe('function');
    });

    it('should use local storage when available', function() {
        expect(localStorage.mode()).toBe('localStorage');
    });

    it('should throw an error if collection name is not specified', function() {
        expect(localStorage.collection).toThrow();
    });

    it('should return a collection', function() {
        expect(typeof localStorage.collection('test')).toBe('object');
    });

    it('should have a get and set method on collection', function() {
        expect(typeof localStorage.collection('test').set).toBe('function');
        expect(typeof localStorage.collection('test').get).toBe('function');
    });

    it('should set the items value and get it', function() {
        localStorage.collection('settings').set('key','value');
        expect(localStorage.collection('settings').get('key')).toBe('value');
    });

    it('should set the items value and get it for objects', function() {
        var obj = {data: 'text'};
        localStorage.collection('settings').set('key',obj);
        expect(localStorage.collection('settings').get('key')).toEqual(obj);
    });

    it('should handle erronous existing data gracefully', function () {
        localStorageMemory.settings = '{"key":"this is valid"}';
        expect(localStorage.collection('settings').get('key')).toBe('this is valid');

        localStorageMemory.settings = '[this is not valid]';
        expect(localStorage.collection('settings').get('key')).toBe(undefined);
    });

    it('should serialize objects on save and deserialize objects on retrieve', function() {
        var src = {title: 'This is an object', object: {desc:'Object with multiple levels'}};
        var jsonData = '{"key":{"title":"This is an object","object":{"desc":"Object with multiple levels"}}}'

        localStorage.collection('collection').set('key', src);

        expect(localStorageMemory.collection).toEqual(jsonData);
    });

    it('should use $cookies if browser does not support local storage', function() {
        delete window.localStorage;
        expect(localStorage.mode()).toBe('cookies');
    });

    it('should set data with the same API if browser does not support local storage', function() {
        delete window.localStorage;
        var obj = {data: 'text'};
        localStorage.collection('settings').set('key',obj);
        expect($cookies.settings).toEqual(angular.toJson({key:obj}));
    });

    it('should get data with the same API if browser does not support local storage', function() {
        delete window.localStorage;
        var obj = {data: 'text'};
        $cookies.settings = angular.toJson({key:obj});
        expect(localStorage.collection('settings').get('key')).toEqual(obj);
    });
});
