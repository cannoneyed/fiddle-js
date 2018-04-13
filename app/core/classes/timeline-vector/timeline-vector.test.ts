import { Fraction } from 'core/classes/fraction'
import { TimelineVector } from 'core/classes/timeline-vector'

describe('TimelineVector class', () => {
  it('constructs a timeline vector with defaults', () => {
    const position = new TimelineVector()
    expect(position.bar).toEqual(0)
    expect(position.beats).toBeInstanceOf(Fraction)
  })

  it('constructs a timeline vector with parameters', () => {
    const bar = 8
    const beats = new Fraction(1, 2)
    const ticks = 19

    const position = new TimelineVector(bar, beats, ticks)
    expect(position.bar).toEqual(bar)
    expect(position.beats).toEqual(beats)
    expect(position.ticks).toEqual(ticks)
  })

  it('adds timeline vectors correctly', () => {
    let a, b, sum
    // Sums beats to whole beats
    a = new TimelineVector(4, new Fraction(1, 2))
    b = new TimelineVector(4, new Fraction(1, 2))
    sum = a.add(b)
    expect(sum.bar).toEqual(9)
    expect(sum.beats.numerator).toEqual(0)

    // Sums beats
    a = new TimelineVector(4, new Fraction(1, 2))
    b = new TimelineVector(4, new Fraction(1, 4))
    sum = a.add(b)
    expect(sum.bar).toEqual(8)
    expect(sum.beats.numerator).toEqual(3)
    expect(sum.beats.denominator).toEqual(4)

    // Sums beats with overflow bar
    a = new TimelineVector(1, new Fraction(10, 16))
    b = new TimelineVector(1, new Fraction(10, 16))
    sum = a.add(b)
    expect(sum.bar).toEqual(3)
    expect(sum.beats.numerator).toEqual(1)
    expect(sum.beats.denominator).toEqual(4)

    // Adds negative TimelineVectors
    a = new TimelineVector(1, new Fraction(1, 2))
    b = new TimelineVector(0, new Fraction(-1, 4))
    sum = a.add(b)
    expect(sum.bar).toEqual(1)
    expect(sum.beats.numerator).toEqual(1)
    expect(sum.beats.denominator).toEqual(4)
  })

  it('subtracts timeline vectors correctly', () => {
    let a, b, sum
    // Sums beats to whole beats
    a = new TimelineVector(4, new Fraction(1, 2))
    b = new TimelineVector(4, new Fraction(1, 2))
    sum = a.subtract(b)
    expect(sum.bar).toEqual(0)
    expect(sum.beats.numerator).toEqual(0)

    // // Sums beats
    a = new TimelineVector(4, new Fraction(1, 2))
    b = new TimelineVector(4, new Fraction(1, 4))
    sum = a.subtract(b)
    expect(sum.bar).toEqual(0)
    expect(sum.beats.numerator).toEqual(1)
    expect(sum.beats.denominator).toEqual(4)

    // Sums beats with overflow bar
    a = new TimelineVector(2, new Fraction(1, 4))
    b = new TimelineVector(1, new Fraction(3, 4))
    sum = a.subtract(b)
    expect(sum.bar).toEqual(0)
    expect(sum.beats.numerator).toEqual(1)
    expect(sum.beats.denominator).toEqual(2)

    // Adds negative TimelineVectors
    a = new TimelineVector(1, new Fraction(1, 2))
    b = new TimelineVector(0, new Fraction(-1, 4))
    sum = a.subtract(b)
    expect(sum.bar).toEqual(1)
    expect(sum.beats.numerator).toEqual(3)
    expect(sum.beats.denominator).toEqual(4)
  })

  it('has a makeNegative method', () => {
    const a = new TimelineVector(1, new Fraction(1, 2))
    const b = a.makeNegative()
    expect(b.bar).toEqual(-1)
    expect(b.beats.numerator).toEqual(-1)
    expect(b.beats.denominator).toEqual(2)
  })
})
