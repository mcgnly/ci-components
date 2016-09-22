import React from 'react';

import WidgetComponent from './widgetComponent';

export default (props) => {
    const { widgets, hasFullSizeWidget } = props;
    const widgetComponents = widgets.map((w, index) => {
        return (
            <WidgetComponent {...props} key={'w-' + index}  widget={w}/>
        );
    });

    return (
        <ul className={`rUtilityResetList ${hasFullSizeWidget ? 'mCWidgetContainerFullsize' : ''}`}>
            {widgetComponents}
        </ul>
    );
};
