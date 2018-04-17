import * as React from 'react';
import { IReactionDisposer } from 'mobx';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import { Clip } from 'core/models/clip';

import ClipView from 'components/Clip';
import Portal from 'components/Portal';

import { observeClipsDrag } from 'core/observers/clips-drag';

import { ClipDragInteraction } from 'core/interactions/clip/drag';
import { ClipSelect } from 'core/interactions/clip/select';
import { sequencerPortalDOM } from 'core/dom/sequencer/portal';

const styles = require('./styles.less');

interface Props {
  clipDragInteraction: ClipDragInteraction;
  clipSelect: ClipSelect;
}

@observer
export class DraggedClips extends React.Component<Props, {}> {
  disposeObserver: IReactionDisposer;

  componentDidMount() {
    this.disposeObserver = observeClipsDrag();
  }

  componentWillUnmount() {
    this.disposeObserver();
  }

  renderDraggedClip = (clip: Clip) => {
    const { clipDragInteraction } = this.props;
    const relativePosition = clipDragInteraction.getRelativePosition(clip);
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
    const { clipSelect } = this.props;
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

export default connect(DraggedClips, 'clipDragInteraction', 'clipSelect');
