import React from 'react'
import { render } from 'react-dom'
import { useStrict } from 'mobx'
import { AppContainer } from 'react-hot-loader'
import { configureDevtool } from 'mobx-react-devtools'

import Root from './pages/Root'

import './app.global.css'

// Any configurations are optional
configureDevtool({
  logEnabled: true,
  updatesEnabled: false,
  logFilter: change => change.type !== 'reaction',
})
useStrict(true)

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
  module.hot.accept() // this is important
  renderPage(Root)
} else {
  renderPage(Root)
}
