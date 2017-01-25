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
        onRefresh: sinon.spy(),
        onAdd: sinon.spy(),
        onRemove: sinon.spy()
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

    describe('refresh', () => {
        it('should trigger onRefresh on refresh click', () => {
            output.find('.mQaControlPanelRefresh').simulate('click');
            expect(props.onRefresh).to.have.been.calledOnce;
        });
    });

    describe('add', () => {
        it('should trigger onAdd on refresh click', () => {
            output.find('.mQaControlPanelAdd').simulate('click');
            expect(props.onAdd).to.have.been.calledOnce;
        });
    });
});
