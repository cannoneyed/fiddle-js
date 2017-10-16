// A register for sequencer DOM elements (for consistent querying)
class SequencerPortalDOMStore {
  get draggedClipsRoot(): HTMLElement | null {
    return document.getElementById('draggedClipsRoot')
  }
}

export default new SequencerPortalDOMStore()
export { SequencerPortalDOMStore }
