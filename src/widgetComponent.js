import React from 'react';
import Radial from './radial';
import Percentage from './percentage';
import Temperature from './temperature';
import NumericHistory from './numericHistory';
import Map from './map';
import SimpleRedirect from './simpleRedirect';
import HealthMonitor from './healthMonitor';

const Components = {
    Radial,
    Percentage,
    Temperature,
    NumericHistory,
    Map,
    healthMonitor: HealthMonitor
};

export default (props) => {
    const { widget } = props;
    const { title, config, type, results: devices } = widget;
    const { readings } = config ? config : { readings: [] };
    const Component =  Components[type];

    if (!Component) {
        return <div/>;
    }
    return (
        <Component {...props} type={type} config={config} devices={devices} readings={readings} title={title}></Component>
    );
};
