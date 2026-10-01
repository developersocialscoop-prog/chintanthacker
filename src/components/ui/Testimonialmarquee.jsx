import { useEffect, useRef, useState } from 'react';

/* ============================================================
   THEME — Single navy + gold theme
   ============================================================ */
const THEME = {
  card: '#0D1B33',
  cardHover: '#122441',
  border: 'rgba(255, 255, 255, 0.08)',
  borderHover: 'rgba(197, 164, 126, 0.5)',
  text: '#FFFFFF',
  muted: '#8899AA',
  accent: '#C5A47E',
  accentSoft: 'rgba(197, 164, 126, 0.12)',
  starFilled: '#C5A47E',
  starEmpty: '#2A3A55',
};

const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.15)',
  md: '0 4px 12px -4px rgba(0, 0, 0, 0.35)',
  lg: '0 12px 32px -12px rgba(0, 0, 0, 0.5)',
  hover: '0 16px 40px -16px rgba(197, 164, 126, 0.25)',
};

/* ============================================================
   HELPERS
   ============================================================ */
const hueOf = (s = '') => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 360, 7);

const fmtDate = (d) =>
  d instanceof Date
    ? d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
    : d;

function useMediaQuery(query) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function TestimonialMarquee({
  items = [],
  rows = 3,
  directions = ['right', 'left', 'right'],
  speeds,
  speed = 40,
  pauseOnHover = true,
  hoverSpeed = 0,
  cardWidth = 340,
  cardPadding = 22,
  cardRadius = 16,
  gap = 18,
  rowGap = 12,
  edgeFade = 0.08,
  lineClamp = 4,
  shadow = 'none',
  cardOpacity = 1,
  activeOpacity = 1,
  hoverLift = 6,
  showAvatar = true,
  showCompany = true,
  showDate = true,
  showRating = true,
  showQuote = false,
  onCardClick,
  renderCard,
  className = '',
  style,
}) {
  const rootRef = useRef(null);
  const [width, setWidth] = useState(1200);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth || 1200));
    ro.observe(el);
    setWidth(el.clientWidth || 1200);
    return () => ro.disconnect();
  }, []);

  const getCardWidth = () => {
    if (width < 480) return Math.round(width * 0.85);
    if (width < 640) return Math.min(cardWidth, 280);
    if (width < 768) return Math.min(cardWidth, 300);
    if (width < 1024) return Math.min(cardWidth, 320);
    if (width < 1280) return Math.min(cardWidth, 340);
    return Math.min(cardWidth, 360);
  };

  const o = {
    theme: THEME,
    shadow: SHADOWS[shadow] ?? shadow,
    hoverShadow: SHADOWS.hover,
    cardWidth: getCardWidth(),
    cardPadding,
    cardRadius,
    gap,
    lineClamp,
    cardOpacity,
    activeOpacity,
    hoverLift,
    showAvatar,
    showCompany,
    showDate,
    showRating,
    showQuote,
    onCardClick,
    renderCard,
    pauseOnHover,
    hoverSpeed,
    edgeFade,
  };

  const rowsData = Array.isArray(items[0])
    ? items
    : Array.from({ length: Math.max(1, rows) }, (_, r) =>
        items.filter((_, i) => i % Math.max(1, rows) === r)
      );

  return (
    <div
      ref={rootRef}
      className={`flex w-full flex-col ${className}`}
      style={{ gap: rowGap, ...style }}
    >
      {rowsData.map((list, r) => (
        <Row
          key={r}
          list={list}
          direction={directions[r % directions.length]}
          speed={speeds?.[r] ?? speed}
          o={o}
          containerWidth={width}
          reduced={reduced}
        />
      ))}
    </div>
  );
}

/* ============================================================
   ROW — one horizontal scrolling row
   ============================================================ */
function Row({ list, direction, speed, o, containerWidth, reduced }) {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const rate = useRef(1);
  const target = useRef(1);
  const raf = useRef(0);

  const step = o.cardWidth + o.gap;
  const reps = list.length
    ? Math.max(1, Math.ceil((containerWidth + step) / (list.length * step)))
    : 1;
  const set = Array.from({ length: reps }, () => list).flat();

  useEffect(() => {
    const el = trackRef.current;
    if (!el || reduced || !speed || !list.length) return;
    const half = el.offsetWidth / 2;
    if (!half) return;

    const frames =
      direction === 'right'
        ? [
            { transform: `translate3d(${-half}px,0,0)` },
            { transform: 'translate3d(0,0,0)' },
          ]
        : [
            { transform: 'translate3d(0,0,0)' },
            { transform: `translate3d(${-half}px,0,0)` },
          ];

    const a = el.animate(frames, {
      duration: (half / Math.abs(speed)) * 1000,
      iterations: Infinity,
      easing: 'linear',
    });
    a.playbackRate = rate.current;
    animRef.current = a;

    return () => {
      a.cancel();
      animRef.current = null;
    };
  }, [direction, speed, set.length, o.cardWidth, o.gap, reduced, list.length]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const ease = () => {
    cancelAnimationFrame(raf.current);
    const tick = () => {
      const diff = target.current - rate.current;
      rate.current = Math.abs(diff) < 0.01 ? target.current : rate.current + diff * 0.1;
      if (animRef.current) animRef.current.playbackRate = rate.current;
      if (rate.current !== target.current) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  const fade = Math.min(0.3, Math.max(0, o.edgeFade)) * 100;
  const mask = fade
    ? `linear-gradient(90deg, transparent, #000 ${fade}%, #000 ${100 - fade}%, transparent)`
    : undefined;

  return (
    <div
      className={`relative ${reduced ? 'overflow-x-auto' : 'overflow-hidden'}`}
      style={{ WebkitMaskImage: mask, maskImage: mask }}
      onPointerEnter={(e) => {
        if (!o.pauseOnHover || e.pointerType === 'touch') return;
        target.current = o.hoverSpeed;
        ease();
      }}
      onPointerLeave={() => {
        target.current = 1;
        ease();
      }}
    >
      <div ref={trackRef} className="flex w-max py-4 will-change-transform">
        {(reduced ? list : [...set, ...set]).map((t, i) => (
          <Card key={i} t={t} o={o} hidden={!reduced && i >= set.length} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   CARD
   ============================================================ */
function Card({ t, o, hidden }) {
  const [hover, setHover] = useState(false);
  const p = o.theme;
  const clickable = typeof o.onCardClick === 'function';

  const box = {
    width: o.cardWidth,
    marginRight: o.gap,
    opacity: hover ? o.activeOpacity : o.cardOpacity,
    transform: hover ? `translateY(${-o.hoverLift}px)` : 'translateY(0)',
    transition:
      'transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.35s ease, border-color 0.35s ease, box-shadow 0.4s ease',
  };

  const handlers = {
    onPointerEnter: () => setHover(true),
    onPointerLeave: () => setHover(false),
    'aria-hidden': hidden || undefined,
    ...(clickable && {
      role: 'button',
      tabIndex: hidden ? -1 : 0,
      onClick: () => o.onCardClick(t),
      onKeyDown: (e) => e.key === 'Enter' && o.onCardClick(t),
    }),
  };

  if (o.renderCard) {
    return (
      <div className="flex-none" style={box} {...handlers}>
        {o.renderCard(t)}
      </div>
    );
  }

  return (
    <article
      className={`relative flex flex-none flex-col gap-3 ${clickable ? 'cursor-pointer' : ''}`}
      style={{
        ...box,
        padding: o.cardPadding,
        borderRadius: o.cardRadius,
        background: p.card,
        color: p.text,
        border: `1px solid ${hover ? p.borderHover : p.border}`,
        boxShadow: hover ? o.hoverShadow : o.shadow,
      }}
      {...handlers}
    >
      {o.showQuote && (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill={p.accent}
          className="absolute right-4 top-4"
          style={{ opacity: 0.2 }}
          aria-hidden="true"
        >
          <path d="M9.4 5C5.9 6.6 4 9.6 4 13.5V19h6.5v-6.5H7.3c.1-2 1.1-3.5 3-4.5L9.4 5zm9.6 0c-3.5 1.6-5.4 4.6-5.4 8.5V19H20v-6.5h-3.2c.1-2 1.1-3.5 3-4.5L19 5z" />
        </svg>
      )}

      <div className="flex items-center gap-3">
        {o.showAvatar && <Avatar src={t.avatar} name={t.name} />}
        <div className="min-w-0 flex-1">
          <b className="block truncate text-[15px] font-bold">{t.name}</b>
          {(t.role || t.company) && (
            <span
              className="mt-0.5 block truncate text-[13px]"
              style={{ color: p.muted }}
            >
              {t.role || t.company}
            </span>
          )}
        </div>
      </div>

      {o.showRating && t.rating > 0 && (
        <div className="flex items-center gap-2">
          <Stars value={t.rating} />
          <span className="text-[12px] font-medium" style={{ color: p.muted }}>
            {t.rating}.0
          </span>
        </div>
      )}

      <p
        className="m-0 flex-1 text-[14px] leading-relaxed"
        style={
          o.lineClamp > 0
            ? {
                display: '-webkit-box',
                WebkitLineClamp: o.lineClamp,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }
            : undefined
        }
      >
        {t.message}
      </p>

      {(o.showCompany || o.showDate) && (
        <div
          className="flex items-center justify-between gap-3 pt-3 text-[12px]"
          style={{ borderTop: `1px solid ${p.border}`, color: p.muted }}
        >
          {o.showCompany && t.company ? (
            <span
              className="truncate rounded-full px-2.5 py-1 font-semibold"
              style={{ background: p.accentSoft, color: p.accent }}
            >
              {t.company}
            </span>
          ) : (
            <span />
          )}
          {o.showDate && t.date && (
            <time className="shrink-0">{fmtDate(t.date)}</time>
          )}
        </div>
      )}
    </article>
  );
}

/* ============================================================
   AVATAR
   ============================================================ */
function Avatar({ src, name = '', size = 44 }) {
  const [bad, setBad] = useState(false);

  if (src && !bad) {
    return (
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        draggable={false}
        loading="lazy"
        onError={() => setBad(true)}
        className="flex-none rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  const h = hueOf(name);
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className="flex flex-none items-center justify-center rounded-full text-sm font-bold text-white"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, hsl(${h},70%,58%), hsl(${(h + 40) % 360},70%,40%))`,
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

/* ============================================================
   STARS
   ============================================================ */
function Stars({ value, size = 14 }) {
  const p = THEME;
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i < value ? p.starFilled : p.starEmpty}
          style={{ transition: 'fill 0.3s ease' }}
        >
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6L10 15l-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
        </svg>
      ))}
    </div>
  );
}