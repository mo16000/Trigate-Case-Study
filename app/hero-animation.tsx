'use client';

import { useEffect, useRef } from 'react';

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let destroyAnimation: (() => void) | undefined;

    void import('lottie-web/build/player/lottie_light').then(({ default: lottie }) => {
      if (cancelled) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const animation = lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop: !reduceMotion,
        autoplay: !reduceMotion,
        path: '/assets/hero-animation.json',
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
        },
      });

      if (reduceMotion) {
        animation.addEventListener('DOMLoaded', () => animation.goToAndStop(160, true));
      }

      destroyAnimation = () => animation.destroy();
    });

    return () => {
      cancelled = true;
      destroyAnimation?.();
    };
  }, []);

  return (
    <figure
      ref={containerRef}
      className="hero-animation"
      aria-label="Animated Trigate platform interface"
    />
  );
}
