import React from 'react';
import ReactDOM from 'react-dom';

import Relayr from 'relayr-browser-sdk';

import App from './app';

Relayr.init({
    id: '8fedfb26-82b7-493f-a7c6-e3a4b592dd25',
    redirectURI: 'http://localhost:3000'
});

Relayr.authorize();

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
