import { Envelope } from 'core/models/envelope';
import { Data } from 'core/models/graph';

import { binaryOperate } from './binary-operate';

export abstract class Operator {
  nInputs = 1;
  nOutputs = 1;

  protected inputTypes: Set<any>;
  label: string;

  abstract operate(inputs: Data[]): Data;
}

export class AddOperator extends Operator {
  nInputs = 2;
  inputTypes = new Set([Envelope]);
  label = 'add';

  operation = (a: number, b: number) => {
    return a + b;
  };

  operate(inputs: Envelope[]): Envelope | null {
    return binaryOperate(inputs, this.operation);
  }
}

export class MultiplyOperator extends Operator {
  nInputs = 2;
  inputTypes = new Set([Envelope]);
  label = 'multiply';

  operation = (a: number, b: number) => {
    return a * b;
  };

  operate(inputs: Envelope[]): Envelope | null {
    return binaryOperate(inputs, this.operation);
  }
}
