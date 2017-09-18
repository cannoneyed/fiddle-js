import React, { Component, PropTypes } from 'react'

export default class MainPage extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div className="pt-dark">
        { this.props.children }
      </div>
    )
  }
}
