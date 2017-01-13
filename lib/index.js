'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HumanReadbleTimestamp = exports.HealthMonitor = exports.SimpleRedirect = exports.MapWidget = exports.Map = exports.Boolean = exports.Luminosity = exports.NumericHistory = exports.Temperature = exports.Number = exports.Percentage = exports.Radial = exports.WidgetComponent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _widgetComponent = require('./widgetComponent');

var _widgetComponent2 = _interopRequireDefault(_widgetComponent);

var _radial = require('./radial');

var _radial2 = _interopRequireDefault(_radial);

var _percentage = require('./percentage');

var _percentage2 = _interopRequireDefault(_percentage);

var _number = require('./number');

var _number2 = _interopRequireDefault(_number);

var _temperature = require('./temperature');

var _temperature2 = _interopRequireDefault(_temperature);

var _numericHistory = require('./numericHistory');

var _numericHistory2 = _interopRequireDefault(_numericHistory);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _luminosity = require('./luminosity');

var _luminosity2 = _interopRequireDefault(_luminosity);

var _boolean = require('./boolean');

var _boolean2 = _interopRequireDefault(_boolean);

var _simpleRedirect = require('./simpleRedirect');

var _simpleRedirect2 = _interopRequireDefault(_simpleRedirect);

var _healthMonitor = require('./healthMonitor');

var _healthMonitor2 = _interopRequireDefault(_healthMonitor);

var _humanReadable = require('./time/humanReadable');

var _humanReadable2 = _interopRequireDefault(_humanReadable);

var _smallWidget = require('./map/smallWidget');

var _smallWidget2 = _interopRequireDefault(_smallWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    var widgets = props.widgets,
        hasFullSizeWidget = props.hasFullSizeWidget;

    var widgetComponents = widgets.map(function (w, index) {
        return _react2.default.createElement(_widgetComponent2.default, _extends({}, props, { key: 'w-' + index, widget: w }));
    });

    return _react2.default.createElement(
        'ul',
        { className: 'rUtilityResetList ' + (hasFullSizeWidget ? 'mCWidgetContainerFullsize' : '') },
        widgetComponents
    );
};

exports.WidgetComponent = _widgetComponent2.default;
exports.Radial = _radial2.default;
exports.Percentage = _percentage2.default;
exports.Number = _number2.default;
exports.Temperature = _temperature2.default;
exports.NumericHistory = _numericHistory2.default;
exports.Luminosity = _luminosity2.default;
exports.Boolean = _boolean2.default;
exports.Map = _map2.default;
exports.MapWidget = _smallWidget2.default;
exports.SimpleRedirect = _simpleRedirect2.default;
exports.HealthMonitor = _healthMonitor2.default;
exports.HumanReadbleTimestamp = _humanReadable2.default;