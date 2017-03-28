import React from 'react';
import { Button } from '../src';
import WidgetExampleConfig from './widgetConfig';

export default () => {
	function onSettingsClick() {
		alert('settings click');
	}

	return (
		<div>
			<Button type='primary' innerText='look a button' />
			<Button type='delete' />
			<Button type='secondary' innerText='not so important' />
			<Button type='tertiary' innerText='less important' />
			<Button type='tertiary-monochrome' innerText='paint it black' />
			<Button type='primary' small={true} innerText='tiny buttons' />
		</div>

	);
};
