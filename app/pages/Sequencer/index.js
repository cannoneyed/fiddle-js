import React, { Component, PropTypes } from 'react'
import Tracks from 'containers/Tracks'
import Toolbar from 'containers/Toolbar'

import styles from './styles.css'

export default class MainPage extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div className={ styles.container }>
        <Toolbar />
        <Tracks />
      </div>
    )
  }
}
