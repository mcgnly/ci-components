import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import HumanReadbleTimestamp from '../../src/time/humanReadable';

function setup() {
    let props = {
        timestamp: new Date(1985, 10, 8, 12, 0)
    };

    let output = shallow(<HumanReadbleTimestamp {...props}/>);

    return {
        props,
        output
    };
}

describe('component <HumanReadbleTimestamp/>', () => {

    describe('should show a human readble string since timestamp', () => {
        let clock;
        afterEach(function() {
            clock.restore();
        });

        it('hours', () => {
            clock = sinon.useFakeTimers((new Date(1985, 10, 8, 14, 0)).getTime());
            expect(setup().output.text()).to.equal('Last updated: 2 hours ago');
        });

        it('minutes', () => {
            clock = sinon.useFakeTimers((new Date(1985, 10, 8, 12, 20)).getTime());
            expect(setup().output.text()).to.equal('Last updated: 20 minutes ago');
        });
    });

    it('should show an empty message no valid timestamp has been provided', function() {
        expect(shallow(<HumanReadbleTimestamp/>).text()).to.equal('No data have been sent');
    });

});
