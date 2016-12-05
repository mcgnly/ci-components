import Relayr, { Device } from 'relayr-browser-sdk';
import { MQTTURL } from '../config/urls';

export default class MqttService {
    constructor({ id, meaning, path, onMessage = () => {}}) {
        this.d = new Device({
            id: id
        }, Object.assign({}, Relayr.getConfig(), {
            endpoint: MQTTURL
        }));

        this.meaning = meaning;
        this.path = path;

        this.onMessage = onMessage;
    }

    filterOnMessageMethod(inComingMeaning, incomingPath, cb) {

        return (readings) => {
            if (!readings) {
                return;
            }
            let reading = readings.find((reading) => {
                let { meaning, path } = reading;
                if (meaning && path) {
                    return incomingPath === path && inComingMeaning === meaning;
                } else if (meaning) {
                    return inComingMeaning === meaning;
                } else {
                    return incomingPath === path;
                }
            });

            if (reading) {
                const intValue = parseInt(reading.value, 10);
                cb({
                    value: (isNaN(intValue) ? reading.value : intValue),
                    lastMessage: new Date()
                });
            }
        };
    }

    connect() {
        try {
            this.d.connect().then((connection) => {
                this.connection = connection;
                connection.on('data', (data) => {
                    this.filterOnMessageMethod(this.meaning, this.path, this.onMessage)(data.readings);
                });
            }, (e) => {
                console.error('Could not connect to ', this.d, e);
            });
        } catch (e) {
            console.error('Could not connect to ', this.d, e);
        }
    }

    disconnect() {
        if (this.connection && this.connection.unsubscribe) {
            try {
                this.connection.unsubscribe();
            } catch (e) {
                console.error('Could not unconnect to ', this.d, e);
            }
        }
    }
};
