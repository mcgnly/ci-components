import React, { PropTypes } from 'react';

import MapOverview from './containers/overview';
import MapHistory from  './containers/history';

import Service from './service';


export default class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        const { devices } = this.props;
        this.state = {
            type: 'overview',
            service: new Service(devices)
        };

        this.onShowHistoryClick = this.onShowHistoryClick.bind(this);
        this.onHistoryClose = this.onHistoryClose.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { devices: newDevices } = nextProps;
        const { devices: oldDevices } = this.props;
        if (JSON.stringify(newDevices) !== JSON.stringify(oldDevices)) {
            this.setState({
                service: new Service(newDevices)
            });
        }
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
            return <MapHistory {...this.props} deviceID={historyDeviceId} service={this.state.service} onCloseClick={this.onHistoryClose}/>;
        } else {
            return <MapOverview {...this.props} service={this.state.service} featureInstruction="Show history" onPopupClick={this.onShowHistoryClick}/>;
        }
    }
}

MapContainer.propTypes = {
    devices: PropTypes.arrayOf(
       PropTypes.shape({
           id: PropTypes.string,
           owner: PropTypes.string,
           name: PropTypes.string,
           modelId: PropTypes.string
       })
   )
};
