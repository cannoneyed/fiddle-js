import Stats from 'stats.js';

export const initializeStats = () => {
  const stats = new Stats();
  Object.assign(stats.dom.style, {
    left: '',
    right: '0px',
    top: '',
    bottom: '0px',
  });
  window.requestAnimationFrame(function loop() {
    stats.update();
    window.requestAnimationFrame(loop);
  });
  document.body.appendChild(stats.dom);
};
