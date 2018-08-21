import 'reflect-metadata';
import React from 'react';
import { Container } from 'libs/typedi';
import { render } from 'react-dom';
import { configure } from 'mobx';
import { configureDevtool } from 'mobx-react-devtools';
import { enableLogging } from 'mobx-logger';

import { registerServices } from 'core';
import { logStores } from 'utils/log-stores';
import { initializeStats } from 'utils/stats';

import { LoadService, UndoService } from 'core';

import Root from './pages/Root';

import './app.global.css';

// Ensure that all services are registered with the DI provider.
registerServices();

// Set up an ad-hoc logging function for inspecting the state of the
// central stores
logStores();
initializeStats();

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

const undoService = Container.get(UndoService);
undoService.initialize();

render(<Root />, rootEl);
