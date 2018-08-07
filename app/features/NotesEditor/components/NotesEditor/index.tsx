import * as React from 'react';
import { observer } from 'mobx-react';

import { Layout } from 'features/NotesEditor/components/Layout';
import { NotesEditorCore, Provider } from 'features/NotesEditor/core/context';

interface Props {
  core: NotesEditorCore;
}

@observer
export class NotesEditor extends React.Component<Props> {
  render() {
    return (
      <Provider value={this.props.core}>
        <Layout />
      </Provider>
    );
  }
}

export default NotesEditor;
