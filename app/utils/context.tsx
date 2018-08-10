import * as React from 'react';
import { Observer } from 'mobx-react';

export function createMandatoryContext<T>(defaultValue?: T) {
  let context = React.createContext<T>((undefined as any) as T);
  let consumer: React.Consumer<T> = props => {
    return (
      <context.Consumer>
        {state =>
          state ? props.children(state) : <span style={{ color: 'red' }}>Missing Context</span>
        }
      </context.Consumer>
    );
  };
  return {
    Provider: context.Provider,
    Consumer: consumer,
  };
}

export function makeCoreInjector<T>(Consumer: React.Consumer<T>) {
  return function makeInjector<P extends {}, I extends {}>(getNextProps: (props: P, core: T) => I) {
    return injectCore(Consumer, getNextProps);
  };
}

export function injectCore<P extends {}, I extends {}, T>(
  Consumer: React.Consumer<T>,
  getNextProps: (props: P, core: T) => I
) {
  type C = React.ComponentClass<P & I> | React.StatelessComponent<P & I>;
  return function(Component: C) {
    class Injected extends React.Component<P, {}> {
      render() {
        return (
          <Consumer>
            {core => (
              <Observer>
                {() => {
                  const nextProps = Object.assign({}, this.props, getNextProps(this.props, core));
                  return <Component {...nextProps} />;
                }}
              </Observer>
            )}
          </Consumer>
        );
      }
    }

    return Injected;
  };
}
