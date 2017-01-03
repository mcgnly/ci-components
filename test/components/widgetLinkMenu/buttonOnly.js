import chai from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

import React from 'react';

import WidgetLinkMenuButtonOnly from '../../../src/components/widgetLinkMenu/buttonOnly';

function setup() {
    let props = {
        link: {
            name: 'test-1', address: 'http://test-1.example.com'
        }
    };

    let output = shallow(<WidgetLinkMenuButtonOnly {...props}/>);

    return {
        props,
        output
    };
}

describe('component <WidgetLinkMenuButtonOnly/>', () => {
    let output;
    let props;
    beforeEach(function() {
        let setupObj = setup();
        output = setupObj.output;
        props = setupObj.props;
    });


    it('should render a anchor tag with the link', () => {
        expect(output.find('a').prop('href')).to.equal('http://test-1.example.com');
    });
});
