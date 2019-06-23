import { Inject, Service } from 'libs/typedi';
import { action, autorun, observable } from 'mobx';
import { ipcRenderer } from 'electron';

import { SnapToGrid } from 'core/models/snap-to-grid';
import { TimelineVector } from 'core/primitives/timeline-vector';
import { SequencerPositionService } from 'features/Sequencer/core';

@Service()
export default class SequencerState {
  @Inject(type => SequencerPositionService)
  sequencerPositionService: SequencerPositionService;

  snapToGrid = new SnapToGrid();

  @observable
  sliderValue = 50;

  @observable
  playheadPosition = new TimelineVector();

  @action
  setPlayheadPosition = (nextPosition: TimelineVector) => {
    this.playheadPosition = nextPosition;
  };

  @action
  setSliderValue = (value: number) => {
    this.sliderValue = value;
  };

  constructor() {
    autorun(() => {
      ipcRenderer.send('sliderValue', this.sliderValue);
    });
  }
}
