let apiURL;
let mqttURL;
let dataURL;

if (__LOCAL__) {
    apiURL = 'api.relayr.io';
    dataURL = 'data.relayr.io';
    mqttURL = 'mqtt.relayr.io';
} else if (__PRODUCTION__) {
    apiURL = 'api.relayr.io';
    dataURL = 'data.relayr.io';
    mqttURL = 'mqtt.relayr.io';
}

export const ApiURL = apiURL;
export const MQTTURL = mqttURL;
export const DataURL = dataURL;
