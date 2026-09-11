'use client';
import { useEffect, useRef, useState } from 'react';
import type { AnimationItem } from 'lottie-web';
import { Pause, Play } from 'lucide-react';
import { assetPath } from '@/lib/site-path';

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    void import('lottie-web/build/player/lottie_light')
      .then(({ default: lottie }) => {
        if (cancelled) return;
        const animation = lottie.loadAnimation({
          container,
          renderer: 'svg',
          loop: true,
          autoplay: !preference.matches,
          path: assetPath('/assets/hero-animation.json'),
          rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
        });
        animationRef.current = animation;
        animation.addEventListener('DOMLoaded', () => {
          if (cancelled) return;
          if (preference.matches) animation.goToAndStop(160, true);
          setReady(true);
          setPlaying(!preference.matches);
        });
        animation.addEventListener('data_failed', () => {
          setReady(false);
          setPlaying(false);
        });
      })
      .catch(() => {
        if (!cancelled) {
          setReady(false);
          setPlaying(false);
        }
      });
    const onPreferenceChange = () => {
      if (preference.matches) {
        animationRef.current?.goToAndStop(160, true);
        setPlaying(false);
      }
    };
    preference.addEventListener('change', onPreferenceChange);
    return () => {
      cancelled = true;
      animationRef.current?.destroy();
      animationRef.current = null;
      preference.removeEventListener('change', onPreferenceChange);
    };
  }, []);
  function togglePlayback() {
    if (!animationRef.current) return;
    if (playing) animationRef.current.pause();
    else animationRef.current.play();
    setPlaying(!playing);
  }
  return (
    <div className="hero-player">
      <div className="hero-animation-stage">
        <img
          className="hero-still"
          src={assetPath('/assets/source/image29-1280.webp')}
          width={1280}
          height={916}
          alt="Trigate dashboard with programs, applications, and analytics"
          hidden={ready}
        />
        <figure
          ref={containerRef}
          className="hero-animation"
          aria-label="Animated Trigate platform interface"
        />
      </div>
      {ready && (
        <button
          className="animation-control"
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? 'Pause hero animation' : 'Play hero animation'}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}{' '}
          {playing ? 'Pause animation' : 'Play animation'}
        </button>
      )}
    </div>
  );
}
