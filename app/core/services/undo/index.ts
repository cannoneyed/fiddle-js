import { Service } from 'typedi';

import { UndoManager } from './manager';

import { ClipStore } from 'core';

@Service()
export default class __UndoService {
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
