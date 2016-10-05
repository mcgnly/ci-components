'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radial = require('./radial');

var _radial2 = _interopRequireDefault(_radial);

var _percentage = require('./percentage');

var _percentage2 = _interopRequireDefault(_percentage);

var _temperature = require('./temperature');

var _temperature2 = _interopRequireDefault(_temperature);

var _numericHistory = require('./numericHistory');

var _numericHistory2 = _interopRequireDefault(_numericHistory);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _smallWidget = require('./map/smallWidget');

var _smallWidget2 = _interopRequireDefault(_smallWidget);

var _simpleRedirect = require('./simpleRedirect');

var _simpleRedirect2 = _interopRequireDefault(_simpleRedirect);

var _healthMonitor = require('./healthMonitor');

var _healthMonitor2 = _interopRequireDefault(_healthMonitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Components = {
    Radial: _radial2.default,
    Percentage: _percentage2.default,
    Temperature: _temperature2.default,
    NumericHistory: _numericHistory2.default,
    Map: _map2.default,
    healthMonitor: _healthMonitor2.default,
    MapWidget: _smallWidget2.default
};

exports.default = function (props) {
    var widget = props.widget;
    var title = widget.title;
    var config = widget.config;
    var type = widget.type;
    var devices = widget.results;

    var _ref = config ? config : { readings: [] };

    var readings = _ref.readings;

    var Component = Components[type];

    if (!Component) {
        return _react2.default.createElement('div', null);
    }
    return _react2.default.createElement(Component, _extends({}, props, { type: type, config: config, devices: devices, readings: readings, title: title }));
};