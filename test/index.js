import { expect } from 'chai';
import { shallow } from 'enzyme';

import React from 'react';

import WidgetList from '../src';
import WidgetComponent from '../src/widgetComponent';

function setup() {
    let props = {
        widgets: [
            {
                type: 'Temperature',
                title: 'test-title',
                config: { readings: [{ id: 'my-id', path: 'my-path', meaning: 'my-meaning' }] }
            },
            {
                type: 'Radial',
                title: 'test-title-2',
                config: { readings: [{ id: 'my-id-2', path: 'my-path-2', meaning: 'my-meaning-2' }] }
            },
            {
                type: 'NonExisting',
                title: 'test-title-2',
                config: { readings: [{ id: 'my-id-2', path: 'my-path-2', meaning: 'my-meaning-2' }] }
            }
        ]
    };

    let output = shallow(<WidgetList {...props}/>);

    return {
        props,
        output
    };
}

describe('component <WidgetsList/>', () => {
    let output;
    beforeEach(function() {
        output = setup().output;
    });

    it('should render all widgets existing widgets', () => {
        expect(output.children().length).to.equal(3);
        expect(output.find(WidgetComponent).length).to.equal(3);
    });

});
