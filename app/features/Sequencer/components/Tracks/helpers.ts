import { Track as TrackModel } from 'core/state/tree/models/track';

// TODO: Eventually handle different track heights
export class TrackVisibilityHelper {
  private topIndex = 0;
  private bottomIndex = 0;
  trackHeight = 0;

  computeVisibility(tracks: TrackModel[], top: number, bottom: number): void {
    this.topIndex = 0;
    this.bottomIndex = tracks.length;

    for (let i = 0; i < tracks.length; i++) {
      const trackTop = i * this.trackHeight;
      const trackBottom = i * this.trackHeight + this.trackHeight;
      if (trackBottom <= top) {
        this.topIndex = i;
      }
      if (trackTop <= bottom) {
        this.bottomIndex = i + 1;
      }
      if (trackTop > bottom) {
        this.bottomIndex = i + 1;
        break;
      }
    }
  }

  getIndices() {
    return { topIndex: this.topIndex, bottomIndex: this.bottomIndex };
  }
}
