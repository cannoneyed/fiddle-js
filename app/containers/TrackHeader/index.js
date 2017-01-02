import React, { Component, PropTypes } from 'react'

export default class TrackHeaderContainer extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
  }

  render() {
    const { index } = this.props

    return (
      <h1>
        { index }
      </h1>
    )
  }
}
