'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _relayrBrowserSdk = require('relayr-browser-sdk');

var _relayrBrowserSdk2 = _interopRequireDefault(_relayrBrowserSdk);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CoordinatesService = function () {
    function CoordinatesService(deviceIds) {
        _classCallCheck(this, CoordinatesService);

        this.deviceIds = deviceIds;
        this.ajax = _get__('Relayr').customAjax({
            uri: _get__('ApiURL'),
            token: _get__('Relayr').getCurrentUser().token
        });
    }

    _createClass(CoordinatesService, [{
        key: 'getCoordinates',
        value: function getCoordinates() {
            var statePromise = this.ajax.get('/locations', {
                queryObj: { deviceIds: this.deviceIds }
            });

            var devicesPromise = _get__('Relayr').getCurrentUser().searchForDevices({
                query: { ids: this.deviceIds }
            });

            return new Promise(function (resolve, reject) {
                Promise.all([statePromise, devicesPromise]).then(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 2);

                    var coordinateData = _ref2[0];
                    var devices = _ref2[1];

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
                _this.ajax.get('/locations/' + deviceId + '/history').then(function (_ref3) {
                    var data = _ref3.data;

                    var coordinateObjs = data.events.map(function (d) {
                        var location = d.location;
                        var entered = d.entered;
                        var left = d.left;

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

var _RewiredData__ = Object.create(null);

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
    function addPropertyToAPIObject(name, value) {
        Object.defineProperty(_RewireAPI__, name, {
            value: value,
            enumerable: false,
            configurable: true
        });
    }

    addPropertyToAPIObject('__get__', _get__);
    addPropertyToAPIObject('__GetDependency__', _get__);
    addPropertyToAPIObject('__Rewire__', _set__);
    addPropertyToAPIObject('__set__', _set__);
    addPropertyToAPIObject('__reset__', _reset__);
    addPropertyToAPIObject('__ResetDependency__', _reset__);
    addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
    if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
        return _get_original__(variableName);
    } else {
        var value = _RewiredData__[variableName];

        if (value === INTENTIONAL_UNDEFINED) {
            return undefined;
        } else {
            return value;
        }
    }
}

function _get_original__(variableName) {
    switch (variableName) {
        case 'Relayr':
            return _relayrBrowserSdk2.default;

        case 'ApiURL':
            return _config.ApiURL;
    }

    return undefined;
}

function _assign__(variableName, value) {
    if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
        return _set_original__(variableName, value);
    } else {
        return _RewiredData__[variableName] = value;
    }
}

function _set_original__(variableName, _value) {
    switch (variableName) {}

    return undefined;
}

function _update_operation__(operation, variableName, prefix) {
    var oldValue = _get__(variableName);

    var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

    _assign__(variableName, newValue);

    return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
    if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
        Object.keys(variableName).forEach(function (name) {
            _RewiredData__[name] = variableName[name];
        });
    } else {
        if (value === undefined) {
            _RewiredData__[variableName] = INTENTIONAL_UNDEFINED;
        } else {
            _RewiredData__[variableName] = value;
        }

        return function () {
            _reset__(variableName);
        };
    }
}

function _reset__(variableName) {
    delete _RewiredData__[variableName];
}

function _with__(object) {
    var rewiredVariableNames = Object.keys(object);
    var previousValues = {};

    function reset() {
        rewiredVariableNames.forEach(function (variableName) {
            _RewiredData__[variableName] = previousValues[variableName];
        });
    }

    return function (callback) {
        rewiredVariableNames.forEach(function (variableName) {
            previousValues[variableName] = _RewiredData__[variableName];
            _RewiredData__[variableName] = object[variableName];
        });
        var result = callback();

        if (!!result && typeof result.then == 'function') {
            result.then(reset).catch(reset);
        } else {
            reset();
        }

        return result;
    };
}

var _typeOfOriginalExport = typeof CoordinatesService === 'undefined' ? 'undefined' : _typeof(CoordinatesService);

function addNonEnumerableProperty(name, value) {
    Object.defineProperty(CoordinatesService, name, {
        value: value,
        enumerable: false,
        configurable: true
    });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(CoordinatesService)) {
    addNonEnumerableProperty('__get__', _get__);
    addNonEnumerableProperty('__GetDependency__', _get__);
    addNonEnumerableProperty('__Rewire__', _set__);
    addNonEnumerableProperty('__set__', _set__);
    addNonEnumerableProperty('__reset__', _reset__);
    addNonEnumerableProperty('__ResetDependency__', _reset__);
    addNonEnumerableProperty('__with__', _with__);
    addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;