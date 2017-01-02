import React, { Component } from 'react'

import styles from './styles.less'

export default class TrackContainer extends Component {
  render() {
    const trackStyle = {
      height: 40,
    }

    return (
      <div className={ styles.trackContainer } style={ trackStyle } />
    )
  }
}
