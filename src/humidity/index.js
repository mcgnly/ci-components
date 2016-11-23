import React from 'react';

import LiveWidget from '../LiveWidget.js';

import { Humidity } from 'relayr-sensor-illustrations';

class HumidityWidget extends React.Component {
    render() {
        const { state } = this.props;
        return <Humidity value={state.reading} min={0} max={99}></Humidity>;
    }
}

export default LiveWidget(HumidityWidget);
