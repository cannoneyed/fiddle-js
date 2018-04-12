import * as React from 'react'
import { render } from 'react-dom'

const App = <h1>FUCK YOU</h1>
const el = document.getElementById('root')

render(App, el)

if ((module as any).hot) {
  ;(module as any).hot.accept('./containers/Root', () => {
    render(App, el)
  })
}
