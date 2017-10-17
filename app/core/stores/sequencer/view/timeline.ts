import { observable } from 'mobx'

import TimelineVector from 'core/models/timeline-vector'
console.log('🍕 timeline store', TimelineVector)

class TimelineView {
  @observable playheadPosition = 0
}

export default new TimelineView()
export { TimelineView }
