import React, { useEffect, useRef } from 'react';

const MagicCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const now = performance.now();

      // More prominent trail: spawn a bit more frequently
      if (now - lastSpawnRef.current < 35) return; // was 80
      lastSpawnRef.current = now;

      const sparkle = document.createElement('div');

      // Bigger + more visible
      const size = Math.random() * 8 + 4; // 4-12px
      const driftX = (Math.random() - 0.5) * 18; // horizontal drift
      const driftY = (Math.random() - 0.5) * 14; // vertical drift

      sparkle.style.position = 'absolute';
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.transform = 'translate(-50%, -50%)';
      sparkle.style.borderRadius = '999px';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.mixBlendMode = 'screen';

      // Gold/ivory palette - avoid green neon
      const hue = Math.random() * 18 + 38; // ~38-56
      sparkle.style.background = `radial-gradient(circle, hsla(${hue}, 95%, 82%, 1) 0%, hsla(${hue}, 95%, 70%, 0.65) 35%, rgba(0,0,0,0) 70%)`;
      sparkle.style.boxShadow = `0 0 ${Math.max(18, size * 3)}px rgba(243,229,171,0.55), 0 0 ${Math.max(8, size * 1.5)}px rgba(212,175,55,0.35)`;

      // Animate: float + fade to create an actual trail
      sparkle.animate(
        [
          { opacity: 0, transform: 'translate(-50%, -50%) scale(0.6)' },
          { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
          { opacity: 0, transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${-30 + driftY}px)) scale(0.2)` },
        ],
        {
          duration: 850, // longer life
          easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          fill: 'forwards',
        }
      );

      containerRef.current.appendChild(sparkle);

      // Clean up
      setTimeout(() => sparkle.remove(), 900);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
};

export default MagicCursor;
