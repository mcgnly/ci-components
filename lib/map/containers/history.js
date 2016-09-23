'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = exports.MapHistoryContainer = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _history = require('../components/history');

var _history2 = _interopRequireDefault(_history);

var _historyList = require('../components/historyList');

var _historyList2 = _interopRequireDefault(_historyList);

var _mapcontainer = require('./mapcontainer');

var _mapcontainer2 = _interopRequireDefault(_mapcontainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MapHistoryContainer = exports.MapHistoryContainer = function (_get__$Component) {
    _inherits(MapHistoryContainer, _get__$Component);

    function MapHistoryContainer(props) {
        _classCallCheck(this, MapHistoryContainer);

        var _this = _possibleConstructorReturn(this, (MapHistoryContainer.__proto__ || Object.getPrototypeOf(MapHistoryContainer)).call(this, props));

        _this.state = {
            points: [],
            center: [0, 0],
            selectedPoint: {}
        };

        _this.service = _this.props.service;

        _this.onSelectItem = _this.onSelectItem.bind(_this);
        return _this;
    }

    _createClass(MapHistoryContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _props = this.props;
            var deviceID = _props.deviceID;
            var fitMap = _props.fitMap;

            this.service.getHistory(deviceID).then(function (points) {
                _this2.setState({
                    points: points,
                    selectedPoint: points[points.length - 1]
                });
                fitMap(points);
            });
        }
    }, {
        key: 'onSelectItem',
        value: function onSelectItem(point) {
            this.setState({
                selectedPoint: point
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state;
            var selectedPoint = _state.selectedPoint;
            var points = _state.points;
            var center = _state.center;
            var popup = _state.popup;
            var zoom = _state.zoom;
            var _props2 = this.props;
            var onZoomIn = _props2.onZoomIn;
            var onZoomOut = _props2.onZoomOut;
            var onMapLoad = _props2.onMapLoad;
            var onCloseClick = _props2.onCloseClick;

            return _get__('React').createElement(
                'div',
                { className: 'mOSectionSideBySide' },
                _get__('React').createElement(_get__('HistoryMap'), {
                    points: points,
                    center: center,
                    popup: popup,
                    onMapClick: this.closePopup,
                    selectedPoint: selectedPoint,
                    onFeatureClick: this.onSelectItem,
                    onLoad: onMapLoad,
                    onZoomIn: onZoomIn,
                    onZoomOut: onZoomOut
                }),
                _get__('React').createElement(_get__('HistoryList'), {
                    onClose: onCloseClick,
                    points: points,
                    selectedPoint: selectedPoint,
                    onSelect: this.onSelectItem })
            );
        }
    }]);

    return MapHistoryContainer;
}(_get__('React').Component);

var _DefaultExportValue = _get__('MapContainer')(_get__('MapHistoryContainer'));

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
        case 'React':
            return _react2.default;

        case 'MapContainer':
            return _mapcontainer2.default;

        case 'MapHistoryContainer':
            return MapHistoryContainer;

        case 'HistoryMap':
            return _history2.default;

        case 'HistoryList':
            return _historyList2.default;
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