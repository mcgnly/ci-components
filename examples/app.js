import React from 'react';
import MillioWidgets from '../src';
import WidgetExampleConfig from './widgetConfig';

export default () => {
    function onSettingsClick() {
        alert('settings click');
    }
    return <MillioWidgets widgets={WidgetExampleConfig} onSettingsClick={onSettingsClick} showSettings={true}/>;
};
