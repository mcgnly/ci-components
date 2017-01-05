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

var MENU_OPEN_CLASS = 'rDropdownMenuOpen';

var WidgetLinkMenuDropdown = function (_React$Component) {
    _inherits(WidgetLinkMenuDropdown, _React$Component);

    function WidgetLinkMenuDropdown(props) {
        _classCallCheck(this, WidgetLinkMenuDropdown);

        var _this = _possibleConstructorReturn(this, (WidgetLinkMenuDropdown.__proto__ || Object.getPrototypeOf(WidgetLinkMenuDropdown)).call(this, props));

        _this.state = { isMenuOpen: false };

        _this.onMenuOpenClick = _this.onMenuOpenClick.bind(_this);
        return _this;
    }

    _createClass(WidgetLinkMenuDropdown, [{
        key: 'onMenuOpenClick',
        value: function onMenuOpenClick() {
            this.setState({ isMenuOpen: !this.state.isMenuOpen });
        }
    }, {
        key: 'render',
        value: function render() {
            var isOpenClass = this.state.isMenuOpen ? MENU_OPEN_CLASS : '';

            return _react2.default.createElement(
                'div',
                { className: 'rDropdownMenu mWCLinkMenu mWCLinkMenuDropDown ' + isOpenClass, style: { textAlign: 'center' } },
                _react2.default.createElement('div', { className: 'rDropdownMenuBGScreen', onClick: this.onMenuOpenClick }),
                _react2.default.createElement(
                    'button',
                    { className: 'rButton rDropdownMenuButton', onClick: this.onMenuOpenClick },
                    'SELECT A LINK\xA0'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'rDropdownMenuItemContainer' },
                    WidgetLinkMenuDropdown.renderMenuItems(this.props.links)
                )
            );
        }
    }], [{
        key: 'renderMenuItems',
        value: function renderMenuItems(links) {
            return links.map(function (_ref) {
                var name = _ref.name,
                    address = _ref.address;
                return _react2.default.createElement(
                    'a',
                    { className: 'rDropdownMenuItem', key: 'widget-menu-link-' + name, href: address },
                    name
                );
            });
        }
    }]);

    return WidgetLinkMenuDropdown;
}(_react2.default.Component);

exports.default = WidgetLinkMenuDropdown;