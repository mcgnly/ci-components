import { expect } from 'chai';
import sinon from 'sinon';

import HealthMonitorService from '../../src/healthMonitor/service';

import healthMonitorStatusesFixture from '../fixtures/healthMonitorStatuses';

const fetchStub = sinon.stub();
HealthMonitorService.__Rewire__('Relayr', {
    getCurrentUser: () => {
        return { userInfo: { token: 'test-token' } };
    },
    customAjax: () => {
        return {
            get: fetchStub
        };
    }
});

describe('HealthMonitorService', () => {
    let service;
    beforeEach(() => {
        service = new HealthMonitorService();
        fetchStub.returns(new Promise((resolve) => {
            resolve({
                data: healthMonitorStatusesFixture
            });
        }));
    });

    describe('#getHealthMonitorStatus', () => {
        it('should get the health monitor status using the provided id', () => {
            service.getHealthMonitorStatus('health-monitor-id');
            expect(fetchStub.firstCall.args[0]).to.have.string('monitors/health-monitor-id/statuses');
        });

        it('should resolve the promise with all status', () => {
            return service.getHealthMonitorStatus('health-monitor-id').then((statuses) => {
                expect(statuses).to.be.deep.equal(healthMonitorStatusesFixture);
            });
        });
    });
});
