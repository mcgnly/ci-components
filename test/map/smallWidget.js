import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import SmallWidget from '../../src/map/smallWidget';
import MapOverview from '../../src/map/containers/overview';
import SmallWidgetComponent from '../../src/map/components/smallWidget';
import { smallConfig } from '../../src/map/config';
import Service from '../../src/map/service';

function setup() {
    let output = shallow(<SmallWidget/>);

    return {
        output
    };
}

describe('widget small Map', () => {
    let output;
    beforeEach(function() {
        output = setup().output;
    });

    it('should create a service with devices', () => {
        expect(output.instance().service).to.be.an.instanceof(Service);
    });

    describe('map overview component', () => {
        it('should pass the services', () => {
            expect(output.find(MapOverview).prop('service')).to.be.an.instanceof(Service);
        });
        it('should pass height', () => {
            expect(output.find(MapOverview).prop('height')).to.equal(smallConfig.height);
        });
    });

    describe('smallWidget component', () => {
        it('should be rendered', () => {
            expect(output.find(SmallWidgetComponent)).to.have.length(1);
        });
    });
});
