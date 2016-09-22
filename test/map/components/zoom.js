import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import ZoomComponent from '../../../src//map/components/zoom';

function setup() {
    let props = {
        onZoomIn: sinon.spy(),
        onZoomOut: sinon.spy()
    };

    let output = shallow(<ZoomComponent {...props}/>);

    return {
        props,
        output
    };
}

describe('component <ZoomComponent/>', () => {
    let output;
    let props;
    beforeEach(function() {
        const setupObj = setup();
        output = setupObj.output;
        props = setupObj.props;
    });

    it('should call onZoomIn on + click', () => {
        output.find('button').first().simulate('click');
        expect(props.onZoomIn).to.have.been.calledOnce;
    });

    it('should call onZoomOut on - click', () => {
        output.find('button').last().simulate('click');
        expect(props.onZoomOut).to.have.been.calledOnce;
    });

});
