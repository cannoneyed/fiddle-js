import { Container, Service } from 'typedi';
import { computed } from 'mobx';
import * as defaults from 'defaults/view';

import { Fraction } from 'core/primitives/fraction';

import { timelineState } from 'core/stores/sequencer/timeline';

import { ZoomLayout } from './zoom';

const MIN_DIVISION_WIDTH = 15;
const MAX_DIVISION_WIDTH = 25;

@Service()
export class GridLayout {
  zoomLayout = Container.get(ZoomLayout);

  barsPerGridSegment = 1;

  // Computed Fields
  @computed
  get barWidth() {
    return Math.round(this.zoomLayout.horizontal.level * defaults.barWidth);
  }

  @computed
  get gridCount() {
    return timelineState.length;
  }

  @computed
  get gridSegmentWidth() {
    return this.barWidth * this.barsPerGridSegment;
  }

  // V2 Interface for divisions / subdivisions
  @computed
  get division() {
    let division = new Fraction(1, 1);
    let divisionWidth = this.barWidth;

    // If the current bar width is greater than minimum divison width, we need to increase our division size
    if (divisionWidth < MIN_DIVISION_WIDTH) {
      const multiple = new Fraction(2, 1);
      while (divisionWidth < MIN_DIVISION_WIDTH) {
        const nextDivision = division.multiply(multiple);
        divisionWidth = nextDivision.multiplyScalar(this.barWidth);
        division = nextDivision;
      }
    } else if (divisionWidth > MAX_DIVISION_WIDTH) {
      const multiple = new Fraction(1, 2);
      while (divisionWidth > MAX_DIVISION_WIDTH) {
        const nextDivision = division.multiply(multiple);
        divisionWidth = nextDivision.multiplyScalar(this.barWidth);
        division = nextDivision;
      }
    }

    return division;
  }

  @computed
  get nDivisions() {
    return this.division.inverse().multiplyScalar(timelineState.length);
  }

  @computed
  get divisionWidth() {
    return this.division.multiplyScalar(this.barWidth);
  }
}

export const gridLayout = new GridLayout();
