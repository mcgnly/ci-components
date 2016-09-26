'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HealthMonitorContainer = function (_get__$Component) {
    _inherits(HealthMonitorContainer, _get__$Component);

    function HealthMonitorContainer(props) {
        _classCallCheck(this, HealthMonitorContainer);

        var _this = _possibleConstructorReturn(this, (HealthMonitorContainer.__proto__ || Object.getPrototypeOf(HealthMonitorContainer)).call(this, props));

        _this.service = new (_get__('Service'))();

        _this.state = {
            statuses: [],
            statusGroups: []
        };

        _this.onLinkClick = _this.onLinkClick.bind(_this);
        return _this;
    }

    _createClass(HealthMonitorContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var healthMonitorId = this.props.config.healthMonitorId;

            this.service.getHealthMonitorStatus(healthMonitorId).then(function (statuses) {
                var statusGroups = _this2.countStatus(statuses);
                _this2.setState({
                    statusGroups: statusGroups,
                    statuses: statuses,
                    currentStatus: _this2.getCurrentStatus(statuses)
                });
            });
        }
    }, {
        key: 'countStatus',
        value: function countStatus(statuses) {
            function count(statuses, countStatus) {
                return statuses.reduce(function (sum, _ref) {
                    var status = _ref.status;

                    return sum += countStatus === status ? 1 : 0;
                }, 0);
            }
            return [{ status: 'online', count: count(statuses, 'online') }, { status: 'outage', count: count(statuses, 'outage') }, { status: 'offline', count: count(statuses, 'offline') }, { status: 'inactive', count: count(statuses, 'inactive') }];
        }
    }, {
        key: 'getCurrentStatus',
        value: function getCurrentStatus(statuses) {
            function hasStatus(lookupStatus) {
                return statuses.find(function (_ref2) {
                    var status = _ref2.status;
                    return status === lookupStatus;
                });
            }
            if (hasStatus('offline')) {
                return 'offline';
            } else if (hasStatus('outage')) {
                return 'outage';
            } else if (hasStatus('online')) {
                return 'online';
            } else {
                return 'inactive';
            }
        }
    }, {
        key: 'onLinkClick',
        value: function onLinkClick() {
            var _props = this.props;
            var redirectMethod = _props.redirectMethod;
            var config = _props.config;


            if (config.healthMonitorId) {
                redirectMethod('/healthMonitor/' + config.healthMonitorId);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state;
            var statusGroups = _state.statusGroups;
            var currentStatus = _state.currentStatus;

            return _get__('React').createElement(_get__('HealthMonitorComponent'), _extends({}, this.props, { statuses: statusGroups, overAllStatus: currentStatus, onLinkClick: this.onLinkClick }));
        }
    }]);

    return HealthMonitorContainer;
}(_get__('React').Component);

exports.default = HealthMonitorContainer;

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
        case 'Service':
            return _service2.default;

        case 'React':
            return _react2.default;

        case 'HealthMonitorComponent':
            return _components2.default;
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

var _typeOfOriginalExport = typeof HealthMonitorContainer === 'undefined' ? 'undefined' : _typeof(HealthMonitorContainer);

function addNonEnumerableProperty(name, value) {
    Object.defineProperty(HealthMonitorContainer, name, {
        value: value,
        enumerable: false,
        configurable: true
    });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(HealthMonitorContainer)) {
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