import chai from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

import React from 'react';

import WidgetHeader from '../../src/components/header';

function setup() {
    let props = {
        title: 'test-title',
        showSettings: true,
        onSettingsClick: sinon.spy()
    };

    let output = shallow(<WidgetHeader {...props}/>);

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

    it('should trigger onSettings on settings click', () => {
        output.find('.mQaHeaderSettings').simulate('click');
        expect(props.onSettingsClick).to.have.been.calledOnce;
    });

    describe('showSettings', () => {
        it('should not show settings if showSettings is false', () => {
            output.setProps({
                showSettings: false
            });
            expect(output.find('.mQaSettings')).to.have.length(0);
        });

        it('should show settings if showSettings is true', () => {
            expect(output.find('.mQaHeaderSettings')).to.have.length(1);
        });
    });

});
