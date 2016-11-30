'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var style = exports.style = 'mapbox://styles/jontore/cirm72ko3001qh1nsj0xw5i72';
var token = exports.token = 'pk.eyJ1Ijoiam9udG9yZSIsImEiOiI0anZPRXZJIn0.K67QPBz-IP3FtEGdXuuUCg';

var sourceOptions = exports.sourceOptions = {
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
};

var smallConfig = exports.smallConfig = {
    height: '500px'
};

var apiURL = void 0;
if (__LOCAL__) {
    apiURL = 'api.relayr.io';
} else if (__PRODUCTION__) {
    apiURL = 'api.relayr.io';
}

var ApiURL = exports.ApiURL = apiURL;
