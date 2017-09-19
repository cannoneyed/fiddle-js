import * as React from 'react'
import { Route, Switch } from 'react-router'
import App from 'pages/App'
import Sequencer from 'pages/Sequencer'
import Modulation from 'pages/Modulation'

export default () => (
  <App>
    <Switch>
      <Route path="/" component={Sequencer} />
      <Route path="/counter" component={Modulation} />
    </Switch>
  </App>
)
