export const drawVerticalLine = (
  ctx: CanvasRenderingContext2D,
  x: number,
  height: number,
  color: string
) => {
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.strokeStyle = color;
  ctx.lineTo(x, height);
  ctx.stroke();
};

export const drawHorizontalLine = (
  ctx: CanvasRenderingContext2D,
  y: number,
  width: number,
  color: string
) => {
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.strokeStyle = color;
  ctx.lineTo(width, y);
  ctx.stroke();
};
