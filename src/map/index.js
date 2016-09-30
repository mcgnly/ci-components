import React from 'react';

import MapOverview from './containers/overview';
import MapHistory from  './containers/history';

import Service from './service';


export default class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        const { devices } = this.props;
        this.state = {
            type: 'overview'
        };

        this.service = new Service(devices);

        this.onShowHistoryClick = this.onShowHistoryClick.bind(this);
        this.onHistoryClose = this.onHistoryClose.bind(this);
    }

    onShowHistoryClick(selectedDeviceId) {
        this.setState({
            type: 'history',
            historyDeviceId: selectedDeviceId
        });
    }

    onHistoryClose() {
        this.setState({ type: 'overview' });
    }

    render() {
        if (this.state.type === 'history') {
            const { historyDeviceId } = this.state;
            return <MapHistory {...this.props} deviceID={historyDeviceId} service={this.service} onCloseClick={this.onHistoryClose}/>;
        } else {
            return <MapOverview {...this.props} service={this.service} featureInstruction="Show history" onPopupClick={this.onShowHistoryClick}/>;
        }
    }
}
