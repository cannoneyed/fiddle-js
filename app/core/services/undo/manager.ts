import { action, observable, Lambda, autorun } from 'mobx';
import { load, save } from 'core/serialization/json/helpers';

export class UndoManager {
  @observable.shallow private undoStack: any[] = [];
  @observable.shallow private redoStack: any[] = [];

  private enabled = false;
  private currentState: any;
  private quit: Lambda;

  constructor(
    private state: any,
    private transactionCompleted?: (currentState: any, previousState: any) => void
  ) {
    this.quit = autorun(() => this.observe());
  }

  dispose() {
    this.quit();
  }

  private observe() {
    const newState = save(this.state);
    if (!this.enabled) {
      this.enabled = true;
    } else {
      this.redoStack.length = 0;
      this.undoStack.push(this.currentState);
    }

    const previousState = this.currentState;
    this.currentState = newState;

    if (this.transactionCompleted) {
      this.transactionCompleted(this.currentState, previousState);
    }
  }

  private swap(source: any[], target: any[]): void {
    var popped = source.pop();
    if (popped) {
      target.push(this.currentState);
      this.enabled = false;
      load(this.state, popped);
      this.currentState = popped;
    }
  }

  get canUndo() {
    return !!this.undoStack.length;
  }

  @action.bound
  undo() {
    this.swap(this.undoStack, this.redoStack);
  }

  get canRedo() {
    return !!this.redoStack.length;
  }

  @action.bound
  redo() {
    this.swap(this.redoStack, this.undoStack);
  }
}
