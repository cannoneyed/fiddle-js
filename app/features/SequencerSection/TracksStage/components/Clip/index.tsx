import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';
import { Rect } from 'react-konva';

import { ContextMenu } from '@blueprintjs/core';

import ClipContextMenu from 'features/ContextMenus/ClipContextMenu';

import { ClipSelectInteraction } from 'core/interactions//clip/select';
import { Clip as ClipModel } from 'core/models/clip';

import * as clipDragHandlers from 'core/interactions//clip/drag/handlers';
import { SequencerPositionService } from 'core/services/sequencer/position';

interface Props {
  clip: ClipModel;
  height: number;
}
interface InjectedProps {
  selectClip: () => void;
  selectOnlyClip: () => void;
  offsetX: number;
  width: number;
}
interface State {
  isContextMenuOpen: boolean;
}

const inject = injector<Props, InjectedProps>(props => {
  const { clip } = props;
  const clipSelect = Container.get(ClipSelectInteraction);
  const sequencerPosition = Container.get(SequencerPositionService);

  return {
    offsetX: sequencerPosition.getOffsetX(clip.position),
    selectClip: () => clipSelect.selectClip(clip),
    selectOnlyClip: () => clipSelect.selectOnlyClip(clip),
    width: sequencerPosition.getOffsetX(clip.length),
  };
});

interface WrappedEvent {
  evt: React.MouseEvent<HTMLElement>;
}

@observer
export class Clip extends React.Component<Props & InjectedProps, State> {
  state = { isContextMenuOpen: false };

  handleMouseDown = (event: WrappedEvent) => {
    const { evt } = event;
    evt.preventDefault();
    evt.stopPropagation();

    const { clip } = this.props;

    // If left-click, do delegate to context menus
    if (evt.ctrlKey) {
      return this.showContextMenu(evt);
    } else if (clip.isSelected) {
      // no op, still set up handlers below
    } else if (evt.shiftKey) {
      this.props.selectClip();
    } else {
      this.props.selectOnlyClip();
    }

    clipDragHandlers.register(clip, evt);
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
    const { height, offsetX, width } = this.props;

    return (
      <Rect
        x={offsetX}
        height={height}
        width={width}
        onMouseDown={this.handleMouseDown}
        stroke="red"
      />
    );
  }
}

export default inject(Clip);
