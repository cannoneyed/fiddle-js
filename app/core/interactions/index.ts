import ClipDragInteraction from './clips/drag'
import ClipMouseInteraction from './clips/mouse'
import ClipSelectInteraction from './clips/select'

export const clipDragInteraction = ClipDragInteraction
export const clipMouseInteraction = ClipMouseInteraction
export const clipSelectInteraction = ClipSelectInteraction
export const clipInteraction = {
  drag: ClipDragInteraction,
  mouse: ClipMouseInteraction,
  select: ClipSelectInteraction,
}

import TrackMouseInteraction from './tracks/mouse'

export const trackMouseInteraction = TrackMouseInteraction
export const trackInteraction = {
  mouse: TrackMouseInteraction,
}
