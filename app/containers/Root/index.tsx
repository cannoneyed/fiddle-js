import * as React from 'react'
import { History } from 'history'
import { RouterStore } from 'mobx-react-router'
import { Provider } from 'mobx-react'
import { Router } from 'react-router'

import * as stores from 'core/stores'
import * as interactions from 'core/interactions'

import Routes from '../../routes'

interface IRootType {
  routingStore: RouterStore
  history: History
}

export default function Root({ routingStore, history }: IRootType) {
  return (
    <Provider routingStore={routingStore} {...stores} {...interactions}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  )
}
