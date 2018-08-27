import * as React from 'react';

export interface Props {
  size: string | number;
  style?: any;
  type: string;
}

class Icon extends React.Component<Props, {}> {
  static defaultProps = {
    size: 24,
  };

  _mergeStyles(...args: any[]) {
    // This is the m function from "CSS in JS" and can be extracted to a mixin
    return Object.assign({}, ...args);
  }

  renderGraphic() {
    switch (this.props.type) {
      case 'add-box':
        return (
          <g>
            <path d="M19 3h-14c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z" />
          </g>
        );
      case 'zoom-in':
        return (
          <g>
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
          </g>
        );
      case 'zoom-out':
        return (
          <g>
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" />
          </g>
        );
      default:
        return null;
    }
  }

  render() {
    const styles = {
      fill: 'currentcolor',
      verticalAlign: 'middle',
      width: this.props.size, // CSS instead of the width attr to support non-pixel units
      height: this.props.size, // Prevents scaling issue in IE
    };
    return (
      <svg
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        style={this._mergeStyles(
          styles,
          this.props.style // This lets the parent pass custom styles
        )}
      >
        {this.renderGraphic()}
      </svg>
    );
  }
}

export default Icon;
