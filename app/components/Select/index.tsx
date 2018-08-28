import * as React from 'react';
import classnames from 'classnames';

export interface IOption {
  name: string;
  value: string | number;
  selected: boolean;
}

export interface Props {
  options: IOption[];
  disabled?: boolean;
  onSelect(value: string | number): void;
}

export class Select extends React.Component<Props, {}> {
  static defaultProps = {
    fill: true,
    disabled: false,
  };

  render() {
    const { onSelect, options, disabled } = this.props;
    const selectClassName = classnames(disabled ? ':disabled' : null);

    return (
      <select
        className={selectClassName}
        onChange={(event: React.SyntheticEvent<HTMLSelectElement>) => {
          const target = event.target as HTMLSelectElement;
          onSelect(target.value);
        }}
      >
        {options.map(option => (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    );
  }
}

export default Select;
