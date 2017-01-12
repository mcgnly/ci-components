import React from 'react';

import LiveWidget from '../LiveWidget';
import WidgetSizes from '../widgetSizes';

function NumberWidget(props) {
    return (
        <span className="mONumberWidget">{ props.state.reading }</span>
    );
}

export default LiveWidget(NumberWidget, WidgetSizes.large);
