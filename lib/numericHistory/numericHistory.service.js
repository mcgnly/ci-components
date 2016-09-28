'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _relayrBrowserSdk = require('relayr-browser-sdk');

var _relayrBrowserSdk2 = _interopRequireDefault(_relayrBrowserSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MqttService = function () {
    function MqttService(_ref) {
        var id = _ref.id;
        var meaning = _ref.meaning;
        var path = _ref.path;
        var _ref$onMessage = _ref.onMessage;
        var onMessage = _ref$onMessage === undefined ? function () {} : _ref$onMessage;

        _classCallCheck(this, MqttService);

        this.d = new _relayrBrowserSdk.Device({
            id: id
        }, _relayrBrowserSdk2.default.getConfig());
        this.meaning = meaning;
        this.path = path;
    }

    _createClass(MqttService, [{
        key: 'getData',
        value: function getData(_ref2) {
            var _this = this;

            var onDataRecieved = _ref2.onDataRecieved;

            this.d.getAllHistoricalData({
                periode: '1m',
                onDataReceived: function onDataReceived(points) {
                    if (points.get) {
                        var dataPoints = points.get(_this.meaning, _this.path);
                        if (dataPoints) {
                            onDataRecieved(dataPoints);
                        }
                    }
                }
            });
        }
    }]);

    return MqttService;
}();

exports.default = MqttService;
;