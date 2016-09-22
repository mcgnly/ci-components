import Relayr, { Device } from 'relayr-browser-sdk';

export default class MqttService {
    constructor({id, meaning, path, onMessage = () => {}}) {
        this.d = new Device({
            id: id
        }, Relayr.getConfig());
        this.meaning = meaning;
        this.path = path;
    }

    getData({ onDataRecieved }) {
        this.d.getAllHistoricalData({
            periode: '1m',
            onDataReceived: (points) => {
                if(points.get) {
                    const dataPoints = points.get(this.meaning, this.path)
                    if (dataPoints) {
                        onDataRecieved(dataPoints);
                    }
                }
            }
        })
    }
};
