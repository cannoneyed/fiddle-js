import * as React from 'react'
import DevTools from 'mobx-react-devtools'
import { Provider } from 'mobx-react'
import Sequencer from 'pages/Sequencer'

export default function Root() {
  return (
    <Provider>
      <div className="pt-dark">
        <Sequencer />
        <DevTools />
      </div>
    </Provider>
  )
}
