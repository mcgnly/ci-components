'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _basemap = require('./basemap');

var _basemap2 = _interopRequireDefault(_basemap);

var _reactMapboxGl = require('react-mapbox-gl');

var _config = require('../config');

var _loading = require('../../icons/loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var markerSettings = {
    layout: { 'text-size': 14 },
    paint: { 'text-color': '#FFFFFF', 'text-translate': [0, -6] }
};

var minFilter = {
    filter: ['>=', 'point_count', 2]
};

var _DefaultExportValue = function _DefaultExportValue(_ref) {
    var points = _ref.points;
    var center = _ref.center;
    var _ref$popup = _ref.popup;
    var popup = _ref$popup === undefined ? {} : _ref$popup;
    var onFeatureClick = _ref.onFeatureClick;
    var onMapClick = _ref.onMapClick;
    var onLoad = _ref.onLoad;
    var onZoomOut = _ref.onZoomOut;
    var onZoomIn = _ref.onZoomIn;

    var features = points.map(function (c) {
        return _get__('React').createElement(_get__('Feature'), { coordinates: c.coordinates, properties: c.properties, onClick: function onClick() {
                return onFeatureClick(c);
            } });
    });
    var loading = void 0;
    if (points.length === 0) {
        loading = _get__('React').createElement(
            'div',
            { className: 'mUCenterFullScreen' },
            _get__('React').createElement(_get__('LoadIcon'), null)
        );
    }
    return _get__('React').createElement(
        'div',
        null,
        loading,
        _get__('React').createElement(
            _get__('BaseMap'),
            {
                center: center,
                popup: popup,
                onLoad: onLoad,
                onMapClick: onMapClick,
                onZoomIn: onZoomIn,
                onZoomOut: onZoomOut
            },
            _get__('React').createElement(
                _get__('Layer'),
                {
                    id: 'marker',
                    type: 'symbol',
                    sourceOptions: _get__('sourceOptions'),
                    layout: { 'icon-image': 'pin' } },
                features
            ),
            _get__('React').createElement(
                _get__('Layer'),
                {
                    id: 'cluster-count',
                    type: 'symbol',
                    layout: Object.assign({}, _get__('markerSettings').layout, { 'text-field': '{point_count}' }),
                    paint: _get__('markerSettings').paint,
                    sourceOptions: _get__('sourceOptions'),
                    layerOptions: _get__('minFilter')
                },
                features
            )
        )
    );
};

exports.default = _DefaultExportValue;

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
        case 'sourceOptions':
            return _config.sourceOptions;

        case 'markerSettings':
            return markerSettings;

        case 'minFilter':
            return minFilter;

        case 'React':
            return _react2.default;

        case 'Feature':
            return _reactMapboxGl.Feature;

        case 'LoadIcon':
            return _loading2.default;

        case 'BaseMap':
            return _basemap2.default;

        case 'Layer':
            return _reactMapboxGl.Layer;
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

var _typeOfOriginalExport = typeof _DefaultExportValue === 'undefined' ? 'undefined' : _typeof(_DefaultExportValue);

function addNonEnumerableProperty(name, value) {
    Object.defineProperty(_DefaultExportValue, name, {
        value: value,
        enumerable: false,
        configurable: true
    });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(_DefaultExportValue)) {
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