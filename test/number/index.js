import { expect } from 'chai';
import { mount } from 'enzyme';

import React from 'react';

import NumberWidget from '../../src/number';

function setup() {
    let props = {
        title: 'test-title',
        readings: [{ id: 'my-id', path: 'my-path', meaning: 'my-meaning' }]
    };

    let wrapper = mount(<NumberWidget {...props}/>);

    return {
        props,
        wrapper
    };
}

describe('component <NumberWidget/>', () => {
    let wrapper;
    beforeEach(function() {
        wrapper = setup().wrapper;
    });

    it('should render the number in a span', () => {
        expect(wrapper.find('span.mONumberWidget')).to.have.length(1);
    });
});
