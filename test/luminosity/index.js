import { expect } from 'chai';
import { mount } from 'enzyme';

import React from 'react';

import LuminosityComponent from '../../src/luminosity';

import { Luminosity } from 'relayr-sensor-illustrations';

function setup() {
    let props = {
        title: 'test-title',
        readings: [{ id: 'my-id', path: 'my-path', meaning: 'my-meaning' }],
        min: 0,
        max: 5000
    };

    let wrapper = mount(<LuminosityComponent {...props}/>);

    return {
        props,
        wrapper
    };
}

describe('component <Luminosity/>', () => {
    let wrapper;
    beforeEach(function() {
        wrapper = setup().wrapper;
    });

    it('should render the Luminosity sensor widget', () => {
        expect(wrapper.find(Luminosity)).to.have.length(1);
    });
});
