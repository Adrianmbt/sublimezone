import React from 'react';
import { Sparkles } from 'lucide-react';
import { use3DTilt } from '../hooks/use3DTilt';

const MUG_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAwWzHGZsc-qQu8CW826L26-zv2f8k8_HHcYCwxhYhSld5k1sFwl4tW5Mxcj4wCVMpLIF0tqn23tbvLt8WXPGTiysP4xgrNHMaLmgRyk64AXdEif6VZinuCVyAa2EFORl6-sN5irtXwgvJbB5weXMMwZX214oBU3QPWR1rYaqE9G2-d7SwYe9hM1j6cl7Q9P4LjctpV4rDYlwA3NNWueQMtWUfQQH-qW8wXo120kx_gB5f-KliZFGHJK8z-zKW_3T0FJ4Qd1nRY7P3Y';
const SHIRT_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDyNPzq00q2-eE89Wb6tkIYYteZ8hlYN9uyWhQ1Tz4b8mPQi0YBjMOZaVtjeKzoS7IGjP5PAet4rgAVrt6qeYrZlb08qMy9KdUyJgad6eslhkZ49EWz9Dn5J7npowclfO8Kp7Lx8BwgUpMDJVKPnAAVU9vDYldcIT1PGibzo--c1Qaec9s1RBqCsV0YK_qRxQoETDE_kAJeWz-2cqcVp6zfjTVePckWvAvV60qLmI_fllqyVwvNctpINTCrXWX5z50RAaiI6DHWebvu';

export default function HeroScene3D() {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt({ maxTilt: 16, scale: 1.02, perspective: 1400 });

  return (
    <div className="scene-3d relative w-full aspect-square flex items-center justify-center">
      <div className="scene-3d-floor" aria-hidden />
      <div className="scene-3d-orb scene-3d-orb--primary" aria-hidden />
      <div className="scene-3d-orb scene-3d-orb--secondary" aria-hidden />

      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative z-10 w-[85%] max-w-md transition-transform duration-200 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="product-3d-main animate-floating" style={{ transform: 'translateZ(60px)' }}>
          <div className="rounded-full aspect-square overflow-hidden border-[12px] border-white dark:border-slate-800 shadow-[0_40px_80px_-20px_rgba(179,0,105,0.45),0_20px_40px_rgba(0,0,0,0.15)]">
            <img alt="Mug premium sublimado" className="w-full h-full object-cover" src={MUG_IMG} />
          </div>
          <div className="product-3d-shine" aria-hidden />
        </div>

        <div
          className="absolute -top-4 -right-2 md:-right-6 w-28 h-28 md:w-36 md:h-36 glass-3d rounded-2xl p-2.5 animate-floating-delayed"
          style={{ transform: 'translateZ(100px)' }}
        >
          <img alt="Detalle textil" className="w-full h-full object-cover rounded-xl" src={SHIRT_IMG} />
        </div>

        <div
          className="absolute -bottom-6 -left-4 md:-left-8 w-32 h-32 md:w-40 md:h-40 glass-3d rounded-full flex flex-col items-center justify-center border-2 border-white/60 animate-floating"
          style={{ transform: 'translateZ(80px)' }}
        >
          <Sparkles className="text-primary mb-1" size={20} />
          <span className="text-primary font-display font-extrabold text-3xl md:text-4xl">100%</span>
          <span className="text-[9px] md:text-[10px] font-bold text-on-surface-variant uppercase tracking-wider text-center px-2">
            Calidad Premium
          </span>
        </div>

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] rounded-full border-2 border-dashed border-primary/15 animate-float-ring"
          style={{ transform: 'translateZ(-40px) rotateX(75deg)' }}
          aria-hidden
        />
      </div>
    </div>
  );
}
