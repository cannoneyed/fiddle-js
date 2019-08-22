// import { Inject, Service } from 'libs/typedi';
// import { action, autorun, observable } from 'mobx';
// import { ipcRenderer } from 'electron';

// import { SnapToGrid } from 'core/models/snap-to-grid';
// import { TimelineVector } from 'core/primitives/timeline-vector';
// import { SequencerPositionService } from 'features/Sequencer/core';

// @Service()
// export default class SequencerState {
//   @Inject(type => SequencerPositionService)
//   sequencerPositionService: SequencerPositionService;

//   snapToGrid = new SnapToGrid();

//   @observable
//   sliderValue = 50;

//   @observable
//   playheadPosition = new TimelineVector();

//   @action
//   setPlayheadPosition = (nextPosition: TimelineVector) => {
//     this.playheadPosition = nextPosition;
//   };

//   @action
//   setSliderValue = (value: number) => {
//     this.sliderValue = value;
//   };

//   constructor() {
//     autorun(() => {
//       ipcRenderer.send('sliderValue', this.sliderValue);
//     });
//   }
// }

// import { model, Model, modelAction, prop, objectMap, ObjectMap } from 'mobx-keystone';
// import { SnapToGrid } from 'core/state/tree/snap-to-grid';

// @model('fiddle/features/sequencer/state')
// export class SequencerState extends Model({
//   snapToGrid: prop<SnapToGrid>(() => new SnapToGrid({})),
// }) {
//   getClips = () => {
//     return Array.from(this.clips.values());
//   };

//   getClipById = (clipId: string | null): Clip | null => {
//     const clip = clipId ? this.clips.get(clipId) : null;
//     return clip || null;
//   };

//   @modelAction
//   createClip = (params: ClipParams) => {
//     const clip = new Clip(params);
//     this.clips.set(clip.id, clip);
//     return clip;
//   };

//   @modelAction
//   deleteClip = (clip: Clip) => {
//     this.clips.delete(clip.id);
//   };

//   @modelAction
//   deleteClips = (clips: Clip[]) => {
//     clips.forEach(clip => {
//       this.clips.delete(clip.id);
//     });
//   };

//   @modelAction
//   deleteClipsByTrackId = (trackId: string) => {
//     this.getClips().forEach((clip: Clip) => {
//       if (clip.trackId === trackId) {
//         this.clips.delete(clip.id);
//       }
//     });
//   };
// }
