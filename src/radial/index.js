import React from 'react';

import LiveWidget from '../LiveWidget.js';

import { Radial } from 'relayr-sensor-illustrations';

class RadialWidget extends React.Component {

    render() {
        const { state } = this.props;
        return (
            <Radial {...this.props} value={state.reading}/>
        );
    }
}

export default LiveWidget(RadialWidget);
