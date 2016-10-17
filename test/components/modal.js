import chai from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

import React from 'react';

import Modal from '../../src/components/modal';

function setup() {
    let props = {
        title: 'test-title',
        children: 'a text'
    };

    let output = shallow(<Modal {...props}/>);

    return {
        props,
        output
    };
}

describe('component <WidgetHeader/>', () => {
    let output;
    let props;
    beforeEach(function() {
        let setupObj = setup();
        output = setupObj.output;
        props = setupObj.props;
    });

    it('should default state to not closed', () => {
        expect(output.state('close')).to.equal(false);
    });

    it('should close on close click', () => {
        output.find('.mQaClose').first().simulate('click');
        expect(output.state('close')).to.equal(true);
    });

    it('should not render modal if .close is true', () => {
        output.find('.mQaClose').first().simulate('click');
        expect(output.find('.rModal')).to.have.length(0);
    });

    describe('#render ', () => {
        it('should the modal title', () => {
            expect(output.find('.rTypoHeadingBold').text()).to.equal('test-title');
        });

        it('should the modal body', () => {
            expect(output.find('.rModalBody').text()).to.equal('a text');
        });
    });

});
