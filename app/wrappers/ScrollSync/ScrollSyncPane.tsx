import { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

interface ComponentProps {
  children: JSX.Element
  attachTo?: HTMLElement
}

export default class ScrollSyncPane extends Component<ComponentProps, {}> {
  static contextTypes = {
    registerPane: PropTypes.func.isRequired,
    unregisterPane: PropTypes.func.isRequired,
  }

  node: Element

  componentDidMount() {
    this.node = this.props.attachTo || ReactDOM.findDOMNode(this)
    this.context.registerPane(this.node)
  }

  componentWillUnmount() {
    this.context.unregisterPane(this.node)
  }

  render() {
    return this.props.children
  }
}
