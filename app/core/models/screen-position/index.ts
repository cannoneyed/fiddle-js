class ScreenPosition {
  x: number
  y: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  subtract(nextPosition: ScreenPosition) {
    const { x, y } = nextPosition
    return new ScreenPosition(this.x - x, this.y - y)
  }

  add(nextPosition: ScreenPosition) {
    const { x, y } = nextPosition
    return new ScreenPosition(this.x + x, this.y + y)
  }
}

export default ScreenPosition
