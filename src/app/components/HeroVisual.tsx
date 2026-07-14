import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { useTheme } from 'next-themes';
const φ = (1 + Math.sqrt(5)) / 2;
const n = 1 / Math.sqrt(1 + φ * φ);

type V3 = [number, number, number];

// Icosahedron 12 vertices normalized to unit sphere
const VERTS: V3[] = (
  [
    [0, 1, φ], [0, -1, φ], [0, 1, -φ], [0, -1, -φ],
    [1, φ, 0], [-1, φ, 0], [1, -φ, 0], [-1, -φ, 0],
    [φ, 0, 1], [-φ, 0, 1], [φ, 0, -1], [-φ, 0, -1],
  ] as V3[]
).map(([x, y, z]) => [x * n, y * n, z * n]);

// 20 triangular faces
const FACES: [number, number, number][] = [
  [0,1,8],[0,8,4],[0,4,5],[0,5,9],[0,9,1],
  [1,6,8],[8,6,10],[8,10,4],[4,10,2],[4,2,5],
  [5,2,11],[5,11,9],[9,11,7],[9,7,1],[1,7,6],
  [3,6,7],[3,7,11],[3,11,2],[3,2,10],[3,10,6],
];

// 30 unique edges
const EDGES: [number, number][] = (() => {
  const seen = new Set<string>();
  const out: [number, number][] = [];
  for (const [a, b, c] of FACES) {
    for (const [u, v] of [[a, b], [b, c], [a, c]] as [number, number][]) {
      const k = `${Math.min(u, v)}-${Math.max(u, v)}`;
      if (!seen.has(k)) { seen.add(k); out.push([u, v]); }
    }
  }
  return out;
})();

function project([x, y, z]: V3, ry: number, rx: number) {
  // Rotate Y
  const cy = Math.cos(ry), sy = Math.sin(ry);
  const x1 = x * cy - z * sy;
  const z1 = x * sy + z * cy;
  // Rotate X
  const cx = Math.cos(rx), sx = Math.sin(rx);
  const y2 = y * cx - z1 * sx;
  const z2 = y * sx + z1 * cx;
  // Perspective
  const d = 1.75 + z2;
  return { px: (x1 / d) * 44 + 55, py: (y2 / d) * 44 + 50, z: z2 };
}

// Citrus-slice wheel — matches Pomelo Labs' actual logo mark (a sliced
// pomelo with radiating segments), rather than a generic megaphone.
const PomeloIcon = (
  <svg width="26" height="26" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="5" />
    <circle cx="50" cy="50" r="5" fill="white" />
    <line x1="50" y1="50" x2="50" y2="12" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <line x1="50" y1="50" x2="80" y2="30" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <line x1="50" y1="50" x2="80" y2="70" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <line x1="50" y1="50" x2="50" y2="88" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <line x1="50" y1="50" x2="20" y2="70" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <line x1="50" y1="50" x2="20" y2="30" stroke="white" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// Speaking head + sound waves, matching the reference logo Ethan supplied:
// indigo head silhouette, a small "network node" mark on the forehead, a
// teal mouth, and sound-wave arcs shading from teal to blue.
const SpeakWiseIcon = (
  <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
    <path
      d="M35 8c-17 0-30 14-30 32 0 12 6 22 15 27 3 2 4 6 3 10-1 3-3 6-3 9 0 3 2 5 5 5h4c3 0 5-2 6-5l2-7c1-3 3-5 6-6 13-4 22-16 22-32 0-18-13-33-30-33z"
      fill="#2E3192"
    />
    {/* forehead network mark */}
    <circle cx="27" cy="30" r="3.5" fill="#9AA3F0" />
    <circle cx="19" cy="42" r="3.5" fill="#9AA3F0" />
    <circle cx="25" cy="53" r="3.5" fill="#9AA3F0" />
    <path d="M27 30 19 42 25 53" stroke="#9AA3F0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* mouth */}
    <path d="M33 62q11 2 2 12-5-5-2-12z" fill="#16B8A6" />
    {/* sound waves, teal -> blue */}
    <path d="M52 55a13 13 0 0 0 0-20" stroke="#16B8A6" strokeWidth="6" strokeLinecap="round" />
    <path d="M62 62a26 26 0 0 0 0-34" stroke="#1CA8C2" strokeWidth="6" strokeLinecap="round" />
    <path d="M72 69a39 39 0 0 0 0-48" stroke="#249FE0" strokeWidth="6" strokeLinecap="round" />
    <path d="M84 76a54 54 0 0 0 0-62" stroke="#2E93F0" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

const CARDS = [
  {
    icon: SpeakWiseIcon,
    iconBg: 'linear-gradient(145deg,#F2F4FF,#E4E9FF)',
    title: 'SpeakWise',
    sub: 'AI Speech Therapy',
    delay: '0s',
    pos: { left: '3%', top: '4%' },
    href: '/projects/speakwise',
  },
  {
    icon: '🎤',
    iconBg: 'linear-gradient(145deg,#1a3a6b,#0a1a3a)',
    title: 'Eelocutionist',
    sub: 'AI Interview Coach',
    delay: '0.9s',
    pos: { left: '1%', top: '49%' },
    href: '/projects/eelocutionist',
  },
  {
    icon: '📈',
    iconBg: 'linear-gradient(145deg,#0D2A5C,#070F2A)',
    title: 'Zeitgeist',
    sub: 'AI Finance Systems',
    delay: '1.8s',
    pos: { right: '3%', bottom: '8%' },
    href: '/projects/zeitgeist',
  },
  {
    icon: PomeloIcon,
    iconBg: 'linear-gradient(145deg,#8B5CF6,#4C1D95)',
    title: 'PomeloLabs',
    sub: 'AI Marketing Team',
    delay: '2.7s',
    pos: { right: '3%', top: '4%' },
    href: '/projects/pomelo-labs',
  },
];

export default function HeroVisual() {
  const { resolvedTheme } = useTheme();
  const GREEN = resolvedTheme === 'dark' ? '#16A34A' : '#08874a';
  const [rot, setRot] = useState(0.5);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const angleRef = useRef(0.5);

  useEffect(() => {
    const loop = () => {
      angleRef.current += 0.004;
      setRot(angleRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => setMouse({
      x: (e.clientX / window.innerWidth - 0.5) * 0.4,
      y: (e.clientY / window.innerHeight - 0.5) * 0.3,
    });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  const pts = VERTS.map(v => project(v, rot + mouse.x, 0.22 + mouse.y));

  return (
    <div className="relative w-full h-[600px] overflow-hidden">

      {/* Green radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 68% 68% at 56% 50%, rgba(22, 163, 74,0.22) 0%, rgba(22, 163, 74,0.07) 40%, transparent 65%)',
        }}
      />

      {/* Icosahedron wireframe */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 9px rgba(22, 163, 74,0.7))' }}
      >
        {EDGES.map(([a, b], i) => {
          const va = pts[a], vb = pts[b];
          const avgZ = (va.z + vb.z) / 2;
          const opacity = Math.max(0.12, Math.min(0.95, (avgZ + 0.6) * 1.25));
          return (
            <line
              key={i}
              x1={va.px} y1={va.py}
              x2={vb.px} y2={vb.py}
              stroke={GREEN}
              strokeWidth="0.65"
              strokeLinecap="round"
              strokeOpacity={opacity}
            />
          );
        })}
      </svg>

      {/* Floating project cards */}
      {CARDS.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{ ...c.pos, animation: `heroFloat 3.2s ease-in-out infinite`, animationDelay: c.delay }}
        >
          <Link
            to={c.href}
            className="flex items-center gap-3 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-200"
            style={{
              padding: '12px 16px',
              background: 'rgba(9,9,13,0.92)',
              border: '1px solid rgba(255,255,255,0.09)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
              minWidth: '195px',
              textDecoration: 'none',
            }}
          >
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-xl text-xl"
              style={{ width: 48, height: 48, background: c.iconBg }}
            >
              {c.icon}
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px', lineHeight: 1.2 }}>{c.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginTop: 3 }}>{c.sub}</div>
            </div>
          </Link>
        </div>
      ))}

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
