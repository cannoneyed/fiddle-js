// A register for sequencer DOM elements (for consistent querying)
export class SequencerPortalDOM {
  get draggedClipsRoot(): HTMLElement | null {
    return document.getElementById('draggedClipsRoot');
  }
}

export const sequencerPortalDOM = new SequencerPortalDOM();
