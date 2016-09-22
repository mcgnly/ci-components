import { expect } from 'chai';
import { mount } from 'enzyme';

import React from 'react';

import PercentageComponent from '../../src//percentage';

import { Percentage } from 'relayr-sensor-illustrations';

function setup() {
    let props = {
        title: 'test-title',
        readings: [{ id: 'my-id', path: 'my-path', meaning: 'my-meaning' }]
    };

    let wrapper = mount(<PercentageComponent {...props}/>);

    return {
        props,
        wrapper
    };
}

describe('component <Percentage/>', () => {
    let wrapper;
    beforeEach(function() {
        wrapper = setup().wrapper;
    });

    it('should render the Percentage sensor widget', () => {
        expect(wrapper.find(Percentage)).to.have.length(1);
    });
});
