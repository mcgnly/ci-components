import React from 'react';

import LiveWidget from '../LiveWidget.js';

import { Humidity } from 'relayr-sensor-illustrations';

class HumidityWidget extends React.Component {
    render() {
        const { state } = this.props;
        return <Humidity value={state.reading} {...this.props}/>;
    }
}

export default LiveWidget(HumidityWidget);
