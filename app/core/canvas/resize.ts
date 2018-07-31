import { Dimensions } from 'core/interfaces';

export const resizeCanvas = (canvasElement: HTMLCanvasElement, dimensions: Dimensions) => {
  const scale = window.devicePixelRatio;
  canvasElement.width = dimensions.width * scale;
  canvasElement.height = dimensions.height * scale;

  const ctx = canvasElement.getContext('2d');
  if (ctx) {
    ctx.scale(scale, scale);
  }
};
