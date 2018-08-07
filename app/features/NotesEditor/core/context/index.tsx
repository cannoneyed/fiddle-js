import * as React from 'react';
import { observer } from 'mobx-react';
import { NotesEditorLayout } from './layout';

import { Notes } from 'core/models/notes';
import { Piano88 } from 'core/models/notes/key-layout';
import { SnapToGrid } from 'core/models/snap-to-grid';

export class NotesEditorCore {
  constructor(public notes: Notes) {}

  layout = new NotesEditorLayout();

  snapToGrid = new SnapToGrid();
  keyLayout = new Piano88();
}

const defaultNotes = new Notes();
const defaultCore = new NotesEditorCore(defaultNotes);

const { Provider, Consumer } = React.createContext(defaultCore);
export { Provider, Consumer };

export function withCore<P extends {}, I extends {}>(getNextProps: (props: P) => I) {
  type C = React.ComponentClass<P & I> | React.StatelessComponent<P & I>;
  return function(Component: C) {
    class Injected extends React.Component<P, {}> {
      render() {
        return (
          <Consumer>
            {core => {
              const nextProps = Object.assign({}, this.props, getNextProps(this.props), { core });
              return <Component {...nextProps} />;
            }}
          </Consumer>
        );
      }
    }

    return observer(Injected);
  };
}
