import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src="/logo.png"
                alt="Ethan Li"
                className="h-10 w-auto dark:invert"
              />
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: '/#about', label: 'About' },
              { href: '/#projects', label: 'Projects' },
              { href: '/#achievements', label: 'Achievements' },
              { href: '/#contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-300 relative group"
                style={{ fontSize: '18px', lineHeight: 1.2, whiteSpace: 'nowrap' }}
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#08874a] dark:bg-[#39FF14] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button & Theme Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <button className="hidden sm:block px-5 py-2.5 border border-[#08874a]/30 dark:border-[#39FF14]/30 text-[#08874a] dark:text-[#39FF14] text-sm rounded-lg font-medium transition-all duration-300 hover:bg-[#08874a]/10 dark:hover:bg-[#39FF14]/10 hover:border-[#0a9d56]/70 dark:hover:border-[#5EFF35]/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Contact
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border)]">
            <div className="flex flex-col gap-4">
              <a
                href="/#about"
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/#projects"
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </a>
              <a
                href="/#achievements"
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Achievements
              </a>
              <a
                href="/#contact"
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <button className="sm:hidden px-5 py-2.5 border border-[#08874a]/30 dark:border-[#39FF14]/30 text-[#08874a] dark:text-[#39FF14] text-sm rounded-lg font-medium transition-all duration-300 hover:bg-[#08874a]/10 dark:hover:bg-[#39FF14]/10 hover:border-[#0a9d56]/70 dark:hover:border-[#5EFF35]/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] text-left">
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
