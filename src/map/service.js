import Relayr from 'relayr-browser-sdk';

import { ApiURL } from './config';

export default class CoordinatesService {
    constructor(deviceIds) {
        this.deviceIds = deviceIds;
        this.ajax = Relayr.customAjax({
            uri: ApiURL,
            token: Relayr.getCurrentUser().token
        });
    }

    getCoordinates() {
        let statePromise = this.ajax.get('/locations', {
            queryObj: { deviceIds: this.deviceIds }
        });

        let devicesPromise = Relayr.getCurrentUser().searchForDevices({
            query: { ids: this.deviceIds }
        });

        return new Promise((resolve, reject) => {
            Promise.all([statePromise, devicesPromise]).then(([coordinateData, devices]) => {
                const coordinateObjs = devices.map((d) => {
                    const lastCoordinate = coordinateData.data.find((c) => c.deviceId === d.id);
                    if (!lastCoordinate) {
                        return;
                    }
                    return {
                        properties: {
                            id: d.id,
                            title: d.name
                        },
                        coordinates: [lastCoordinate.location.longitude, lastCoordinate.location.latitude]
                    };
                }).filter(c => !!c);

                resolve(coordinateObjs);
            }, reject);
        });
    }

    getHistory(deviceId) {
        return new Promise((resolve, reject) => {
            this.ajax.get(`/locations/${deviceId}/history`).then(({ data }) => {
                const coordinateObjs = data.events.map((d) => {
                    const { location, entered, left } = d;
                    return {
                        entered: new Date(entered),
                        left: new Date(left),
                        coordinates: location ? [location.longitude, location.latitude] : []
                    };
                });
                resolve(coordinateObjs);
            }, reject);
        });
    }

};
