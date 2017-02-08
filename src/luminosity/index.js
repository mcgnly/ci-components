import React from 'react';

import LiveWidget  from '../LiveWidget.js';
import WidgetSizes from '../widgetSizes';

import { Luminosity } from 'relayr-sensor-illustrations';

class LuminosityWidget extends React.Component {
    render() {
        return (
            <Luminosity value={this.props.state.reading} {...this.props}/>
        );
    }
}

export default LiveWidget(LuminosityWidget, WidgetSizes.medium);
