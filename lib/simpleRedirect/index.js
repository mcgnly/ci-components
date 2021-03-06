'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _loading = require('../icons/loading');

var _loading2 = _interopRequireDefault(_loading);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleRedirectContainer = function (_React$Component) {
    _inherits(SimpleRedirectContainer, _React$Component);

    function SimpleRedirectContainer(props) {
        _classCallCheck(this, SimpleRedirectContainer);

        return _possibleConstructorReturn(this, (SimpleRedirectContainer.__proto__ || Object.getPrototypeOf(SimpleRedirectContainer)).call(this, props));
    }

    _createClass(SimpleRedirectContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                redirectMethod = _props.redirectMethod,
                type = _props.type,
                config = _props.config;


            _service2.default.redirect(type, config, redirectMethod);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_loading2.default, null);
        }
    }]);

    return SimpleRedirectContainer;
}(_react2.default.Component);

exports.default = SimpleRedirectContainer;


SimpleRedirectContainer.propTypes = {
    redirectMethod: _react.PropTypes.func.isRequired,
    type: _react.PropTypes.string,
    config: _react.PropTypes.any
};