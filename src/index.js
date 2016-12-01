import React from 'react';

import WidgetComponent from './widgetComponent';
import Radial from './radial';
import Percentage from './percentage';
import Temperature from './temperature';
import NumericHistory from './numericHistory';
import Map from './map';
import Luminosity from './luminosity';
import Boolean from './boolean';
import SimpleRedirect from './simpleRedirect';
import HealthMonitor from './healthMonitor';
import HumanReadbleTimestamp from './time/humanReadable';
import MapWidget from './map/smallWidget';

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


export {
    WidgetComponent,
    Radial,
    Percentage,
    Temperature,
    NumericHistory,
    Luminosity,
    Boolean,
    Map,
    MapWidget,
    SimpleRedirect,
    HealthMonitor,
    HumanReadbleTimestamp
};
