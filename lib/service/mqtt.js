'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _relayrBrowserSdk = require('relayr-browser-sdk');

var _relayrBrowserSdk2 = _interopRequireDefault(_relayrBrowserSdk);

var _urls = require('../config/urls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MqttService = function () {
    function MqttService(_ref) {
        var id = _ref.id,
            meaning = _ref.meaning,
            path = _ref.path,
            _ref$onMessage = _ref.onMessage,
            onMessage = _ref$onMessage === undefined ? function () {} : _ref$onMessage;

        _classCallCheck(this, MqttService);

        this.d = new _relayrBrowserSdk.Device({
            id: id
        }, Object.assign({}, _relayrBrowserSdk2.default.getConfig(), {
            endpoint: _urls.MQTTURL
        }));

        this.meaning = meaning;
        this.path = path;

        this.onMessage = onMessage;
    }

    _createClass(MqttService, [{
        key: 'filterOnMessageMethod',
        value: function filterOnMessageMethod(inComingMeaning, incomingPath, cb) {

            return function (readings) {
                if (!readings) {
                    return;
                }
                var reading = readings.find(function (reading) {
                    var meaning = reading.meaning,
                        path = reading.path;

                    if (meaning && path) {
                        return incomingPath === path && inComingMeaning === meaning;
                    } else if (meaning) {
                        return inComingMeaning === meaning;
                    } else {
                        return incomingPath === path;
                    }
                });

                if (reading) {
                    cb({
                        value: parseInt(reading.value, 10),
                        lastMessage: new Date()
                    });
                }
            };
        }
    }, {
        key: 'connect',
        value: function connect() {
            var _this = this;

            try {
                this.d.connect().then(function (connection) {
                    _this.connection = connection;
                    connection.on('data', function (data) {
                        _this.filterOnMessageMethod(_this.meaning, _this.path, _this.onMessage)(data.readings);
                    });
                }, function (e) {
                    console.error('Could not connect to ', _this.d, e);
                });
            } catch (e) {
                console.error('Could not connect to ', this.d, e);
            }
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            if (this.connection && this.connection.unsubscribe) {
                try {
                    this.connection.unsubscribe();
                } catch (e) {
                    console.error('Could not unconnect to ', this.d, e);
                }
            }
        }
    }]);

    return MqttService;
}();

exports.default = MqttService;
;