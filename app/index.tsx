import 'reflect-metadata';
import React from 'react';
import { Container } from 'libs/typedi';
import { render } from 'react-dom';
import { configure } from 'mobx';
import { enableLogging } from 'mobx-logger';

import { registerServices } from 'core';
import { initializeStats } from 'utils/stats';

import { LoadService, UndoService } from 'core';

import Root from './pages/Root';

import './app.global.css';

// Ensure that all services are registered with the DI provider.
registerServices();
initializeStats();

// Configure mobx logging
enableLogging({
  action: true,
  reaction: false,
  transaction: false,
  compute: false,
});

// Configure mobx
configure({
  enforceActions: 'observed',
});

const rootEl = document.getElementById('root');

const loadService = Container.get(LoadService);
loadService.loadSession();

const undoService = Container.get(UndoService);
undoService.initialize();

render(<Root />, rootEl);
