import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import { ContextMenu } from '@blueprintjs/core';

import ClipContextMenu from 'features/ContextMenus/ClipContextMenu';
import ClipView from 'components/Clip';

import { ClipSelectInteraction } from 'core/interactions//clip/select';
import { Clip as ClipModel } from 'core/models/clip';

import * as clipDragHandlers from 'core/interactions//clip/drag/handlers';
import { SequencerPositionService } from 'core/services/sequencer/position';

const styles = require('./styles.less');

interface ExternalProps {
  clip: ClipModel;
}

interface InjectedProps {
  selectClip: () => void;
  selectOnlyClip: () => void;
  offsetX: number;
}

interface State {
  isContextMenuOpen: boolean;
}

@observer
export default class ClipWrapper extends React.Component<ExternalProps, {}> {
  clipSelect = Container.get(ClipSelectInteraction);
  sequencerPosition = Container.get(SequencerPositionService);

  render() {
    const { clip } = this.props;
    const nextProps = {
      ...this.props,
      offsetX: this.sequencerPosition.getOffsetX(clip.position),
      selectClip: () => this.clipSelect.selectClip(clip),
      selectOnlyClip: () => this.clipSelect.selectOnlyClip(clip),
    };
    return <Clip {...nextProps} />;
  }
}

@observer
export class Clip extends React.Component<ExternalProps & InjectedProps, State> {
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
      this.props.selectClip();
    } else {
      this.props.selectOnlyClip();
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
    const { clip, offsetX } = this.props;

    const clipWrapperStyle = {
      left: offsetX - 1,
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
