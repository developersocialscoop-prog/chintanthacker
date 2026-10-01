import { memo, useEffect, useRef, useState } from 'react';

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const mod = (n, m) => ((n % m) + m) % m;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/**
 * ScanCarousel: a curved 3D row of cards. A glowing beam sits in the center.
 * Cards are dithered black and white on the left of the beam and full color on the right.
 * Fills its parent, so give the parent a height and `position: relative`.
 *
 * items          [{ src, alt }]
 * cardWidth / cardHeight / cardRadius   card size and corner radius in px
 * gap            px between cards
 * speed          px per second
 * direction      'left' | 'right'
 * curve          tilt in degrees for cards at the edges
 * depth          px the edge cards come toward the viewer
 * perspective    CSS perspective in px
 * cell           size of one dither pixel in px (bigger = chunkier)
 * levels         gray levels in the dither (2 = pure black and white)
 * beamColor      CSS color of the beam
 * beamWidth      px
 * pauseOnHover   pause while the pointer is over the carousel
 * imageFit       'cover' | 'contain' | 'fill'
 */
export default function ScanCarousel({
  items = [],
  cardWidth = 240,
  cardHeight = 170,
  gap = 24,
  speed = 50,
  direction = 'left',
  curve = 35,
  depth = 160,
  perspective = 1000,
  cell = 3,
  levels = 4,
  beamColor = '#d070ff',
  beamWidth = 2,
  cardRadius = 14,
  pauseOnHover = true,
  imageFit = 'cover',
  className = '',
  style,
}) {
  const rootRef = useRef(null);
  const offset = useRef(0);
  const hovering = useRef(false);
  const [off, setOff] = useState(0);
  const [width, setWidth] = useState(800);
  const sign = direction === 'right' ? -1 : 1;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth || 800));
    ro.observe(el);
    setWidth(el.clientWidth || 800);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!(pauseOnHover && hovering.current)) {
        offset.current += sign * speed * dt;
        setOff(offset.current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, sign, pauseOnHover]);

  // repeat the items until the row is wide enough to loop without gaps
  const step = cardWidth + gap;
  let list = items;
  if (items.length) {
    while (list.length * step < width * 1.6) list = list.concat(items);
  }
  const total = list.length * step;
  const R = width / 2;

  return (
    <div
      ref={rootRef}
      className={`relative h-full w-full select-none overflow-hidden ${className}`}
      style={style}
      onPointerEnter={() => (hovering.current = true)}
      onPointerLeave={() => (hovering.current = false)}
    >
      <div className="absolute inset-0" style={{ perspective }}>
        <div className="absolute left-1/2 top-1/2" style={{ transformStyle: 'preserve-3d' }}>
          {list.map((item, i) => {
            const pos = mod(i * step - off + total / 2, total) - total / 2;
            const d = clamp(pos / R, -1.4, 1.4);
            const split = clamp(cardWidth / 2 - pos, 0, cardWidth);
            return (
              <ScanCard
                key={i}
                item={item}
                width={cardWidth}
                height={cardHeight}
                radius={cardRadius}
                cell={cell}
                levels={levels}
                fit={imageFit}
                split={split}
                transform={`translate3d(${pos}px, 0, ${d * d * depth}px) rotateY(${-d * curve}deg)`}
              />
            );
          })}
        </div>
      </div>

      {/* the beam */}
      <div
        className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2"
        style={{
          top: '8%',
          bottom: '8%',
          width: beamWidth,
          background: `linear-gradient(transparent, ${beamColor} 25%, #fff 50%, ${beamColor} 75%, transparent)`,
          boxShadow: `0 0 14px 3px ${beamColor}, 0 0 40px 8px ${beamColor}66`,
        }}
      />
    </div>
  );
}

const ScanCard = memo(function ScanCard({
  item,
  width,
  height,
  radius,
  cell,
  levels,
  fit,
  split,
  transform,
}) {
  const canvasRef = useRef(null);
  const [filterFallback, setFilterFallback] = useState(false);

  // build the dithered version once per image / size / cell change
  useEffect(() => {
    let cancelled = false;
    const draw = (img, cors) => {
      const cv = canvasRef.current;
      if (cancelled || !cv) return;
      const w = Math.max(1, Math.round(width / cell));
      const h = Math.max(1, Math.round(height / cell));
      cv.width = w;
      cv.height = h;
      const ctx = cv.getContext('2d');
      const r = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const iw = img.naturalWidth * r;
      const ih = img.naturalHeight * r;
      ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
      try {
        const data = ctx.getImageData(0, 0, w, h);
        const px = data.data;
        const steps = Math.max(2, levels) - 1;
        for (let i = 0; i < w * h; i++) {
          const g = ((px[i * 4] * 0.3 + px[i * 4 + 1] * 0.59 + px[i * 4 + 2] * 0.11) / 255) * 1.15;
          const t = (BAYER[(i % w) % 4 + (Math.floor(i / w) % 4) * 4] + 0.5) / 16;
          const v = (clamp(Math.floor(g * steps + t), 0, steps) / steps) * 255;
          px[i * 4] = px[i * 4 + 1] = px[i * 4 + 2] = v;
          px[i * 4 + 3] = 255;
        }
        ctx.putImageData(data, 0, 0);
        setFilterFallback(false);
      } catch {
        // image host has no CORS headers: fall back to a CSS grayscale look
        setFilterFallback(true);
      }
    };
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => draw(img, true);
    img.onerror = () => {
      const plain = new Image();
      plain.onload = () => draw(plain, false);
      plain.src = item.src;
    };
    img.src = item.src;
    return () => {
      cancelled = true;
    };
  }, [item.src, width, height, cell, levels]);

  return (
    <div
      className="absolute overflow-hidden will-change-transform"
      style={{
        width,
        height,
        left: -width / 2,
        top: -height / 2,
        borderRadius: radius,
        transform,
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{
          imageRendering: 'pixelated',
          filter: filterFallback ? 'grayscale(1) contrast(1.6)' : undefined,
        }}
      />
      <img
        src={item.src}
        alt={item.alt || ''}
        draggable={false}
        loading="lazy"
        className="absolute inset-0 block h-full w-full"
        style={{ objectFit: fit, clipPath: `inset(0 0 0 ${split}px)` }}
      />
    </div>
  );
});