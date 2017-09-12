import * as React from 'react'
import { Switch, Route } from 'react-router'
import App from './pages/App'
import Sequencer from './pages/Sequencer'
// import Modulation from './pages/Modulation'

export default () => (
  <App>
    <Switch>
      <Route path="/" component={Sequencer} />
      {/* <Route path="/modulation" component={Modulation} /> */}
    </Switch>
  </App>
)
