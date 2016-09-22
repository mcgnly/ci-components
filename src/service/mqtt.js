import Relayr, { Device } from 'relayr-browser-sdk';
import { mqttURL } from '../config/urls';

export default class MqttService {
    constructor({id, meaning, path, onMessage = () => {}}) {
        this.d = new Device({
            id: id
        }, Object.assign({}, Relayr.getConfig(), {
            endpoint: mqttURL
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
                cb({
                    value: parseInt(reading.value, 10),
                    lastMessage: new Date()
                });
            }
        };
    }

    connect() {
        this.d.connect().then((connection) => {
            this.connection = connection;
            connection.on('data', (data) => {
                this.filterOnMessageMethod(this.meaning, this.path, this.onMessage)(data.readings);
            });
        });
    }

    disconnect() {
        if (this.connection && this.connection.unsubscribe) {
            this.connection.unsubscribe();
        }
    }
};
