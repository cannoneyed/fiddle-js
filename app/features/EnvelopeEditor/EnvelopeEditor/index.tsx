import * as React from 'react';
import { observer } from 'mobx-react';

interface Props {}

@observer
export class EnvelopeEditor extends React.Component<Props, {}> {
  render() {
    return <div>envelope</div>;
  }
}

export default EnvelopeEditor;
