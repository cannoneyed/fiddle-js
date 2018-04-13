import React, { Component } from 'react'
import classnames from 'classnames'

export interface IOption {
  name: string
  value: string | number
  selected: boolean
}

export interface ComponentProps {
  options: IOption[]
  disabled?: boolean
  fill?: boolean
  onSelect(value: string | number): void
}

export class Select extends Component<ComponentProps, {}> {
  static defaultProps = {
    fill: true,
    disabled: false,
  }

  render() {
    const { onSelect, options, disabled, fill } = this.props
    const wrapperClassName = classnames('pt-select', fill ? 'pt-fill' : null)

    const selectClassName = classnames(disabled ? ':disabled' : null)

    return (
      <div className={wrapperClassName}>
        <select
          className={selectClassName}
          onChange={(event: React.SyntheticEvent<HTMLSelectElement>) => {
            const target = event.target as HTMLSelectElement
            onSelect(target.value)
          }}
        >
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
