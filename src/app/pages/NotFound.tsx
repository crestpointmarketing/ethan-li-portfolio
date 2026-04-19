import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1
          className="text-8xl mb-4 text-[#08874a] dark:text-[#39FF14]"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700
          }}
        >
          404
        </h1>
        <h2 className="text-3xl mb-6 text-[var(--foreground)]">Page Not Found</h2>
        <p className="text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-4 bg-[#08874a] dark:bg-[#39FF14] text-black rounded-lg font-medium transition-all duration-300 hover:bg-[#0a9d56] dark:hover:bg-[#5EFF35] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
