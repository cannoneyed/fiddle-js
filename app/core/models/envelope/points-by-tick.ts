import { SortedMap } from 'libs/sorted-map';
import { Point } from './point';

export type PointEntry = Point | Point[];
export class PointsByTick {
  private map = new SortedMap<number, Point | Point[]>();

  add(point: Point) {
    const ticks = point.position.absoluteTicks;
    const existing = this.map.get(ticks);
    if (existing === undefined) {
      this.map.set(ticks, point);
    } else if (existing instanceof Point) {
      this.map.set(ticks, [existing, point]);
    }
  }

  remove(point: Point) {
    const ticks = point.position.absoluteTicks;
    const existing = this.map.get(ticks);
    if (existing instanceof Point) {
      this.map.delete(ticks);
    } else if (existing instanceof Array) {
      const other = existing.filter(p => p !== point)[0];
      this.map.set(ticks, other);
    }
  }

  points(): PointEntry[] {
    return this.map.values();
  }

  ticks(): number[] {
    return this.map.keys();
  }
}
