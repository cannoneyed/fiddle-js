import { action, computed } from 'mobx';
import * as defaults from 'defaults/view';

import { Dimensions } from 'core/interfaces';
import { Fraction } from 'core/primitives/fraction';
import { TimelineVector } from 'core/primitives/timeline-vector';
import { ZoomLevel } from 'core/models/zoom-level';

export interface ZoomLayout {
  horizontal: ZoomLevel;
}

export interface TimelineLayout {
  length: TimelineVector;
}

const MIN_DIVISION_WIDTH = 15;
const MAX_DIVISION_WIDTH = 25;

export class GridLayoutBase {
  protected timelineLayout: TimelineLayout;
  protected zoomLayout: ZoomLayout;

  barsPerGridSegment = 1;

  // Computed Fields
  @computed
  get barWidth() {
    const x = Math.round(this.zoomLayout.horizontal.level * defaults.barWidth);
    console.log(x);
    return x;
  }

  @computed
  get gridCount(): number {
    return this.timelineLayout.length.primary;
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
  get nDivisions(): number {
    return this.division.inverse().multiplyScalar(this.timelineLayout.length.primary);
  }

  @computed
  get divisionWidth() {
    return this.division.multiplyScalar(this.barWidth);
  }

  @action
  computeInitialGrid(length: TimelineVector, dimensions: Dimensions) {
    const { width } = dimensions;
    // TODO: Figure out actual bars w/ minor divisions here.
    const bars = length.primary;
    const barWidth = width / bars;

    const zoomHorizontal = barWidth / defaults.barWidth;
    this.zoomLayout.horizontal.level = zoomHorizontal;
  }
}
