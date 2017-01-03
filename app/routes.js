import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './pages/App'
import Sequencer from './pages/Sequencer'
import Modulation from './pages/Modulation'

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Sequencer } />
    <Route path="/modulation" component={ Modulation } />
  </Route>
)
