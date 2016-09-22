import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import MapPopup from '../../../src//map/components/popup';

import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

function setup() {
    let props = {
        show: true,
        title: 'my-title',
        id: 'device-id-0',
        coordinates: [1, 1],
        onClick: sinon.spy()
    };

    let output = shallow(<MapPopup {...props}/>);

    return {
        props,
        output
    };
}

describe('component <MapPopup/>', () => {
    let output;
    let props;
    beforeEach(function() {
        const setupObj = setup();
        output = setupObj.output;
        props = setupObj.props;
    });

    it('should call onClick property on click with id', () => {
        output.find('.mCPopup').simulate('click');

        expect(props.onClick).to.have.been.calledWith('device-id-0');
    });

    it('should render the popup if show is true', () => {
        expect(output.type()).to.equal(Popup);
    });

    it('should not render the popup if show is false', () => {
        output.setProps(Object.assign(props, {
            show: false
        }));
        expect(output.type()).not.to.equal(Popup);
    });

    it('should render the popup with the title', () => {
        expect(output.find('.mCPopupTitle').first().text()).to.equal('my-title');
    });

    it('sohuld set the provided coordinates', () => {
        expect(output.prop('coordinates')).to.deep.equal([1, 1]);
    });
});
