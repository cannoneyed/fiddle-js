import React, { Component } from 'react'

interface ComponentProps {
  size?: number
  fillColor?: string
  strokeColor?: string
  strokeWidth?: number
}

export class Caret extends Component<ComponentProps, {}> {
  static defaultProps = {
    size: 10,
    fillColor: 'black',
    strokeColor: 'black',
    strokeWidth: 1,
  }

  render() {
    const { size, fillColor, strokeColor, strokeWidth } = this.props

    const svgStyle = {
      width: size,
      height: size,
    }

    const polygonStyle = {
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth,
    }

    return (
      <svg style={svgStyle} viewBox="0 0 100 100">
        <polygon style={polygonStyle} points="0,0 100,0 50,75" />
      </svg>
    )
  }
}
