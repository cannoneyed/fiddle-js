import * as React from 'react';
import { IReactionDisposer } from 'mobx';
import { inject, observer } from 'mobx-react';

import { Clip } from 'core/models/clip';

import { Clip as ClipView } from 'components/Clip';
import { Portal } from 'components/Portal';

import { observeClipsDrag } from 'observers/clips-drag';

import { clipDrag, ClipDrag } from 'core/interactions/clip/drag';
import { clipSelect, ClipSelect } from 'core/interactions/clip/select';
import { sequencerPortalDOM } from 'core/dom/sequencer/portal';

const styles = require('./styles.less');

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  clipDrag: ClipDrag;
  clipSelect: ClipSelect;
}

@inject(() => ({
  clipDrag,
  clipSelect,
}))
@observer
export class DraggedClips extends React.Component<ComponentProps, {}> {
  disposeObserver: IReactionDisposer;

  get injected() {
    return this.props as InjectedProps;
  }

  componentDidMount() {
    this.disposeObserver = observeClipsDrag();
  }

  componentWillUnmount() {
    this.disposeObserver();
  }

  renderDraggedClip = (clip: Clip) => {
    const { clipDrag } = this.injected;
    const relativePosition = clipDrag.getRelativePosition(clip);
    const { x, y } = relativePosition;

    const clipWrapperStyle = {
      top: y,
      left: x,
    };

    return (
      <div className={styles.draggedClipWrapper} style={clipWrapperStyle}>
        <ClipView clip={clip} isDragging />
      </div>
    );
  };

  render() {
    const { clipSelect } = this.injected;
    const { selectedClips } = clipSelect;

    const { draggedClipsRoot } = sequencerPortalDOM;
    if (!draggedClipsRoot) {
      return null;
    }

    return (
      <Portal domNode={draggedClipsRoot}>
        <div className={styles.draggedClipsContainer} id="draggedClips">
          {selectedClips.map(this.renderDraggedClip)}
        </div>
      </Portal>
    );
  }
}
