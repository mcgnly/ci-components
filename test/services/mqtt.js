import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

import Service from '../../src/service/mqtt';

const relayrMock = {
    getConfig: () => {}
};

const deviceMock = {
    connect: sinon.stub().returns({
        then: () => {}
    })
};

Service.__Rewire__('Relayr', relayrMock);
Service.__Rewire__('Device', () => deviceMock);

describe('mqtt Service', () => {
    let service;
    let onMessage;
    beforeEach(function() {
        onMessage = sinon.spy();
        service = new Service({
            id: 'fake-id',
            meaning: 'fake-meaning',
            path: 'fake-path',
            onMessage
        });
    });

    describe('#connect', () => {
        it('should establish a connnection for the device', () => {
            service.connect();

            expect(deviceMock.connect).to.have.been.calledOnce;
        });

        it('should not throw error if sdk fails', () => {
            deviceMock.connect.throws(new Error('Failed to connect'));
            expect(() => {
                service.connect();
            }).not.to.throw(Error);
        });

        describe('on incoming message', () => {
            let readings = [{ meaning: 'fake-meaning', path: 'fake-path', value: 42 }];
            beforeEach(() => {
                deviceMock.connect.returns({
                    then: (cb) => {
                        cb({
                            on: (event, msgCb) => {
                                msgCb({
                                    readings: readings
                                });
                            }
                        });
                    }
                });
            });

            it('call listener if it matches meaning, path', () => {
                let clock = sinon.useFakeTimers(0);
                service.connect();

                expect(onMessage).to.have.been.calledOnce;
                expect(onMessage.firstCall.args[0].value).to.equal(42);
                expect(onMessage.firstCall.args[0].lastMessage.getTime()).to.equal((new Date()).getTime());
                clock.restore();
            });

            it('call not listener if there is no match', ()  => {
                readings = [{ meaning: 'fake-no-meaning', path: 'fake-no-path', value: 42 }];
                service.connect();

                expect(onMessage).not.to.have.been.calledWith(42);
            });
        });

        describe('it should handle rejected promise', () => {
            beforeEach(() => {
                deviceMock.connect.returns({
                    then: (resolve, reject) => {
                        reject({ message: 'this didnt work' });
                    }
                });
            });

            it('should not throw an error or warning', () => {
                expect(() => {
                    service.connect();
                }).not.to.throw(Error);
            });
        });
    });

    describe('#disconnect', () => {
        let connectionMock;

        beforeEach(() => {
            connectionMock = {
                on: () => {},
                unsubscribe: sinon.stub()
            };

            deviceMock.connect.returns({
                then: (cb) => {
                    cb(connectionMock);
                }
            });
        });
        it('should unsubscribe for the device', () => {
            service.connect();
            service.disconnect();

            expect(connectionMock.unsubscribe).to.have.been.calledOnce;
        });

        it('if there is no connection it should do nothing', () => {
            deviceMock.connect.returns({
                then: (cb) => {
                    cb({
                        on: connectionMock.on
                    });
                }
            });

            service.connect();
            service.disconnect();

            expect(connectionMock.unsubscribe).not.to.have.been.calledOnce;
        });

        it('should not throw error if sdk fails', () => {
            connectionMock.unsubscribe.throws(new Error('Something when wrong on unsubscribe'));
            service.connect();
            expect(() => {
                service.disconnect();
            }).not.to.throw(Error);
        });
    });
});
