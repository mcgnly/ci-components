import React from 'react';

import LiveWidget from '../LiveWidget.js';

import { Percentage } from 'relayr-sensor-illustrations';

class PercentageWidget extends React.Component {
    render() {
        const { state, title } = this.props;
        return (
            <div className="mOWidgetSimpleText">
                <Percentage value={state.reading} min={0} max={100} title={title}></Percentage>
            </div>
        );
    }
}

export default LiveWidget(PercentageWidget);
