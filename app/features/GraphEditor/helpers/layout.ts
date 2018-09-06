import { Node } from 'core/models/graph';

export const IO_PADDING = 10;
export const IO_OFFSET = 15;
export const IO_RADIUS = 5;

export const dimensions = {
  width: 100,
  height: 25,
};

export const getOutputPosition = (from: Node, index: number) => {
  const offsetY = 0;
  const offsetX = IO_OFFSET * index + IO_PADDING;
  return { x: offsetX, y: offsetY };
};

export const getOutputConnectionPosition = (from: Node, index: number) => {
  const outputPosition = getOutputPosition(from, index);
  const x = outputPosition.x + from.position.x;
  const y = outputPosition.y + from.position.y + IO_RADIUS / 2;
  return { x, y };
};

export const getInputPosition = (to: Node, index: number) => {
  const offsetY = dimensions.height;
  const offsetX = IO_OFFSET * index + IO_PADDING;
  return { x: offsetX, y: offsetY };
};

export const getInputConnectionPosition = (to: Node, index: number) => {
  const inputPosition = getInputPosition(to, index);
  const x = inputPosition.x + to.position.x;
  const y = inputPosition.y + to.position.y - IO_RADIUS / 2;
  return { x, y };
};
