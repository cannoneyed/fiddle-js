import 'reflect-metadata';
import React from 'react';
import { Container } from 'typedi';
import { render } from 'react-dom';
import { configure } from 'mobx';
import { enableLogging } from 'mobx-logger';
import { configureDevtool } from 'mobx-react-devtools';
import { logStores } from 'utils/log-stores';

import { LoadService } from 'core/services/load';

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
  compute: false,
});

// Configure react devtool
configureDevtool({
  logEnabled: false,
});

// Configure mobx
configure({
  enforceActions: true,
});

const rootEl = document.getElementById('root');

const loadService = Container.get(LoadService);
loadService.loadSession();

render(<Root />, rootEl);
