import { expect } from 'chai';

import redirectUrlFactory from '../../src/simpleRedirect/redirectUrlFactory';

describe('SimpleRedirect redirectUrlFactory', () => {
    describe('healthMonitor', () => {
        it('should create an url with healthMonitor with id is redirectUrlFactory', () => {
            expect(redirectUrlFactory.healthMonitor({
                healthMonitorId: 'test-id'
            })).to.equal('/healthMonitor/test-id');
        });

        it('should not return anything if there is no healthMonitorId', () => {
            expect(redirectUrlFactory.healthMonitor({
                'wrong-id': 'test-id'
            })).to.equal(null);
        });
    });
});
