import { Clip as ClipModel } from 'core/models/clip';

import { get, SequencerPositionService } from 'features/SequencerSection/core';

// TODO: Eventually handle different track heights
export class ClipVisibilityHelper {
  sequencerPositionService = get(SequencerPositionService);

  computeVisibility(clips: ClipModel[], left: number, right: number) {
    return clips.filter(clip => {
      const clipLeft = this.sequencerPositionService.getOffsetX(clip.position);
      const size = this.sequencerPositionService.getOffsetX(clip.length);
      const clipRight = left + size;

      if (clipRight >= left && clipLeft <= right) {
        return true;
      }
      return false;
    });
  }
}
