import * as React from 'react';
import { observer } from 'mobx-react';

interface Props {}

@observer
export class Empty extends React.Component<Props, {}> {
  render() {
    return <div />;
  }
}

export default Empty;
