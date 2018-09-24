import { Service } from 'libs/typedi';
import { action, observable } from 'mobx';
import { filterMethods } from 'utils/log-filter';
import { clamp } from 'lodash';

import { Coordinates, Dimensions } from 'core/interfaces';
import { Node as NodeModel } from 'core/models/graph/node';

@Service()
export default class __GraphEditorLayout {
  static mobxLoggerConfig = filterMethods('setDimensions');

  @observable
  dimensions: Dimensions;

  @action
  setDimensions(dimensions: Dimensions) {
    this.dimensions = dimensions;
  }

  @action
  setNodePosition = (node: NodeModel, position: Coordinates) => {
    const constrainedPosition = {
      x: clamp(position.x, 0, this.dimensions.width - node.dimensions.width),
      y: clamp(position.y, 0, this.dimensions.height - node.dimensions.height),
    };
    node.position.set(constrainedPosition);
  };
}
