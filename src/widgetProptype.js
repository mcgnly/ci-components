import { PropTypes } from 'react';

export const WidgetPropType = {
    id: PropTypes.number,
    type: PropTypes.string,
    version: PropTypes.string,
    config: PropTypes.shape({
       readings: PropTypes.arrayOf(
           PropTypes.shape({
                path: PropTypes.string,
                meaning: PropTypes.string,
                id: PropTypes.string,
                valueSchema: PropTypes.object
            })
        ),
        links: PropTypes.arrayOf(PropTypes.shape({
            address: PropTypes.string,
            name: PropTypes.string
        })),
        min: PropTypes.number,
        max: PropTypes.number,
        unit: PropTypes.string
    }),
    title: PropTypes.string,
    query: PropTypes.shape({
        deviceIds: PropTypes.arrayOf(PropTypes.string),
        deviceDescription: PropTypes.string,
        deviceName: PropTypes.string,
        firmwareVersion: PropTypes.string
    }),
    results: PropTypes.arrayOf(
       PropTypes.shape({
           id: PropTypes.string,
           owner: PropTypes.string,
           name: PropTypes.string,
           modelId: PropTypes.string
       })
   )
};
