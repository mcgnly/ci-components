import { expect } from 'chai';
import sinon from 'sinon';

import Service from '../../src/simpleRedirect/service';

describe('SimpleRedirect service', () => {
    let redirectSpy;
    beforeEach(() => {
        redirectSpy = sinon.spy();
    });

    describe('healthMonitor', () => {
        it('should use provided redirect method', () => {
            Service.redirect('healthMonitor', {
                healthMonitorId: 'my-healthMonitor-id'
            }, redirectSpy);
            expect(redirectSpy).to.have.been.calledWith('/healthMonitor/my-healthMonitor-id');
        });
    });
});
