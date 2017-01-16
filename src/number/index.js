import React from 'react';

import LiveWidget from '../LiveWidget';
import WidgetSizes from '../widgetSizes';

function NumberWidget(props) {
    const reading = props.state.reading;
    const isNum = typeof reading == 'number';
    const text = (!isNum ? reading : formatNumber(reading, 3))

    return (
        <span className="mONumberWidget">{ text }</span>
    );
}

function formatNumber(number, digitsAfterDecimal) {
    // parsing back to float removes any zeros after the decimal place,
    // ie. '1.200' is changed to '1.2' 
    return parseFloat(number.toFixed(digitsAfterDecimal))
}

export default LiveWidget(NumberWidget, WidgetSizes.large);
