/* Orbiwest Technologies — lightweight pointer-based 3D interaction */
(() => {
  'use strict';

  const canTilt = window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!canTilt) return;

  const bindTilt = (element, maxTilt = 4) => {
    const reset = () => {
      element.style.setProperty('--ow-rx', '0deg');
      element.style.setProperty('--ow-ry', '0deg');
      element.style.setProperty('--ow-mx', '50%');
      element.style.setProperty('--ow-my', '50%');
    };

    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - y) * maxTilt * 2;

      element.style.setProperty('--ow-rx', `${rotateX.toFixed(2)}deg`);
      element.style.setProperty('--ow-ry', `${rotateY.toFixed(2)}deg`);
      element.style.setProperty('--ow-mx', `${(x * 100).toFixed(1)}%`);
      element.style.setProperty('--ow-my', `${(y * 100).toFixed(1)}%`);
    }, { passive: true });

    element.addEventListener('pointerleave', reset, { passive: true });
    element.addEventListener('blur', reset, true);
  };

  document.querySelectorAll('.home-v3 .home-service-card, .home-v3 .home-industry-card')
    .forEach((card) => bindTilt(card, 3.5));

  const brandStage = document.querySelector('.home-v3 .professional-brand-stage');
  if (brandStage) bindTilt(brandStage, 7);
})();
