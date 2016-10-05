import { expect } from 'chai';
import { shallow } from 'enzyme';

import React from 'react';

import WidgetComponent from '../src/widgetComponent';

import Radial from '../src/radial';
import Temperature from '../src/temperature';
import HealthMonitor from '../src/healthMonitor';
import SimpleRedirect from '../src/simpleRedirect';
import SmallMapWidget from '../src/map/smallWidget';
import Map from '../src/map';

function setup() {
    let props = {
        widget: {
            type: 'Temperature',
            title: 'test-title',
            results: ['device-0', 'device-1'],
            config: { readings: [{ path: 'my-path', meaning: 'my-meaning' }] }
        }
    };

    let output = shallow(<WidgetComponent {...props}/>);

    return {
        props,
        output
    };
}

describe('component <WidgetComponent/>', () => {
    let output;
    beforeEach(function() {
        output = setup().output;
    });

    it('should pass properties to the widget', () => {
        expect(output.type()).to.equal(Temperature);
        expect(output.prop('title')).to.equal('test-title');
        expect(output.prop('readings')).to.deep.equal([{ path: 'my-path', meaning: 'my-meaning' }]);
        expect(output.prop('devices')).to.deep.equal(['device-0', 'device-1']);
        expect(output.prop('config')).to.deep.equal({ readings: [{ path: 'my-path', meaning: 'my-meaning' }] });
    });

    it('should work with no configs', () => {
        const widgets = { type: 'Radial', title: 'test' };
        const output = shallow(<WidgetComponent widget={widgets}/>);
        expect(output.type()).to.equal(Radial);
    });

    it('should be set for healthMonitor to healthMonitor widget', () => {
        const widget = { type: 'healthMonitor', title: 'test' };
        const output = shallow(<WidgetComponent widget={widget}/>);
        expect(output.type()).to.equal(HealthMonitor);
    });

    it('should be set for Map to Map widget', () => {
        const widget = { type: 'Map', title: 'test' };
        const output = shallow(<WidgetComponent widget={widget}/>);
        expect(output.type()).to.equal(Map);
    });

    it('should be set for MapWidget to SmallMapWidget', () => {
        const widget = { type: 'MapWidget', title: 'test' };
        const output = shallow(<WidgetComponent widget={widget}/>);
        expect(output.type()).to.equal(SmallMapWidget);
    });
});
