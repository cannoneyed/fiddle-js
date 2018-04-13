import React from 'react'
import { render } from 'react-dom'
import { configure } from 'mobx'
import { AppContainer } from 'react-hot-loader'
import { configureDevtool } from 'mobx-react-devtools'
import { logFilter } from 'utils/mobx-log-filter'
import { logStores } from 'utils/log-stores'

import { Root } from './pages/Root'

import './app.global.css'

// Set up an ad-hoc logging function for inspecting the state of the
// central stores
logStores()

// Any configurations are optional
configureDevtool({
  logEnabled: true,
  updatesEnabled: false,
  logFilter,
})

// Configure mobx
configure({
  enforceActions: true,
})

const rootEl = document.getElementById('root')
const renderPage = (Component: any) =>
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl
  )

renderPage(Root)

declare const module: any
if (module.hot) {
  module.hot.accept()
  renderPage(Root)
} else {
  renderPage(Root)
}
