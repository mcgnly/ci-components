import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import Map from '../../src//map';
import MapOverview from '../../src//map/containers/overview';
import MapHistory from '../../src//map/containers/history';
import Service from '../../src//map/service';

function setup() {
    let output = shallow(<Map/>);

    return {
        output
    };
}

describe('widget Map', () => {
    let output;
    beforeEach(function() {
        output = setup().output;
    });

    describe('state type', () => {
        it('should render the <MapOverview/> when type is overview', () => {
            output.setState({ type: 'overview' });
            expect(output.find(MapOverview)).to.have.length(1);
            expect(output.find(MapHistory)).to.have.length(0);
        });

        it('should render the <MapHistory> when type is history', () => {
            output.setState({ type: 'history' });
            expect(output.find(MapOverview)).to.have.length(0);
            expect(output.find(MapHistory)).to.have.length(1);
        });
    });

    it('should create a service with devices', () => {
        expect(output.instance().service).to.be.an.instanceof(Service);
    });

    it('should pass the services to the overview and history container', () => {
        expect(output.find(MapOverview).first().prop('service')).to.be.an.instanceof(Service);

        output.setState({ type: 'history' });
        expect(output.find(MapHistory).first().prop('service')).to.be.an.instanceof(Service);
    });

    describe('when a popup in the map overview has been clicked', () => {

        it('should change to history type', () => {
            output.setState({ type: 'dummy-type' });
            output.find(MapOverview).first().prop('onPopupClick')();
            expect(output.state('type')).to.equal('history');
        });

        it('should store the selected id', () => {
            output.find(MapOverview).first().prop('onPopupClick')('selected-id');
            expect(output.state('historyDeviceId')).to.equal('selected-id');
        });
    });

    it('should change to map overview on history close', () => {
        output.setState({ type: 'history' });
        output.find(MapHistory).first().prop('onCloseClick')();
        expect(output.state('type')).to.equal('overview');
    });
});
