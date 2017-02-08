const DEVICE_ID = 'c5679ef2-3542-4af7-9473-89f5973e311b';
const DEVICE_MEANING = 'temperature';

export default [
    {
        type: 'Temperature',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: DEVICE_MEANING,
                    valueSchema: {
                        type: 'integer',
                        minimum: 10,
                        maximum: 90,
                        unit: 'K'
                    }
                }
            ],
        },
        title: 'Temperature',
        query: {
            deviceIds: [
                DEVICE_ID
            ]
        },
        results: [
            { id: DEVICE_ID }
        ]
    },
    {
        type: 'Temperature',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: DEVICE_MEANING
                }
            ],
        },
        title: 'Temperature',
        query: {
            deviceIds: [
                DEVICE_ID
            ]
        },
        results: [
            { id: DEVICE_ID }
        ]
    },
    {
        type: 'Humidity',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: DEVICE_MEANING,
                    valueSchema: {
                        type: 'number',
                        minimum: 10,
                        maximum: 90
                    }
                }
            ],
        },
        title: 'Humidity',
        query: {
            deviceIds: [
                DEVICE_ID
            ]
        },
        results: [
            { id: DEVICE_ID }
        ]
    },
    {
        type: 'Radial',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: DEVICE_MEANING,
                    valueSchema: {
                        type: 'integer',
                        minimum: 10,
                        maximum: 90
                    }
                }
            ],
        },
        title: 'Radial',
        query: {
            deviceIds: [
                DEVICE_ID
            ]
        },
        results: [
            { id: DEVICE_ID }
        ]
    },
    {
        type: 'Luminosity',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: DEVICE_MEANING,
                    valueSchema: {
                        type: 'integer',
                        minimum: 10,
                        maximum: 1000
                    }
                }
            ],
        },
        title: 'Luminosity',
        query: {
            deviceIds: [
                DEVICE_ID
            ]
        },
        results: [
            { id: DEVICE_ID }
        ]
    },
    {
        type: 'Boolean',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: DEVICE_MEANING,
                    valueSchema: {
                        type: 'boolean'
                    }
                }
            ]
        },
        title: 'Boolean',
        query: {
            deviceIds: [
                DEVICE_ID
            ]
        },
        results: [
            { id: DEVICE_ID }
        ]
    },
    {
        type: 'Percentage',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: DEVICE_MEANING,
                    valueSchema: {
                        type: 'integer'
                    }
                }
            ]
        },
        title: 'Percentage',
        query: {
            deviceIds: [
                DEVICE_ID
            ]
        },
        results: [
            { id: DEVICE_ID }
        ]
    },
    {
        type: 'Number',
        title: 'Number',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: DEVICE_MEANING,
                    valueSchema: {
                        type: 'number'
                    }
                }
            ]
        },
        query: {
            deviceIds: [
                DEVICE_ID
            ]
        },
        results: [
            { id: DEVICE_ID }
        ]
    },
    {
        type: 'Percentage',
        title: 'Percentage with links',
        version: '0.1',
        config: {
            readings: [
                {
                    path: '',
                    meaning: DEVICE_MEANING,
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
        query: {
            deviceIds: [
                DEVICE_ID
            ]
        },
        results: [
            { id: DEVICE_ID }
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
                    meaning: DEVICE_MEANING,
                    valueSchema: {
                        type: 'integer'
                    }
                }
            ]
        },
        title: 'NumericHistory',
        query: {
            deviceIds: [
                DEVICE_ID
            ]
        },
        results: [
            { id: DEVICE_ID }
        ]
    },
    {
        type: 'MapWidget',
        version: '0.1',
        config: {},
        title: 'MapWidget',
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
