import { expect } from 'chai';
import { mount } from 'enzyme';

import React from 'react';

import TemperatureComponent from '../../src/temperature';

import { Temperature } from 'relayr-sensor-illustrations';

function setup() {
    let props = {
        title: 'test-title',
        readings: [{ id: 'my-id', path: 'my-path', meaning: 'my-meaning' }]
    };

    let wrapper = mount(<TemperatureComponent {...props}/>);

    return {
        props,
        wrapper
    };
}

describe('component <Temperature/>', () => {
    let wrapper;
    beforeEach(function() {
        wrapper = setup().wrapper;
    });

    it('should render the Temperature sensor widget', () => {
        expect(wrapper.find(Temperature)).to.have.length(1);
    });
});
