import { Envelope, Point } from 'core/models/envelope';

export abstract class Operator {
  nInputs = 1;
  nOutputs = 1;

  protected inputTypes: Set<any>;
  label: string;
}

export class MultiplyOperator extends Operator {
  nInputs = 2;
  inputTypes = new Set([Envelope]);
  label = 'multiply';

  private arrangeByLength(inputA: Envelope, inputB: Envelope) {
    const larger = inputA.length.gte(inputB.length) ? inputA : inputB;
    const smaller = larger === inputB ? inputA : inputB;
    return { larger, smaller };
  }

  private getPointsByTick(inputA: Envelope, inputB: Envelope) {
    type pointByTick = { point: Point; ticks: number; source: Envelope };
    const pointsByTick: pointByTick[] = [];

    const processEnvelope = (envelope: Envelope) => {
      for (const point of envelope.points) {
        pointsByTick.push({ point, ticks: point.position.absoluteTicks, source: envelope });
      }
    };

    processEnvelope(inputA);
    processEnvelope(inputB);

    return pointsByTick.sort((a, b) => a.ticks - b.ticks);
  }

  operate(inputs: Envelope[]): Envelope | null {
    const [inputA, inputB] = inputs;
    if (!inputA) return null;
    if (!inputB) return inputA;

    const { larger, smaller } = this.arrangeByLength(inputA, inputB);
    const output = new Envelope(larger.length);
    output.maximum = larger.maximum * smaller.maximum;
    output.minimum = larger.minimum * smaller.minimum;

    const pointsByTick = this.getPointsByTick(inputA, inputB);

    console.log(pointsByTick);

    return new Envelope();
  }
}
