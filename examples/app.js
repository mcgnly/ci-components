import React from 'react';
import MilloWidgets from '../src';
import WidgetExampleConfig from './widgetConfig';

export default () => {
    function onSettingsClick() {
        alert('settings click');
    }
    return <MilloWidgets widgets={WidgetExampleConfig} onSettingsClick={onSettingsClick} showSettings={true}/>;
};
