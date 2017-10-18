import { computed } from 'mobx'
import * as defaults from 'defaults/view'

import Fraction from 'core/classes/fraction'

import timeline from 'core/stores/sequencer/state/timeline'

import zoom from './zoom'

const MIN_DIVISION_WIDTH = 40

class GridView {
  barsPerGridSegment = 1

  // Computed Fields
  @computed
  get barWidth() {
    return zoom.level.horizontal * defaults.barWidth
  }

  @computed
  get gridCount() {
    return timeline.length
  }

  @computed
  get gridSegmentWidth() {
    return this.barWidth * this.barsPerGridSegment
  }

  // V2 Interface for divisions / subdivisions
  @computed
  get division() {
    let division = new Fraction(1, 1)
    let barWidth = this.barWidth

    // If the current bar width is greater than minimum divison width, we need to increase our division size
    if (barWidth < MIN_DIVISION_WIDTH) {
      const multiple = new Fraction(2, 1)
      while (barWidth < MIN_DIVISION_WIDTH) {
        const nextDivision = division.multiply(multiple)
        barWidth = nextDivision.multiplyScalar(barWidth)
        division = nextDivision
      }
    } else if (barWidth > MIN_DIVISION_WIDTH) {
      const multiple = new Fraction(1, 2)
      while (barWidth > MIN_DIVISION_WIDTH) {
        const nextDivision = division.multiply(multiple)
        barWidth = nextDivision.multiplyScalar(barWidth)
        division = nextDivision
      }
    }

    return division
  }

  @computed
  get nDivisions() {
    return this.division.inverse().multiplyScalar(timeline.length)
  }

  @computed
  get divisionWidth() {
    return this.division.multiplyScalar(this.barWidth)
  }
}

export default new GridView()
export { GridView }
