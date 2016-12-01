import React from 'react';

import LiveWidget from '../LiveWidget.js';

import { Boolean } from 'relayr-sensor-illustrations';

class BooleanWidget extends React.Component {
    render() {
        return <Boolean value={this.props.state.reading}/>;
    }
}

export default LiveWidget(BooleanWidget);
