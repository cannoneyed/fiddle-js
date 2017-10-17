export const prefixModule = 'prefixModule'

import { observable } from 'mobx'

import TimelineVector from 'core/models/timeline-vector'

class TimelineView {
  @observable playheadPosition = new TimelineVector()
}

export default new TimelineView()
export { TimelineView }
