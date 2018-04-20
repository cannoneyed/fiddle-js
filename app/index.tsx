import 'reflect-metadata';
import React from 'react';
import { render } from 'react-dom';
import { configure } from 'mobx';
import { enableLogging } from 'mobx-logger';
import { logStores } from 'utils/log-stores';

import Root from './pages/Root';

import './app.global.css';

// Set up an ad-hoc logging function for inspecting the state of the
// central stores
logStores();

// Configure mobx logging
enableLogging({
  action: true,
  reaction: false,
  transaction: false,
  compute: false
});

// Configure mobx
configure({
  enforceActions: true,
});

const rootEl = document.getElementById('root');

render(<Root />, rootEl);
