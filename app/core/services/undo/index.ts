import { Service } from 'typedi';

import { ClipStore } from 'core/state/stores/clips';
import { UndoManager } from './manager';

@Service()
export class UndoService {
  constructor(private clipStore: ClipStore) {}

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
