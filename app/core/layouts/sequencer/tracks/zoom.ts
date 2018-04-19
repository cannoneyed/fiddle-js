import { Service } from 'typedi';
import { action } from 'mobx';

import { ZoomLevel } from 'core/models/zoom-level';

@Service()
export class ZoomLayout {
  horizontal = new ZoomLevel({
    min: 0.15,
  });

  vertical = new ZoomLevel({
    min: 0.15,
  });

  // Actions
  @action
  zoomInHorizontal = () => {
    this.horizontal.zoomIn();
  };

  @action
  zoomOutHorizontal = () => {
    this.horizontal.zoomOut();
  };
}
