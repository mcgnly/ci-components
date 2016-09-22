import React from 'react';

import LiveWidget from '../LiveWidget.js';

import { Radial } from 'relayr-sensor-illustrations';

class RadialWidget extends React.Component {

    render() {
        const { state } = this.props;
        return (
            <Radial value={state.reading} min={0} max={100}></Radial>
        );
    }
}

export default LiveWidget(RadialWidget);
