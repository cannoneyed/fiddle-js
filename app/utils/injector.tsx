import * as React from 'react';
import { observer } from 'mobx-react';

export function injector<P extends {}, I extends {}>(getNextProps: (props: P) => I) {
  type C = React.ComponentClass<P & I> | React.StatelessComponent<P & I>;
  return function(Component: C) {
    class Injected extends React.Component<P, {}> {
      render() {
        const nextProps = Object.assign({}, this.props, getNextProps(this.props));
        return <Component {...nextProps} />;
      }
    }

    return observer(Injected);
  };
}

export function wrap<V>(value: V) {
  return () => value;
}
