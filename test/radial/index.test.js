import { expect } from 'chai';
import { mount } from 'enzyme';

import React from 'react';

import RadialComponent  from '../../src//radial';

import { Radial } from 'relayr-sensor-illustrations';

function setup() {
    let props = {
        title: 'test-title',
        readings: [{ id: 'my-id', path: 'my-path', meaning: 'my-meaning' }]
    };

    let wrapper = mount(<RadialComponent {...props}/>);

    return {
        props,
        wrapper
    };
}

describe('component <Radial/>', () => {
    let wrapper;
    beforeEach(function() {
        wrapper = setup().wrapper;
    });

    it('should render the Percentage sensor widget', () => {
        expect(wrapper.find(Radial)).to.have.length(1);
    });
});
