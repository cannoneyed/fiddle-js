import { Inject, Service } from 'typedi';

import { ClipStore } from 'core/stores/clips';
import { TrackStore } from 'core/stores/tracks';
import { UndoManager } from './manager';

@Service()
export class UndoService {
  @Inject(type => ClipStore)
  clipStore: ClipStore;

  @Inject(type => TrackStore)
  trackStore: TrackStore;

  private undoManager: UndoManager;

  initialize() {
    this.undoManager = new UndoManager(this.clipStore);
  }

  undo() {
    this.undoManager.undo();
  }

  redo() {
    this.undoManager.redo();
  }
}
