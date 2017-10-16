import sequencerDOMStore from 'core/stores/sequencer/dom'

export function moveDraggedClips(x: number, y: number) {
  const draggedClipsContainer = sequencerDOMStore.draggedClips
  if (!draggedClipsContainer) {
    return
  }

  draggedClipsContainer.style.left = `${x}px`
  draggedClipsContainer.style.top = `${y}px`
}
