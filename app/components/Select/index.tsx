import React, { Component } from 'react'
import classnames from 'classnames'

export interface IOption {
  name: string
  value: string | string[] | number
  selected: boolean
}

export interface ComponentProps {
  options: IOption[]
  disabled?: boolean
  fill?: boolean
  onSelect(): void
}

export default class Select extends Component<ComponentProps, {}> {
  static defaultProps = {
    fill: true,
    disabled: false,
  }

  render() {
    const { options, disabled, fill } = this.props
    const wrapperClassName = classnames('pt-select', fill ? 'pt-fill' : null)

    const selectClassName = classnames(disabled ? ':disabled' : null)

    return (
      <div className={wrapperClassName}>
        <select className={selectClassName}>
          {options.map(option => (
            <option key={option.name} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    )
  }
}
