import chai from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

import React from 'react';

import WidgetLinkMenuDropdown from '../../../src/components/widgetLinkMenu/dropdown';

function setup() {
    let props = {
        links: [{
            name: 'test-1', address: 'http://test-1.example.com'
        }, {
            name: 'test-2', address: 'http://test-2.example.com'
        }]
    };

    let output = shallow(<WidgetLinkMenuDropdown {...props}/>);

    return {
        props,
        output
    };
}

describe('component <WidgetLinkMenuDropdown/>', () => {
    let output;
    let props;
    beforeEach(function() {
        let setupObj = setup();
        output = setupObj.output;
        props = setupObj.props;
    });


    it('should render a anchor tag for each tag', () => {
        expect(output.find('a')).to.have.length(2);
    });

    it('should have the dropdown closed by default', () => {
        expect(output.find('.rDropdownMenuOpen')).to.have.length(0);
    });

    it('should open dropdown on dropdown menu button click', () => {
        output.find('.rDropdownMenuButton').simulate('click');
        expect(output.find('.rDropdownMenuOpen')).to.have.length(1);
    });
});
