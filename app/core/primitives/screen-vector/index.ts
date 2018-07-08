export class ScreenVector {
  constructor(public x: number = 0, public y: number = 0) {}

  subtract(nextPosition: ScreenVector) {
    const { x, y } = nextPosition;
    return new ScreenVector(this.x - x, this.y - y);
  }

  add(nextPosition: ScreenVector) {
    const { x, y } = nextPosition;
    return new ScreenVector(this.x + x, this.y + y);
  }
}
