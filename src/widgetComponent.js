import React, { PropTypes } from 'react';
import Radial from './radial';
import Percentage from './percentage';
import Number from './number';
import Temperature from './temperature';
import Humidity from './humidity';
import Boolean from './boolean';
import Luminosity from './luminosity';
import NumericHistory from './numericHistory';
import Map from './map';
import SmallMapWidget from './map/smallWidget';
import SimpleRedirect from './simpleRedirect';
import HealthMonitor from './healthMonitor';

const Components = {
    Radial,
    Percentage,
    Number,
    Temperature,
    Humidity,
    Boolean,
    Luminosity,
    NumericHistory,
    Map,
    healthMonitor: HealthMonitor,
    MapWidget: SmallMapWidget
};

export default function WidgetComponent(props) {
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


WidgetComponent.propTypes = {
    type: PropTypes.string,
    config: PropTypes.shape({
       readings: PropTypes.arrayOf(
           PropTypes.shape({
                path: PropTypes.string,
                meaning: PropTypes.string,
                id: PropTypes.string,
                valueSchema: PropTypes.object
            })
        )
    }),
    title: PropTypes.string,
    results: PropTypes.arrayOf(
       PropTypes.shape({
           id: PropTypes.string,
           owner: PropTypes.string,
           name: PropTypes.string,
           modelId: PropTypes.string
       })
   )
};
