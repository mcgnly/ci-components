'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var apiURL = void 0;
var mqttURL = void 0;
var dataURL = void 0;

if (__LOCAL__) {
    apiURL = 'api.relayr.io';
    dataURL = 'data.relayr.io';
    mqttURL = 'mqtt.relayr.io';
} else if (__PRODUCTION__) {
    apiURL = 'api.relayr.io';
    dataURL = 'data.relayr.io';
    mqttURL = 'mqtt.relayr.io';
}

var ApiURL = exports.ApiURL = apiURL;
var MQTTURL = exports.MQTTURL = mqttURL;
var DataURL = exports.DataURL = dataURL;