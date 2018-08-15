import * as React from 'react';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';
import { Rect as KonvaRect } from 'konva';
import { Rect } from 'react-konva';
import { KonvaEvent } from 'utils/konva';

import { ContextMenu } from '@blueprintjs/core';

import ClipContextMenu from 'features/SequencerSection/components/ContextMenus/ClipContextMenu';

import { Clip as ClipModel } from 'core/models/clip';

import { ClipSelectInteraction } from 'features/SequencerSection/core/interactions/clip-select';
import * as clipDragHandlers from 'features/SequencerSection/core/interactions/clip-drag/handlers';
import { SequencerPositionService } from 'features/SequencerSection/core/services/sequencer-position';
import { get } from 'features/SequencerSection/core';

interface Props {
  clip: ClipModel;
  height: number;
  isDragging?: boolean;
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
  const clipSelect = get(ClipSelectInteraction);
  const sequencerPosition = get(SequencerPositionService);

  return {
    offsetX: sequencerPosition.getOffsetX(clip.position),
    selectClip: () => clipSelect.selectClip(clip),
    selectOnlyClip: () => clipSelect.selectOnlyClip(clip),
    width: sequencerPosition.getOffsetX(clip.length),
  };
});

@observer
export class Clip extends React.Component<Props & InjectedProps, State> {
  state = { isContextMenuOpen: false };

  handleMouseDown = (event: KonvaEvent<MouseEvent, KonvaRect>) => {
    const { clip } = this.props;
    const { evt } = event;
    evt.preventDefault();
    evt.stopPropagation();

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

  showContextMenu = (event: MouseEvent) => {
    const closeContextMenu = () => this.setState({ isContextMenuOpen: false });
    const props = { left: event.clientX, top: event.clientY, closeContextMenu };
    ContextMenu.show(this.renderContextMenu(), props);
    this.setState({ isContextMenuOpen: true });
  };

  render() {
    const { clip, height, isDragging, offsetX, width } = this.props;

    const opacity = isDragging ? 0.5 : 1;
    const fill = clip.isSelected ? 'purple' : 'gray';

    const borderWidth = 2;
    const borderOffset = borderWidth / 2;

    return (
      <Rect
        x={offsetX + borderOffset}
        y={borderOffset}
        height={height - borderOffset}
        width={width - borderOffset}
        onMouseDown={this.handleMouseDown}
        stroke={'#ccc'}
        strokeWidth={2}
        opacity={opacity}
        fill={fill}
      />
    );
  }
}

export default inject(Clip);
