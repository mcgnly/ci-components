import { expect } from 'chai';
import { mount } from 'enzyme';

import React from 'react';

import BooleanComponent from '../../src/boolean';

import { Boolean } from 'relayr-sensor-illustrations';

function setup() {
    let props = {
        title: 'test-title',
        readings: [{ id: 'my-id', path: 'my-path', meaning: 'my-meaning' }],
        min: 0,
        max: 5000
    };

    let wrapper = mount(<BooleanComponent {...props}/>);

    return {
        props,
        wrapper
    };
}

describe('component <Boolean/>', () => {
    let wrapper;
    beforeEach(function() {
        wrapper = setup().wrapper;
    });

    it('should render the Boolean sensor widget', () => {
        expect(wrapper.find(Boolean)).to.have.length(1);
    });
});
