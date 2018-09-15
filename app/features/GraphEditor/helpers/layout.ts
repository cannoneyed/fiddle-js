import { Link } from 'core/models/graph';
import { Node as NodeModel } from 'core/models/graph';

export const IO_PADDING = 10;
export const IO_OFFSET = 15;
export const IO_RADIUS = 5;

export const getOutputPosition = (index: number) => {
  const offsetY = 0;
  const offsetX = IO_OFFSET * index + IO_PADDING;
  return { x: offsetX, y: offsetY };
};

export const getOutputConnectionPosition = (from: Link) => {
  const outputPosition = getOutputPosition(from.index);
  const x = outputPosition.x + from.node.position.x;
  const y = outputPosition.y + from.node.position.y + IO_RADIUS / 2;
  return { x, y };
};

export const getInputPosition = (node: NodeModel, index: number) => {
  const offsetY = node.dimensions.height;
  const offsetX = IO_OFFSET * index + IO_PADDING;
  return { x: offsetX, y: offsetY };
};

export const getInputConnectionPosition = (to: Link) => {
  const inputPosition = getInputPosition(to.node, to.index);
  const x = inputPosition.x + to.node.position.x;
  const y = inputPosition.y + to.node.position.y - IO_RADIUS / 2;
  return { x, y };
};
