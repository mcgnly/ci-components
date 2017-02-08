import React from 'react';

import LiveWidget from '../LiveWidget.js';

import { Temperature } from 'relayr-sensor-illustrations';

class TemperatureWidget extends React.Component {
    render() {
        const { state } = this.props;
        return <Temperature value={state.reading} {...this.props}/>;
    }
}

export default LiveWidget(TemperatureWidget);
