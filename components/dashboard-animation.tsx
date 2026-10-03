'use client';
import { useEffect, useRef, useState } from 'react';
import type { AnimationItem } from 'lottie-web';
import { Expand, Pause, Play, X } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from './ui/dialog';
import { AssetImage } from './case-image';
import { assetPath } from '@/lib/site-path';

function DashboardPlayer({ active = true }: { active?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const animation = useRef<AnimationItem | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    void import('lottie-web/build/player/lottie_light').then(({ default: lottie }) => {
      if (cancelled || !container.current) return;
      const player = lottie.loadAnimation({ container: container.current, renderer: 'svg', loop: true, autoplay: false, path: assetPath('/assets/main-version/dashboard-animation.json') });
      animation.current = player;
      player.addEventListener('DOMLoaded', () => {
        if (cancelled) return;
        setReady(true);
        setPlaying(!preference.matches);
      });
    }).catch(() => { if (!cancelled) setReady(false); });
    const reduceMotion = () => { if (preference.matches) setPlaying(false); };
    preference.addEventListener('change', reduceMotion);
    return () => { cancelled = true; animation.current?.destroy(); animation.current = null; preference.removeEventListener('change', reduceMotion); };
  }, []);
  useEffect(() => {
    if (playing && active) animation.current?.play();
    else animation.current?.pause();
  }, [playing, active, ready]);
  return <div className="dashboard-player">
    <div className="dashboard-animation-stage" role="img" aria-label="Animated monitoring dashboard with application trends and activity metrics">
      {!ready && <AssetImage name="image33.png" alt="Monitoring dashboard with application trends and activity metrics" />}
      <div ref={container} className="dashboard-animation-canvas" aria-hidden="true" data-ready={ready} />
    </div>
    {ready && <button type="button" className="animation-control" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause dashboard animation' : 'Play dashboard animation'}>
      {playing ? <Pause size={14} /> : <Play size={14} />}{playing ? 'Pause animation' : 'Play animation'}
    </button>}
  </div>;
}

export function DashboardAnimation() {
  const [open, setOpen] = useState(false);
  return <figure className="case-image dashboard-animation-figure">
    <div className="dashboard-animation-frame">
      <DashboardPlayer active={!open} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="dashboard-expand" aria-label="Expand: Animated monitoring dashboard"><Expand size={15} /> Expand</DialogTrigger>
        <DialogContent className="image-dialog dashboard-animation-dialog" showCloseButton={false}>
          <div className="image-dialog-header"><DialogTitle>Animated monitoring dashboard</DialogTitle><div className="image-dialog-actions"><DialogClose aria-label="Close animation"><X size={22} /></DialogClose></div></div>
          <DashboardPlayer />
        </DialogContent>
      </Dialog>
    </div>
    <figcaption>Monitoring dashboard with application trends and activity metrics</figcaption>
  </figure>;
}
