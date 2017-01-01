import React, { Component, PropTypes } from 'react'

export default class TrackContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }

  render() {
    const { id, index } = this.props

    return (
      <h1>
        { index } : { id }
      </h1>
    )
  }
}
