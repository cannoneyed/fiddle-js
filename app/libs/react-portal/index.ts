import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

const KEYCODES = {
  ESCAPE: 27,
};

interface CallBackProps extends React.Props<any> {
  closePortal(): void;
}

interface ReactPortalProps {
  children: any;
  isOpened?: boolean;
  openByClickOn?: React.ReactElement<CallBackProps>;
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;
  onOpen?(node: HTMLDivElement): void;
  beforeClose?(node: HTMLDivElement, resetPortalState: (x: any) => void): void;
  onClose?(): void;
  onUpdate?(): void;
}

interface State {
  active: boolean;
}

export default class Portal extends React.Component<ReactPortalProps, State> {
  state = {
    active: false,
  };

  portal: any;
  node: HTMLDivElement | null;

  static defaultProps = {
    onOpen: () => {},
    onClose: () => {},
    onUpdate: () => {},
  };

  constructor(props: ReactPortalProps) {
    super(props);
    this.state = { active: false };
    this.handleWrapperClick = this.handleWrapperClick.bind(this);
    this.closePortal = this.closePortal.bind(this);
    this.handleOutsideMouseClick = this.handleOutsideMouseClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.portal = null;
    this.node = null;
  }

  componentDidMount() {
    if (this.props.closeOnEsc) {
      document.addEventListener('keydown', this.handleKeydown);
    }

    if (this.props.closeOnOutsideClick) {
      document.addEventListener('mouseup', this.handleOutsideMouseClick);
      document.addEventListener('touchstart', this.handleOutsideMouseClick);
    }

    if (this.props.isOpened) {
      this.openPortal();
    }
  }

  componentWillReceiveProps(newProps: ReactPortalProps) {
    // portal's 'is open' state is handled through the prop isOpened
    if (typeof newProps.isOpened !== 'undefined') {
      if (newProps.isOpened) {
        if (this.state.active) {
          this.renderPortal(newProps);
        } else {
          this.openPortal(newProps);
        }
      }
      if (!newProps.isOpened && this.state.active) {
        this.closePortal();
      }
    }

    // portal handles its own 'is open' state
    if (typeof newProps.isOpened === 'undefined' && this.state.active) {
      this.renderPortal(newProps);
    }
  }

  componentWillUnmount() {
    if (this.props.closeOnEsc) {
      document.removeEventListener('keydown', this.handleKeydown);
    }

    if (this.props.closeOnOutsideClick) {
      document.removeEventListener('mouseup', this.handleOutsideMouseClick);
      document.removeEventListener('touchstart', this.handleOutsideMouseClick);
    }

    this.closePortal(true);
  }

  handleWrapperClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.active) {
      return;
    }
    this.openPortal();
  }

  openPortal(props = this.props) {
    this.setState({ active: true });
    this.renderPortal(props);

    if (this.props.onOpen && this.node) {
      this.props.onOpen(this.node);
    }
  }

  closePortal(isUnmounted = false) {
    const resetPortalState = (overrideIsUnmounted?: any) => {
      if (this.node) {
        ReactDOM.unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
      }
      this.portal = null;
      this.node = null;

      const finalIsUnmounted =
        overrideIsUnmounted === undefined ? isUnmounted : overrideIsUnmounted;

      if (finalIsUnmounted !== true) {
        this.setState({ active: false });
      }
    };

    if (this.state.active) {
      if (this.props.beforeClose && this.node) {
        this.props.beforeClose(this.node, resetPortalState);
      } else {
        resetPortalState();
      }

      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }

  handleOutsideMouseClick(e: MouseEvent) {
    if (!this.state.active) {
      return;
    }

    const root = findDOMNode(this.portal);
    if ((root && root.contains(e.target as any)) || (e.button && e.button !== 0)) {
      return;
    }

    e.stopPropagation();
    this.closePortal();
  }

  handleKeydown(e: KeyboardEvent) {
    if (e.keyCode === KEYCODES.ESCAPE && this.state.active) {
      this.closePortal();
    }
  }

  renderPortal(props: ReactPortalProps) {
    if (!this.node) {
      this.node = document.createElement('div');
      document.body.appendChild(this.node);
    }

    let children = props.children;
    // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
    if (typeof props.children.type === 'function') {
      children = React.cloneElement(props.children, { closePortal: this.closePortal });
    }

    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      children,
      this.node,
      this.props.onUpdate
    );
  }

  render() {
    if (this.props.openByClickOn) {
      const nextProps = { onClick: this.handleWrapperClick } as any;
      return React.cloneElement(this.props.openByClickOn, nextProps);
    }
    return null;
  }
}
