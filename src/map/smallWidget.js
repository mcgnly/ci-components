import React from 'react';

import SmallWidget from './components/smallWidget';
import MapOverview from './containers/overview';

import Service from './service';

import { smallConfig } from './config';

export default class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        const { devices } = this.props;
        this.service = new Service(devices);
    }

    render() {
        return (
            <SmallWidget {...this.props}>
                <MapOverview {...this.props} hasControlPanel={false} height={smallConfig.height} service={this.service} onPopupClick={() => {}}/>
            </SmallWidget>
        );
    }
}
