import chai from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

import React from 'react';

import ControlPanel from '../../src/components/controlPanel';

function setup() {
    let props = {
        onRefresh: sinon.spy()
    };

    let output = shallow(<ControlPanel {...props}/>);

    return {
        props,
        output
    };
}

describe('component <ControlPanel/>', () => {
    let output;
    let props;
    beforeEach(function() {
        let setupObj = setup();
        output = setupObj.output;
        props = setupObj.props;
    });

    it('should trigger onRefresh on refresh click', () => {
        output.find('.mQaRefresh').simulate('click');
        expect(props.onRefresh).to.have.been.calledOnce;
    });

    describe('#render', () => {
        it('should render a refersh icon', () => {
            expect(output.find('.fa-refresh')).to.have.length(1);
        });
    });

});
