import * as React from 'react'
const ReactDOM = require('react-dom')

interface ComponentProps {
  domNode: HTMLElement
}

export class Portal extends React.Component<ComponentProps, {}> {
  render() {
    return (ReactDOM as any).createPortal(this.props.children, this.props.domNode)
  }
}
