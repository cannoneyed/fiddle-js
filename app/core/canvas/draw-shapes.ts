import { Dimensions, Coordinates } from 'core/interfaces';

export const drawRectangle = (
  ctx: CanvasRenderingContext2D,
  position: Coordinates,
  dimensions: Dimensions,
  fillStyle: string
) => {
  ctx.fillStyle = fillStyle;
  ctx.fillRect(position.x, position.y, dimensions.width, dimensions.height);
};
