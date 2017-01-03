import chai from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

import React from 'react';

import WidgetLinkMenu from '../../../src/components/widgetLinkMenu';
import WidgetLinkMenuButtonOnly from '../../../src/components/widgetLinkMenu/buttonOnly';
import WidgetLinkMenuDropdown from '../../../src/components/widgetLinkMenu/dropdown';

function setup() {
    let props = {
        links: [{
            name: 'test-1', address: 'http://test-1.example.com'
        }, {
            name: 'test-2', address: 'http://test-2.example.com'
        }]
    };

    let output = shallow(<WidgetLinkMenu {...props}/>);

    return {
        props,
        output
    };
}

describe('component <WidgetLinkMenu/>', () => {
    let output;
    let props;
    beforeEach(function() {
        let setupObj = setup();
        output = setupObj.output;
        props = setupObj.props;
    });

    describe('with one link', () => {
        beforeEach(() => {
            output.setProps({
                links: [{ name: 'only-one', address: 'http://only-one.example.com' }]
            });
        });

        it('should render the button only component', () => {
            expect(output.find(WidgetLinkMenuButtonOnly)).to.have.length(1);
        });

        it('should not render the dropdown menu', () => {
            expect(output.find(WidgetLinkMenuDropdown)).to.have.length(0);
        });
    });

    describe('no links', () => {
        beforeEach(() => {
            output.setProps({
                links: null
            });
        });

        it('should render nothing', () => {
            expect(output.nodes[0]).to.equal(null);
        });
    });

    describe('as array of links', () => {

        it('should not render the button only component', () => {
            expect(output.find(WidgetLinkMenuButtonOnly)).to.have.length(0);
        });

        it('should  render the dropdown menu with links', () => {
            expect(output.find(WidgetLinkMenuDropdown)).to.have.length(1);
            expect(output.find(WidgetLinkMenuDropdown).prop('links')).to.deep.equals([{
                name: 'test-1', address: 'http://test-1.example.com'
            }, {
                name: 'test-2', address: 'http://test-2.example.com'
            }]);
        });
    });
});
