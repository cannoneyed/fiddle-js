import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
  domNode: HTMLElement;
}

export class Portal extends React.Component<Props, {}> {
  render() {
    return ReactDOM.createPortal(this.props.children, this.props.domNode);
  }
}

export default Portal;
