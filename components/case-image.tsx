'use client';
import { useState } from 'react';
import { Expand, X, ZoomIn, ZoomOut } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import mediaData from '@/content/media.json';
import mediaOverrides from '@/content/media-overrides.json';
import { assetPath } from '@/lib/site-path';
type Asset = {
  src: string;
  width: number;
  height: number;
  variants: { src: string; width: number }[];
};
const media = { ...mediaData, ...mediaOverrides } as Record<string, Asset>;
export function AssetImage({
  name,
  alt,
  className,
  eager = false,
  sizes = '(max-width: 700px) 100vw, 900px',
}: {
  name: string;
  alt: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
}) {
  const asset = media[name];
  if (!asset) return null;
  return (
    <img
      className={className}
      src={assetPath(asset.src)}
      srcSet={[...asset.variants, { src: asset.src, width: asset.width }]
        .map((v) => `${assetPath(v.src)} ${v.width}w`)
        .join(', ')}
      sizes={sizes}
      width={asset.width}
      height={asset.height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
export function CaseImage({
  name,
  alt,
  eager = false,
  expandable = true,
  showCaption = true,
}: {
  name: string;
  alt: string;
  eager?: boolean;
  expandable?: boolean;
  showCaption?: boolean;
}) {
  const [zoomed, setZoomed] = useState(false);
  const asset = media[name];
  if (!asset) return null;
  if (!expandable) {
    return (
      <figure className="case-image">
        <div className="image-trigger image-static">
          <AssetImage name={name} alt={alt} eager={eager} />
        </div>
        {showCaption && <figcaption>{alt}</figcaption>}
      </figure>
    );
  }
  return (
    <figure
      className={`case-image ${name.endsWith('.emf') ? 'flow-image' : ''}`}
    >
      <Dialog onOpenChange={() => setZoomed(false)}>
        <DialogTrigger className="image-trigger" aria-label={`Expand: ${alt}`}>
          <AssetImage name={name} alt={alt} eager={eager} />
          <span className="image-expand">
            <Expand size={15} /> Expand
          </span>
        </DialogTrigger>
        <DialogContent className="image-dialog" showCloseButton={false}>
          <div className="image-dialog-header">
            <DialogTitle>{alt}</DialogTitle>
            <div className="image-dialog-actions">
              <button
                type="button"
                onClick={() => setZoomed(!zoomed)}
                aria-label={
                  zoomed ? 'Fit image to screen' : 'View at original size'
                }
              >
                {zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
              </button>
              <DialogClose aria-label="Close image">
                <X size={22} />
              </DialogClose>
            </div>
          </div>
          <div
            className={`image-dialog-canvas ${zoomed ? 'zoomed' : ''}`}
            tabIndex={0}
            role="region"
            aria-label="Image detail; scroll to inspect"
          >
            <img
              src={assetPath(asset.src)}
              alt={alt}
              width={asset.width}
              height={asset.height}
            />
          </div>
        </DialogContent>
      </Dialog>
      {showCaption && <figcaption>{alt}</figcaption>}
    </figure>
  );
}
