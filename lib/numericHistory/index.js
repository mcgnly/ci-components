'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _relayrSensorIllustrations = require('relayr-sensor-illustrations');

var _numericHistoryService = require('./numericHistory.service.js');

var _numericHistoryService2 = _interopRequireDefault(_numericHistoryService);

var _header = require('../components/header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberHistory = function (_React$Component) {
    _inherits(NumberHistory, _React$Component);

    function NumberHistory(props) {
        _classCallCheck(this, NumberHistory);

        var _this = _possibleConstructorReturn(this, (NumberHistory.__proto__ || Object.getPrototypeOf(NumberHistory)).call(this, props));

        var devices = props.devices,
            readings = props.config.readings;

        _this.state = { points: [] };

        devices.forEach(function (_ref, i) {
            var id = _ref.id;

            var reading = readings[i];
            _this.service = new _numericHistoryService2.default({
                id: id,
                meaning: reading.meaning,
                path: reading.path
            });
        });

        if (_this.service) {
            _this.service.getData({
                onDataRecieved: function onDataRecieved(points) {
                    _this.setState({ points: points });
                }
            });
        }
        return _this;
    }

    _createClass(NumberHistory, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                title = _props.title,
                type = _props.type;

            return _react2.default.createElement(
                'li',
                { className: 'rBox rUtilityResetListItem mOWidgetBox mOFullWidget', 'data-qai-widget-type': type },
                _react2.default.createElement(_header2.default, this.props),
                _react2.default.createElement(
                    'div',
                    { className: 'rBoxBody' },
                    _react2.default.createElement(_relayrSensorIllustrations.NumericPlot, { data: this.state.points })
                )
            );
        }
    }]);

    return NumberHistory;
}(_react2.default.Component);

exports.default = NumberHistory;


NumberHistory.propTypes = {
    title: _react.PropTypes.string,
    type: _react.PropTypes.string,
    devices: _react.PropTypes.array,
    config: _react.PropTypes.shape({
        readings: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            path: _react.PropTypes.string,
            meaning: _react.PropTypes.string,
            id: _react.PropTypes.string,
            valueSchema: _react.PropTypes.object
        }))
    })
};