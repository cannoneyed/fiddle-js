import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { enableLogging } from 'mobx-logger'

import routes from './routes'
import store from 'core'

import './app.global.css'

import './test'

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
  <Provider { ...store } routingStore={ routingStore }>
    {/* <Router history={ history } routes={ routes } /> */}
    <h1>DUMMY</h1>
  </Provider>,
  document.getElementById('root'),
)
