import * as React from 'react'
import { render } from 'react-dom'
import { useStrict } from 'mobx'
import { AppContainer } from 'react-hot-loader'
import { configureDevtool } from 'mobx-react-devtools'

import Root from 'pages/Root'

import './app.global.css'

// Any configurations are optional
configureDevtool({
  logEnabled: true,
  updatesEnabled: false,
  logFilter: change => change.type !== 'reaction',
})
useStrict(true)

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById('root')
)

if ((module as any).hot) {
  ;(module as any).hot.accept('./pages/Root', () => {
    const NextRoot = require('./pages/Root').default
    render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
