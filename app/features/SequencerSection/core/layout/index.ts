import { observable } from 'mobx';

import { Dimensions } from 'core/interfaces';

// import { SequencerSectionCore } from 'features/SequencerSection/core';

export class SequencerSectionLayout {
  // constructor(private core: SequencerSectionCore) {}

  @observable
  dimensions: Dimensions = {
    height: 500,
    width: 1000,
  };
}
