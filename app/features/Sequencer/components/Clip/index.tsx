import * as React from 'react';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';
import { Group, Rect } from 'react-konva';

// import { ContextMenu } from '@blueprintjs/core';

// import ClipContextMenu from 'features/Sequencer/components/ContextMenus/ClipContextMenu';
import EnvelopeSnip from 'components/Snips/Envelope';

import { Dimensions } from 'core/interfaces';

import { Clip as ClipModel } from 'core/state/tree/models/clip';
import { Envelope } from 'core/state/tree/models/envelope';

// import * as clipDragHandlers from 'features/Sequencer/core/interactions/clip-drag/handlers';
import { get, SequencerPositionService } from 'features/Sequencer/core';

interface Props {
  clip: ClipModel;
  height: number;
  isDragging?: boolean;
}
interface InjectedProps {
  // selectClip: () => void;
  // selectOnlyClip: () => void;
  offsetX: number;
  width: number;
}
interface State {
  isContextMenuOpen: boolean;
}

const inject = injector<Props, InjectedProps>(props => {
  const { clip } = props;
  // const clipSelect = get(ClipSelectInteraction);
  const sequencerPosition = get(SequencerPositionService);

  return {
    offsetX: sequencerPosition.getOffsetX(clip.position),
    // selectClip: () => clipSelect.selectClip(clip),
    // selectOnlyClip: () => clipSelect.selectOnlyClip(clip),
    width: sequencerPosition.getOffsetX(clip.length),
  };
});

@observer
export class Clip extends React.Component<Props & InjectedProps, State> {
  state = { isContextMenuOpen: false };

  // handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
  //   const { clip } = this.props;
  //   const { evt } = event;
  //   evt.preventDefault();
  //   evt.stopPropagation();

  //   // If left-click, do delegate to context menus
  //   if (evt.ctrlKey) {
  //     return this.showContextMenu(evt);
  //   } else if (clip.isSelected) {
  //     // no op, still set up handlers below
  //   } else if (evt.shiftKey) {
  //     this.props.selectClip();
  //   } else {
  //     this.props.selectOnlyClip();
  //   }

  //   clipDragHandlers.register(clip, evt);
  //   return false;
  // };

  // renderContextMenu = () => {
  //   const { clip } = this.props;
  //   return <ClipContextMenu clip={clip} />;
  // };

  // showContextMenu = (event: MouseEvent) => {
  //   const closeContextMenu = () => this.setState({ isContextMenuOpen: false });
  //   const props = { left: event.clientX, top: event.clientY, closeContextMenu };
  //   ContextMenu.show(this.renderContextMenu(), props);
  //   this.setState({ isContextMenuOpen: true });
  // };

  renderContents(dimensions: Dimensions) {
    const { clip } = this.props;
    const { mainOutputData } = clip.graph;

    if (mainOutputData instanceof Envelope) {
      return <EnvelopeSnip dimensions={dimensions} envelope={mainOutputData} />;
    } else {
      return null;
    }
  }

  render() {
    const { clip, height, isDragging, offsetX, width } = this.props;

    const opacity = isDragging ? 0.5 : 1;
    const borderWidth = clip.isSelected ? 2 : 1;
    const borderOffset = borderWidth / 2;

    const dimensions = {
      height: height - borderOffset,
      width: width - borderOffset,
    };

    return (
      <Group x={offsetX + borderOffset} y={borderOffset} {...dimensions}>
        {this.renderContents(dimensions)}
        <Rect
          {...dimensions}
          // onMouseDown={this.handleMouseDown}
          stroke={'#ccc'}
          strokeWidth={borderWidth}
          opacity={opacity}
        />
      </Group>
    );
  }
}

export default inject(hot(module)(Clip));
