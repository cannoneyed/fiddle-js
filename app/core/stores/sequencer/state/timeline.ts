export const prefixModule = 'prefixModule'

import { observable } from 'mobx'

import TimelineVector from 'core/models/timeline-vector'

class TimelineState {
  @observable length = 64

  @observable playheadPosition = new TimelineVector()
  @observable dragToMarkerPosition = new TimelineVector()
}

export default new TimelineState()
export { TimelineState }
