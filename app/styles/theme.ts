import { px, percent } from './helpers';
import tinycolor from 'tinycolor2';

const Theme = {
  // Toolbar
  toolbarHeight: px(40),

  // Track Headers
  trackHeadersWidth: percent(20),

  // TracksTimelineSection
  tracksTimelineHeight: percent(20),

  // Timeline
  timelineHeight: px(30),

  // z-indices
  verticalGridZIndex: 10,
  tracksZIndex: 20,

  sectionDividers: {
    dividerSize: px(2),
    thumbSize: px(12),
  },

  colors: {
    lightGray: tinycolor({ r: 65, g: 67, b: 57 }),
    mediumGray: tinycolor({ r: 39, g: 40, b: 34 }),
    darkGray: tinycolor({ r: 39, g: 40, b: 34 }),
    darkerGray: tinycolor({ r: 37, g: 37, b: 38 }),
    black: tinycolor({ r: 30, g: 31, b: 28 }),
    sliderThumb: tinycolor({ r: 121, g: 121, b: 121, a: 0.4 }),
  },
};

export default Theme;
