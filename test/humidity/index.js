import { expect } from 'chai';
import { mount } from 'enzyme';

import React from 'react';

import HumidityComponent from '../../src/humidity';

import { Humidity } from 'relayr-sensor-illustrations';

function setup() {
    let props = {
        title: 'test-title',
        readings: [{ id: 'my-id', path: 'my-path', meaning: 'my-meaning' }]
    };

    let wrapper = mount(<HumidityComponent {...props}/>);

    return {
        props,
        wrapper
    };
}

describe('component <Humidity/>', () => {
    let wrapper;
    beforeEach(function() {
        wrapper = setup().wrapper;
    });

    it('should render the Humidity sensor widget', () => {
        expect(wrapper.find(Humidity)).to.have.length(1);
    });
});
