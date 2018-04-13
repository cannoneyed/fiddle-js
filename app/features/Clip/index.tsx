import * as React from 'react';
// import autobind from 'autobind-decorator'
import { observer } from 'mobx-react';
import { ContextMenu } from '@blueprintjs/core';

import { ClipContextMenu } from 'features/ClipContextMenu';
import { Clip as ClipView } from 'components/Clip';

import { Clip as ClipModel } from 'core/models/clip';
import { handleClipMouseDown } from 'interactions/clip/mouse';

const styles = require('./styles.less');

interface Props {
  clip: ClipModel;
}

interface State {
  isContextMenuOpen: boolean;
}

@observer
export class Clip extends React.Component<Props, State> {
  state = { isContextMenuOpen: false };

  renderContextMenu = () => {
    const { clip } = this.props;
    return <ClipContextMenu clipId={clip.id} />;
  };

  showContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const props = { left: e.clientX, top: e.clientY };
    const callback = () => this.setState({ isContextMenuOpen: false });
    ContextMenu.show(this.renderContextMenu(), props, callback);
    this.setState({ isContextMenuOpen: true });
  };

  render() {
    const { clip } = this.props;

    const clipWrapperStyle = {
      left: clip.offsetX - 1,
    };

    return (
      <div
        className={styles.clipContainer}
        style={clipWrapperStyle}
        onContextMenu={this.showContextMenu}
      >
        <ClipView clip={clip} onMouseDown={e => handleClipMouseDown(clip, e)} />
      </div>
    );
  }
}
