/**
 * dino.png is a pixel-perfect crop of the original logo.png artwork (not a
 * hand-redrawn shape) so the silhouette is guaranteed identical — only the
 * fire overlay and the wordmark color animate. The fire is anchored at the
 * mouth-gap notch in that crop (~99% across, ~27% down) and timed so
 * "ETHAN LI" wipes gold top-to-bottom right as the flame reaches it, like
 * the fire is what's lighting up the name. The wordmark stays fully
 * readable at all other times; the gold wipe is a decorative flourish, not
 * the only time the name is visible.
 */
function Wordmark({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={`relative inline-block ${className ?? ''}`} style={style}>
      <span aria-hidden="true" style={{ visibility: 'hidden' }}>
        {text}
      </span>
      <span className="absolute inset-0" style={{ color: 'var(--foreground)' }}>
        {text}
      </span>
      <span className="wordmark-gold absolute inset-0">{text}</span>
    </span>
  );
}

export function AnimatedLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ''}`}>
      <style>{`
        @keyframes fire-burst {
          0%, 13%, 48%, 100% { opacity: 0; transform: scaleX(0.5); }
          16% { opacity: 1; transform: scaleX(0.75); }
          21% { opacity: 0.75; transform: scaleX(1); }
          26% { opacity: 1; transform: scaleX(0.85); }
          31% { opacity: 0.7; transform: scaleX(1.05); }
          38% { opacity: 0.9; transform: scaleX(0.9); }
          44% { opacity: 0.3; transform: scaleX(0.7); }
        }
        @keyframes fire-burst-inner {
          0%, 14%, 47%, 100% { opacity: 0; }
          18% { opacity: 1; }
          23% { opacity: 0.6; }
          28% { opacity: 1; }
          34% { opacity: 0.5; }
          40% { opacity: 0.9; }
        }
        @keyframes gold-wipe {
          0%, 14% { clip-path: inset(0 0 100% 0); }
          22% { clip-path: inset(0 0 65% 0); }
          28% { clip-path: inset(0 0 30% 0); }
          34% { clip-path: inset(0 0 0% 0); }
          46% { clip-path: inset(0 0 0% 0); }
          52% { clip-path: inset(0 0 35% 0); }
          58% { clip-path: inset(0 0 70% 0); }
          64%, 100% { clip-path: inset(0 0 100% 0); }
        }
        .fire-outer { animation: fire-burst 6s ease-in-out infinite; transform-origin: left center; }
        .fire-inner { animation: fire-burst-inner 6s ease-in-out infinite; transform-origin: left center; }
        .wordmark-gold {
          background: linear-gradient(135deg, #8B6914, #D4AF37, #FDF0A0 55%, #B8860B);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
          animation: gold-wipe 6s ease-in-out infinite;
        }
      `}</style>

      <div className="relative h-9" style={{ aspectRatio: '618 / 671' }}>
        <img src="/dino.png" alt="" className="h-full w-auto dark:invert" />

        {/* Fire breath, anchored at the mouth-gap notch in dino.png (~99% across, ~27% down) */}
        <div
          className="absolute flex items-center"
          style={{ left: '95%', top: '2%', height: '55%', width: '220%' }}
        >
          <svg viewBox="0 0 40 14" className="h-full w-full overflow-visible" preserveAspectRatio="xMinYMid meet">
            <g className="fire-outer" fill="#ff7a1a">
              <rect x="0" y="4" width="3" height="1" />
              <rect x="3" y="2" width="3" height="1" />
              <rect x="3" y="5" width="4" height="1" />
              <rect x="6" y="3" width="3" height="2" />
              <rect x="9" y="1" width="3" height="1" />
              <rect x="9" y="4" width="3" height="1" />
            </g>
            <g className="fire-inner" fill="#ffd23f">
              <rect x="1" y="4" width="2" height="1" />
              <rect x="4" y="4" width="2" height="1" />
              <rect x="7" y="4" width="2" height="1" />
              <rect x="10" y="4" width="2" height="1" />
            </g>
          </svg>
        </div>
      </div>

      <div className="flex flex-col leading-none">
        <Wordmark
          text="ETHAN"
          className="text-lg"
          style={{ fontFamily: "'TASA Explorer', sans-serif", fontWeight: 700, letterSpacing: '0.02em' }}
        />
        <Wordmark
          text="LI"
          className="text-[10px] self-end -mt-1"
          style={{ fontFamily: "'TASA Explorer', sans-serif", fontWeight: 700, letterSpacing: '0.15em' }}
        />
      </div>
    </div>
  );
}
