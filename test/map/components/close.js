import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import Close from '../../../src/map/components/close';

function setup() {
    let props = {
        onClose: sinon.spy()
    };

    let output = shallow(<Close {...props}/>);

    return {
        props,
        output
    };
}

describe('component <CloseComponent/>', () => {
    let output;
    let props;
    beforeEach(function() {
        const setupObj = setup();
        output = setupObj.output;
        props = setupObj.props;
    });


    it('should call onClose propty when close button calls onClose', () => {
        output.simulate('click');
        expect(props.onClose).to.have.been.calledOnce;
    });

    it('should have a close icon', () => {
        expect(output.hasClass('fa-close')).to.equal(true);
    });

});
