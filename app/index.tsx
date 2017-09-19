import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { enableLogging } from 'mobx-logger'

import routes from './routes'

import './app.global.css'

enableLogging({
  action: true,
  reaction: false,
  transaction: true,
  compute: true,
})
useStrict(true)

const routingStore = new RouterStore()
const history = syncHistoryWithStore(hashHistory, routingStore)

render(
  <Provider routingStore={routingStore}>
    <Router history={history as any} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
