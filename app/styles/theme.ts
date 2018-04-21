import { px, percent } from './helpers';

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
};

export default Theme;
