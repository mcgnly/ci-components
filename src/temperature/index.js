import React from 'react';

import LiveWidget from '../LiveWidget.js';

import { Temperature } from 'relayr-sensor-illustrations';

class TemperatureWidget extends React.Component {
    render() {
        const { state } = this.props;
        return <Temperature value={state.reading} min={0} max={100}></Temperature>;
    }
}

export default LiveWidget(TemperatureWidget);
