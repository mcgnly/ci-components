import React from 'react';

import LiveWidget from '../LiveWidget.js';

import { Luminosity } from 'relayr-sensor-illustrations';

class LuminosityWidget extends React.Component {
    render() {
        return (
            <Luminosity value={this.props.state.reading} min={this.props.min} max={this.props.max}></Luminosity>
        );
    }
}

export default LiveWidget(LuminosityWidget);
