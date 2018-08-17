import { Inject, Service } from 'typedi';

import { GridLayoutBase } from 'core/state/layouts/shared/grid';

import { ClipEditorTimeline, ClipEditorZoom } from 'features/ClipEditorSection/core';

@Service()
export default class __GridLayout extends GridLayoutBase {
  @Inject(_ => ClipEditorTimeline)
  timelineLayout: ClipEditorTimeline;

  @Inject(_ => ClipEditorZoom)
  zoomLayout: ClipEditorZoom;
}
