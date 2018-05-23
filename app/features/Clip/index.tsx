import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import { ContextMenu } from '@blueprintjs/core';

import ClipContextMenu from 'features/ClipContextMenu';
import ClipView from 'components/Clip';

import { Clip as ClipModel } from 'core/models/clip';

import { ClipSelect } from 'core/interactions/clip/select';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';
import * as clipDragHandlers from 'core/interactions/clip/drag/handlers';

const styles = require('./styles.less');

interface Props {
  clip: ClipModel;
}

interface State {
  isContextMenuOpen: boolean;
}

@observer
export default class Clip extends React.Component<Props, State> {
  clipSelect = Container.get(ClipSelect);
  tracksSectionLayout = Container.get(TracksSectionLayout);

  state = { isContextMenuOpen: false };

  handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { clip } = this.props;

    // If left-click, do delegate to context menus
    if (event.ctrlKey) {
      return this.showContextMenu(event);
    } else if (clip.isSelected) {
      // no op, still set up handlers below
    } else if (event.shiftKey) {
      this.clipSelect.selectClip(clip);
    } else {
      this.clipSelect.selectOnlyClip(clip);
    }

    clipDragHandlers.register(clip, event);
    return false;
  };

  renderContextMenu = () => {
    const { clip } = this.props;
    return <ClipContextMenu clip={clip} />;
  };

  showContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    const closeContextMenu = () => this.setState({ isContextMenuOpen: false });
    const props = { left: event.clientX, top: event.clientY, closeContextMenu };
    ContextMenu.show(this.renderContextMenu(), props);
    this.setState({ isContextMenuOpen: true });
  };

  render() {
    const { clip } = this.props;

    const clipWrapperStyle = {
      left: clip.offsetX - 1,
    };

    const height = this.tracksSectionLayout.tracks.trackHeight;

    return (
      <div
        className={styles.clipContainer}
        style={clipWrapperStyle}
        onMouseDown={this.handleMouseDown}
      >
        <ClipView clip={clip} height={height} />
      </div>
    );
  }
}
