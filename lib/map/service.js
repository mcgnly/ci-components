'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _relayrBrowserSdk = require('relayr-browser-sdk');

var _relayrBrowserSdk2 = _interopRequireDefault(_relayrBrowserSdk);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CoordinatesService = function () {
    function CoordinatesService(devices) {
        _classCallCheck(this, CoordinatesService);

        this.deviceIds = devices.map(function (_ref) {
            var id = _ref.id;
            return id;
        });
        this.ajax = _relayrBrowserSdk2.default.customAjax({
            uri: _config.ApiURL,
            token: _relayrBrowserSdk2.default.getCurrentUser().token
        });
    }

    _createClass(CoordinatesService, [{
        key: 'getCoordinates',
        value: function getCoordinates() {
            var deviceIdsQuery = this.deviceIds && this.deviceIds.length > 0 ? this.deviceIds : null;

            if (!deviceIdsQuery) {
                return new Promise(function (resolve, reject) {
                    resolve([]);
                });
            }

            var statePromise = this.ajax.get('/locations', {
                queryObj: { deviceIds: deviceIdsQuery }
            });

            var devicesPromise = _relayrBrowserSdk2.default.getCurrentUser().searchForDevices({
                query: { ids: deviceIdsQuery }
            });

            return new Promise(function (resolve, reject) {
                Promise.all([statePromise, devicesPromise]).then(function (_ref2) {
                    var _ref3 = _slicedToArray(_ref2, 2),
                        coordinateData = _ref3[0],
                        devices = _ref3[1];

                    var coordinateObjs = devices.map(function (d) {
                        var lastCoordinate = coordinateData.data.find(function (c) {
                            return c.deviceId === d.id;
                        });
                        if (!lastCoordinate) {
                            return;
                        }
                        return {
                            properties: {
                                id: d.id,
                                title: d.name
                            },
                            coordinates: [lastCoordinate.location.longitude, lastCoordinate.location.latitude]
                        };
                    }).filter(function (c) {
                        return !!c;
                    });

                    resolve(coordinateObjs);
                }, reject);
            });
        }
    }, {
        key: 'getHistory',
        value: function getHistory(deviceId) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.ajax.get('/locations/' + deviceId + '/history').then(function (_ref4) {
                    var data = _ref4.data;

                    var coordinateObjs = data.events.map(function (d) {
                        var location = d.location,
                            entered = d.entered,
                            left = d.left;

                        return {
                            entered: new Date(entered),
                            left: new Date(left),
                            coordinates: location ? [location.longitude, location.latitude] : []
                        };
                    });
                    resolve(coordinateObjs);
                }, reject);
            });
        }
    }]);

    return CoordinatesService;
}();

exports.default = CoordinatesService;
;