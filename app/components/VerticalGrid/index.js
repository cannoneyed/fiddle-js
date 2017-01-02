import React, { Component, PropTypes } from 'react'
import { range } from 'lodash'

import styles from './styles.less'

export default class VerticalGrid extends Component {
  static propTypes = {
    gridWidth: PropTypes.number,
    gridCount: PropTypes.number,
  }

  render() {
    const {
      gridCount,
      gridWidth,
    } = this.props

    const gridSegmentStyle = {
      minWidth: gridWidth,
    }

    return (
      <div className={ styles.verticalGridContainer } id="verticalGridContainer">
        { range(gridCount - 1).map(index => (
          <div
            key={ index }
            style={ gridSegmentStyle }
            className={ styles.gridSegment }
          />
        )) }
      </div>
    )
  }
}
