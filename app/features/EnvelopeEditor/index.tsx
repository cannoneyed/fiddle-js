import * as React from 'react';
import { observer } from 'mobx-react';

import { EnvelopeEditorCore, Provider } from 'features/EnvelopeEditor/core';

import Layout from 'features/EnvelopeEditor/components/Layout';

interface Props {
  core: EnvelopeEditorCore;
}

@observer
export class EnvelopeEditor extends React.Component<Props> {
  render() {
    return (
      <Provider value={this.props.core}>
        <Layout />
      </Provider>
    );
  }
}

export default EnvelopeEditor;
