import { Service } from 'libs/typedi';
import { action, observable } from 'mobx';
import { filterMethods } from 'utils/log-filter';

import { Dimensions } from 'core/interfaces';

@Service()
export default class __GraphEditorLayout {
  static mobxLoggerConfig = filterMethods('setDimensions');

  @observable
  dimensions: Dimensions;

  @action
  setDimensions(dimensions: Dimensions) {
    this.dimensions = dimensions;
  }
}
