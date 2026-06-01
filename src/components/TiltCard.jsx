import React, { useEffect, useRef, useState } from 'react';
import { use3DTilt } from '../hooks/use3DTilt';

export default function TiltCard({ children, className = '', glowClass = 'from-primary/25 to-secondary/15', delay = 0 }) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt({ maxTilt: 12, scale: 1.04 });
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '-40px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={wrapperRef}
      className={`tilt-card-wrapper group ${className} transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="tilt-card-inner relative h-full transition-transform duration-200 ease-out will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className={`absolute -inset-px rounded-[1.35rem] bg-gradient-to-br ${glowClass} opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10`}
          aria-hidden
        />
        {children}
      </div>
    </div>
  );
}
