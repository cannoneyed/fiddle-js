import * as React from 'react'
import { render } from 'react-dom'
import { useStrict } from 'mobx'
import { enableLogging } from 'mobx-logger'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { createBrowserHistory } from 'history'
import { AppContainer } from 'react-hot-loader'

import Root from './containers/Root'
import './app.global.scss'

const routingStore = new RouterStore()
const browserHistory = createBrowserHistory()
const history = syncHistoryWithStore(browserHistory, routingStore)

enableLogging({
  action: true,
  reaction: false,
  transaction: true,
  compute: true,
})
useStrict(true)

render(
  <AppContainer>
    <Root routingStore={routingStore} history={history} />
  </AppContainer>,
  document.getElementById('root')
)

if ((module as any).hot) {
  ;(module as any).hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default
    render(
      <AppContainer>
        <NextRoot routingStore={routingStore} history={history} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
