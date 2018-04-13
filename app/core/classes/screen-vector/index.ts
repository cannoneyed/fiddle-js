export class ScreenVector {
  x: number
  y: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  subtract(nextPosition: ScreenVector) {
    const { x, y } = nextPosition
    return new ScreenVector(this.x - x, this.y - y)
  }

  add(nextPosition: ScreenVector) {
    const { x, y } = nextPosition
    return new ScreenVector(this.x + x, this.y + y)
  }
}
