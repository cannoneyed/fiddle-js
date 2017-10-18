// A register for sequencer DOM elements (for consistent querying)
class SequencerDOMStore {
  get draggedClips(): HTMLElement | null {
    return document.getElementById('draggedClips')
  }

  get minimap(): HTMLElement | null {
    return document.getElementById('minimap')
  }

  get minimapScroll(): HTMLElement | null {
    return document.getElementById('minimapScroll')
  }

  get sequencerPage(): HTMLElement | null {
    return document.getElementById('sequencerPage')
  }

  get tracksArea(): HTMLElement | null {
    return document.getElementById('tracksArea')
  }

  get tracksGutter(): HTMLElement | null {
    return document.getElementById('tracksGutter')
  }

  get timeline(): HTMLElement | null {
    return document.getElementById('timeline')
  }

  getTrackScrollElements = () => {
    const filter = (input: Array<HTMLElement | null>): HTMLElement[] => {
      return input.filter(element => element !== null) as HTMLElement[]
    }

    const x = filter([this.timeline])
    const y = filter([this.tracksGutter])
    const xy = filter([this.tracksArea])

    return { x, y, xy }
  }
}

export default new SequencerDOMStore()
export { SequencerDOMStore }
