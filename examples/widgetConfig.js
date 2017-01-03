export default [
    {
        type: 'MapWidget',
        version: '0.1',
        config: {},
        title: 'Location widget',
        query: {
            deviceName: 'loc'
        },
        results: [
            { id: '62136738-7833-44dc-8929-202cefbaeeb6' },
            { id: 'cc1dc38c-f49d-45c6-acfb-de4a72214c06' },
            { id: 'af4ba0bf-be7e-45fe-9fd9-5a74ca25db1f' },
            { id: 'edd2368f-705f-414c-bfd6-fcb4816a5dae' }
        ]
    },
    {
        type: 'Temperature',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: 'someMeaning',
                    valueSchema: {
                        type: 'integer'
                    }
                }
            ]
        },
        title: 'Temperature',
        query: {
            deviceIds: [
                '8c8c2244-4c65-446c-9135-847f7d422081'
            ]
        },
        results: [
            { id: '8c8c2244-4c65-446c-9135-847f7d422081' }
        ]
    },
    {
        type: 'Humidity',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: 'someMeaning',
                    valueSchema: {
                        type: 'number'
                    }
                }
            ]
        },
        title: 'Humidity',
        query: {
            deviceIds: [
                '8c8c2244-4c65-446c-9135-847f7d422081'
            ]
        },
        results: [
            { id: '8c8c2244-4c65-446c-9135-847f7d422081' }
        ]
    },
    {
        type: 'Radial',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: 'someMeaning',
                    valueSchema: {
                        type: 'integer'
                    }
                }
            ]
        },
        title: 'Radial',
        query: {
            deviceIds: [
                '8c8c2244-4c65-446c-9135-847f7d422081'
            ]
        },
        results: [
            { id: '8c8c2244-4c65-446c-9135-847f7d422081' }
        ]
    },
    {
        type: 'Luminosity',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: 'someMeaning',
                    valueSchema: {
                        type: 'integer'
                    }
                }
            ]
        },
        title: 'Luminosity',
        query: {
            deviceIds: [
                '8c8c2244-4c65-446c-9135-847f7d422081'
            ]
        },
        results: [
            { id: '8c8c2244-4c65-446c-9135-847f7d422081' }
        ]
    },
    {
        type: 'Boolean',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: 'someMeaning',
                    valueSchema: {
                        type: 'boolean'
                    }
                }
            ]
        },
        title: 'Boolean',
        query: {
            deviceIds: [
                '8c8c2244-4c65-446c-9135-847f7d422081'
            ]
        },
        results: [
            { id: '8c8c2244-4c65-446c-9135-847f7d422081' }
        ]
    },
    {
        type: 'Percentage',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: 'someMeaning',
                    valueSchema: {
                        type: 'integer'
                    }
                }
            ]
        },
        title: 'Percentage',
        query: {
            deviceIds: [
                '8c8c2244-4c65-446c-9135-847f7d422081'
            ]
        },
        results: [
            { id: '8c8c2244-4c65-446c-9135-847f7d422081' }
        ]
    },
    {
        type: 'Percentage',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: 'someMeaning',
                    valueSchema: {
                        type: 'integer'
                    }
                }
            ],
            links: [
                { name: 'link', address: 'http://example.com' },
                { name: 'link-2', address: 'http://test-2.example.com' }
            ]
        },
        title: 'Percentage with links',
        query: {
            deviceIds: [
                '8c8c2244-4c65-446c-9135-847f7d422081'
            ]
        },
        results: [
            { id: '8c8c2244-4c65-446c-9135-847f7d422081' }
        ]
    },
    {
        type: 'healthMonitor',
        version: '0.1',
        config: {
            healthMonitorId: '06f74e52-36f5-4993-b1f4-0d633e966777'
        },
        title: 'Health monitor',
        query: {
            deviceIds: []
        },
        results: []
    },
    {
        type: 'NumericHistory',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: 'someMeaning',
                    valueSchema: {
                        type: 'integer'
                    }
                }
            ]
        },
        title: 'NumericHistory',
        query: {
            deviceIds: [
                '8c8c2244-4c65-446c-9135-847f7d422081'
            ]
        },
        results: [
            { id: '8c8c2244-4c65-446c-9135-847f7d422081' }
        ]
    },
    {
        type: 'Map',
        version: '0.1',
        config: {},
        title: 'Map Full size',
        query: {
            deviceName: 'loc'
        },
        results: [
            { id: '62136738-7833-44dc-8929-202cefbaeeb6' },
            { id: 'cc1dc38c-f49d-45c6-acfb-de4a72214c06' },
            { id: 'af4ba0bf-be7e-45fe-9fd9-5a74ca25db1f' },
            { id: 'edd2368f-705f-414c-bfd6-fcb4816a5dae' }
        ]
    }
];
