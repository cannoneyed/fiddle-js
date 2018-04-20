import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect'

import { ContextMenu } from '@blueprintjs/core';

import ClipContextMenu from 'features/ClipContextMenu';
import ClipView from 'components/Clip';

import { ClipSelect } from 'core/interactions/clip/select';
import { Clip as ClipModel } from 'core/models/clip';

import * as clipDragHandlers from 'core/interactions/clip/drag/handlers';

const styles = require('./styles.less');

interface Props {
  clip: ClipModel;
  clipSelect: ClipSelect;
}

interface State {
  isContextMenuOpen: boolean;
}

@observer
export class Clip extends React.Component<Props, State> {
  state = { isContextMenuOpen: false };

  handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { clip, clipSelect } = this.props;

    // If left-click, do delegate to context menus
    if (event.ctrlKey) {
      return this.showContextMenu(event);
    } else if (clip.isSelected) {
      // no op, still set up handlers below
    } else if (event.shiftKey) {
      clipSelect.selectClip(clip);
    } else {
      clipSelect.selectOnlyClip(clip);
    }

    clipDragHandlers.register(clip, event);
    return false;
  }

  renderContextMenu = () => {
    const { clip } = this.props;
    return <ClipContextMenu clipId={clip.id} />;
  };

  showContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    const props = { left: event.clientX, top: event.clientY };
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
        onMouseDown={this.handleMouseDown}
      >
        <ClipView clip={clip} />
      </div>
    );
  }
}

export default connect(Clip, 'clipSelect');
