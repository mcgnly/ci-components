let apiURL;
let mqttURL;

if (__LOCAL__) {
    apiURL = 'dev-api.relayr.io';
    mqttURL = 'dev-mqtt.relayr.io';
} else if (__PRODUCTION__) {
    apiURL = 'api.relayr.io';
    mqttURL = 'mqtt.relayr.io';
}
export const ApiURL = apiURL;

export const MQTTURL = mqttURL;
