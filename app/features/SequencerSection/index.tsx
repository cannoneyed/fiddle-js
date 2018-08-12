import * as React from 'react';
import { observer } from 'mobx-react';

import Layout from 'features/SequencerSection/components/Layout';

export interface Props {}

@observer
export class SequencerSection extends React.Component<Props> {
  render() {
    return <Layout />;
  }
}

export default SequencerSection;
