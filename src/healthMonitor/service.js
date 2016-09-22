import Relayr from 'relayr-browser-sdk';

import { ApiURL } from '../config/urls';

export default class HealthMonitorService {
    constructor() {
        this.ajax = Relayr.customAjax({
            uri: ApiURL,
            token: Relayr.getCurrentUser().token
        });
    }

    getHealthMonitorStatus(monitorId) {
        return this.ajax.get(`/monitors/${monitorId}/statuses`).then((response) => {
            return response.data;
        });
    }
}
