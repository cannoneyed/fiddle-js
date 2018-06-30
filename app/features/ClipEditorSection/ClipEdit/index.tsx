import * as React from 'react';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Clip } from 'core/models/clip';

export interface Props {
  clip: Clip;
}
export interface InjectedProps {}

const inject = injector<Props, InjectedProps>(props => {
  return {};
});

@observer
export class ClipEdit extends React.Component<Props & InjectedProps, {}> {
  render() {
    return <div>YO</div>;
  }
}

export default inject(ClipEdit);
