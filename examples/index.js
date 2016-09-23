import React from 'react';
import ReactDOM from 'react-dom';

import Relayr from 'relayr-browser-sdk';

import App from './app';

import { ApiURL } from '../src/config/urls';

console.log('--- ', ApiURL);
Relayr.init({
    // id: '8fedfb26-82b7-493f-a7c6-e3a4b592dd25',
    id: '02408d66-e747-44e4-a1b7-69625084afdb',
    redirectURI: 'http://localhost:3000'
}, {
    ajax: {
        protocol: 'https://',
        uri: ApiURL
    }
});

Relayr.authorize();

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
