import * as React from 'react';

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

export function withCore<P extends {}, T>(Consumer: React.Consumer<T>) {
  interface Core {
    core: T;
  }
  type C = React.ComponentClass<P & Core> | React.StatelessComponent<P & Core>;
  return function(Component: C) {
    class Injected extends React.Component<P, {}> {
      render() {
        return (
          <Consumer>
            {core => {
              const nextProps = Object.assign({}, this.props, { core });
              return <Component {...nextProps} />;
            }}
          </Consumer>
        );
      }
    }

    return Injected;
  };
}
