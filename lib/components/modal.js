'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = function (_React$Component) {
    _inherits(Modal, _React$Component);

    function Modal(props) {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

        _this.close = _this.close.bind(_this);

        _this.state = {
            close: false
        };
        return _this;
    }

    _createClass(Modal, [{
        key: 'close',
        value: function close() {
            this.setState({
                close: true
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.close) {
                return null;
            }
            var _props = this.props,
                _props$title = _props.title,
                title = _props$title === undefined ? '' : _props$title,
                _props$children = _props.children,
                children = _props$children === undefined ? '' : _props$children,
                _props$closeMessage = _props.closeMessage,
                closeMessage = _props$closeMessage === undefined ? 'Close' : _props$closeMessage;

            return _react2.default.createElement(
                'dialog',
                { className: 'rModal' },
                _react2.default.createElement(
                    'article',
                    { className: 'rModalContent' },
                    _react2.default.createElement(
                        'div',
                        { className: 'rModalTitle' },
                        _react2.default.createElement('i', { onClick: this.close, className: 'fa fa-times closeIcon mQaClose' })
                    ),
                    _react2.default.createElement(
                        'h2',
                        { className: 'rTypoHeadingBold' },
                        title
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'rModalBody' },
                        children
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'rModalFooter rModalFooterCenter' },
                        _react2.default.createElement(
                            'button',
                            { className: 'rButton rButtonPrimary mQaClose', onClick: this.close },
                            closeMessage
                        )
                    )
                )
            );
        }
    }]);

    return Modal;
}(_react2.default.Component);

exports.default = Modal;
;