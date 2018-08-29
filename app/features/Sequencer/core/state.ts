import { Service } from 'libs/typedi';
import { action, autorun, observable } from 'mobx';
import { ipcRenderer } from 'electron';

import { SnapToGrid } from 'core/models/snap-to-grid';

@Service()
export default class __SequencerState {
  snapToGrid = new SnapToGrid();

  @observable
  sliderValue = 50;

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
