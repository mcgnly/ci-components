'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = WidgetComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radial = require('./radial');

var _radial2 = _interopRequireDefault(_radial);

var _percentage = require('./percentage');

var _percentage2 = _interopRequireDefault(_percentage);

var _number = require('./number');

var _number2 = _interopRequireDefault(_number);

var _temperature = require('./temperature');

var _temperature2 = _interopRequireDefault(_temperature);

var _humidity = require('./humidity');

var _humidity2 = _interopRequireDefault(_humidity);

var _boolean = require('./boolean');

var _boolean2 = _interopRequireDefault(_boolean);

var _luminosity = require('./luminosity');

var _luminosity2 = _interopRequireDefault(_luminosity);

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
    Number: _number2.default,
    Temperature: _temperature2.default,
    Humidity: _humidity2.default,
    Boolean: _boolean2.default,
    Luminosity: _luminosity2.default,
    NumericHistory: _numericHistory2.default,
    Map: _map2.default,
    healthMonitor: _healthMonitor2.default,
    MapWidget: _smallWidget2.default
};

function WidgetComponent(props) {
    var widget = props.widget;
    var title = widget.title,
        config = widget.config,
        type = widget.type,
        devices = widget.results;

    var _ref = config ? config : { readings: [] },
        readings = _ref.readings;

    var Component = Components[type];

    if (!Component) {
        return _react2.default.createElement('div', null);
    }
    return _react2.default.createElement(Component, _extends({}, props, { type: type, config: config, devices: devices, readings: readings, title: title }));
};

WidgetComponent.propTypes = {
    type: _react.PropTypes.string,
    config: _react.PropTypes.shape({
        readings: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            path: _react.PropTypes.string,
            meaning: _react.PropTypes.string,
            id: _react.PropTypes.string,
            valueSchema: _react.PropTypes.object
        }))
    }),
    title: _react.PropTypes.string,
    results: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        id: _react.PropTypes.string,
        owner: _react.PropTypes.string,
        name: _react.PropTypes.string,
        modelId: _react.PropTypes.string
    }))
};