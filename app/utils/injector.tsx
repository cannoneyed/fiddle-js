import * as React from 'react';
import { observer } from 'mobx-react';
import { hot } from 'react-hot-loader';

export function injector<P extends {}, I extends {}>(getNextProps: (props: P) => I) {
  type C = React.ComponentClass<P & I> | React.StatelessComponent<P & I>;
  return function(Component: C) {
    @observer
    class Injected extends React.Component<P, {}> {
      render() {
        const nextProps = Object.assign({}, this.props, getNextProps(this.props));
        return <Component {...nextProps} />;
      }
    }

    return Injected;
  };
}

export function wrap<V>(value: V) {
  return () => value;
}

export { hot };
