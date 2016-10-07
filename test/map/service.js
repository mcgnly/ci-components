import { expect } from 'chai';
import sinon from 'sinon';

import MapService from '../../src/map/service';

const fetchStub = sinon.stub();
const searchFetchStub = sinon.stub();
MapService.__Rewire__('Relayr', {
    getCurrentUser: () => {
        return {
            userInfo: { token: 'test-token' },
            searchForDevices: searchFetchStub,
            getUserInfo: () => {
                return new Promise((res) => { res(); });
            }
        };
    },
    customAjax: () => {
        return {
            get: fetchStub
        };
    }
});

const deviceFixtures = [
    { id: 'device-id-0' },
    { id: 'device-id-1' },
    { id: 'device-id-2' },
    { id: 'device-id-3' }
];

describe('MapService', () => {
    let service;
    beforeEach(() => {
        service = new MapService(deviceFixtures);
        fetchStub.returns(new Promise((resolve) => {
            resolve({
                data: [
                    { deviceId: 'device-id-0', location: { latitude: 0, longitude: 1 } },
                    { deviceId: 'device-id-1', location: { latitude: 10, longitude: 11 } },
                    { deviceId: 'device-id-2', location: { latitude: 20, longitude: 21 } },
                ]
            });
        }));

        searchFetchStub.returns(new Promise((resolve) => {
            resolve([
                { id: 'device-id-0', name: 'name id 0' },
                { id: 'device-id-1', name: 'name id 1' },
                { id: 'device-id-2', name: 'name id 2' },
                { id: 'no-location-0', title: 'no location 0' }
            ]);
        }));
    });

    describe('#getCoordinates', () => {
        it('should the last coordinates from the provided devices', () => {
            service.getCoordinates();
            expect(fetchStub.firstCall.args[0]).to.have.string('locations');
            expect(fetchStub.firstCall.args[1]).to.deep.equal({
                queryObj: { deviceIds: ['device-id-0', 'device-id-1', 'device-id-2', 'device-id-3'] }
            });
        });

        it('should get devices doing a search with the current device ids', () => {
            service.getCoordinates();
            expect(searchFetchStub.firstCall).to.have.been.calledWith({
                query: {
                    ids: ['device-id-0', 'device-id-1', 'device-id-2', 'device-id-3']
                }
            });
        });

        it('should combine coordinates with the device information', (done) => {
            service.getCoordinates().then((lastReadings) => {
                expect(lastReadings).to.deep.equal([
                    { properties: { title: 'name id 0', id: 'device-id-0' }, coordinates: [1, 0] },
                    { properties: { title: 'name id 1', id: 'device-id-1' }, coordinates: [11, 10] },
                    { properties: { title: 'name id 2', id: 'device-id-2' }, coordinates: [21, 20] },
                ]);
                done();
            });
        });

        it('should ignore devices without coordinates', (done) => {
            service.getCoordinates().then((lastReadings) => {
                expect(lastReadings[lastReadings.length - 1]).not.to.deep.equal([
                    { properties: { title: 'no location 0', id: 'no-location-0' }, coordinates: [] },
                ]);
                done();
            });
        });

        describe('on failure', () => {
            it('should fail if search fails', (done) => {
                searchFetchStub.returns(new Promise((res, reject) => {
                    reject({ message: 'FU' });
                }));

                service.getCoordinates().catch((error) => {
                    expect(error).to.deep.equal({
                        message: 'FU'
                    });
                    done();
                });
            });

            it('should fail if get last coordinates fails', () => {
                fetchStub.returns(new Promise((res, reject) => {
                    reject({ message: 'FU' });
                }));

                service.getCoordinates().catch((error) => {
                    expect(error).to.deep.equal({
                        message: 'FU'
                    });
                    done();
                });
            });
        });
    });


    describe('#getHistory', () => {
        beforeEach(() => {
            fetchStub.reset();
            fetchStub.returns(new Promise((resolve) => {
                resolve({
                    data: {
                        deviceId: 'device-id-0',
                        events: [{
                            location: {
                                latitude: 1,
                                longitude: 2
                            },
                            entered: '2016-08-22T0:30:0+0000',
                            left: '2016-08-22T0:30:0+0000'
                        }, {
                            location: {
                                latitude: 21,
                                longitude: 22
                            },
                            entered: '2016-08-22T0:30:0.0+0000',
                            left: '2016-08-22T0:30:0.0+0000'
                        }, {
                            location: {
                                latitude: 31,
                                longitude: 32
                            },
                            entered: '2016-08-22T0:30:0+0000',
                            left: '2016-08-22T0:30:0+0000'
                        }, {
                            location: {
                                latitude: 41,
                                longitude: 42
                            },
                            entered: '2016-08-22T0:30:0+0000',
                            left: '2016-08-22T0:30:0+0000'
                        }]
                    }
                });
            }));

            service.getHistory('tracked-device-id');
        });

        it('should get location history for the provided deviceId', () => {
            expect(fetchStub.firstCall.args[0]).to.have.string('history');
            expect(fetchStub.firstCall.args[0]).to.have.string('locations');
            expect(fetchStub.firstCall.args[0]).to.have.string('tracked-device-id');
        });

        it('should map locations to coordinates', (done) => {
            service.getHistory().then((data) => {
                expect(data).to.deep.equal([
                    { entered: new Date('2016-08-22T0:30:0+0000'), left: new Date('2016-08-22T0:30:0+0000'), coordinates: [2, 1] },
                    { entered: new Date('2016-08-22T0:30:0+0000'), left: new Date('2016-08-22T0:30:0+0000'), coordinates: [22, 21] },
                    { entered: new Date('2016-08-22T0:30:0+0000'), left: new Date('2016-08-22T0:30:0+0000'), coordinates: [32, 31] },
                    { entered: new Date('2016-08-22T0:30:0+0000'), left: new Date('2016-08-22T0:30:0+0000'), coordinates: [42, 41] },
                ]);
                done();
            });
        });
    });
});
