export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-[var(--secondary)]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side - Content */}
          <div>
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '48px',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
              }}
            >
              Let's Build
              <br />
              <span className="text-[#08874a] dark:text-[#39FF14]">Something Great</span>
            </h2>

            <p className="text-lg text-[var(--muted-foreground)] mb-8 leading-relaxed">
              Interested in collaborating on AI systems, discussing technical projects, or exploring opportunities? I'd love to connect.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center group-hover:border-[#08874a]/50 dark:group-hover:border-[#39FF14]/50 transition-all duration-300">
                  <svg className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[#08874a] dark:group-hover:text-[#39FF14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-[var(--muted-foreground)]/70 mb-1">Email</div>
                  <a href="mailto:Ethanli2009@gmail.com" className="text-white hover:text-[#08874a] dark:hover:text-[#39FF14] transition-colors duration-300">
                    Ethanli2009@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center group-hover:border-[#08874a]/50 dark:group-hover:border-[#39FF14]/50 transition-all duration-300">
                  <svg className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[#08874a] dark:group-hover:text-[#39FF14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-[var(--muted-foreground)]/70 mb-1">Phone</div>
                  <a href="tel:972-809-7208" className="text-white hover:text-[#08874a] dark:hover:text-[#39FF14] transition-colors duration-300">
                    972-809-7208
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center group-hover:border-[#08874a]/50 dark:group-hover:border-[#39FF14]/50 transition-all duration-300">
                  <svg className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[#08874a] dark:group-hover:text-[#39FF14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-[var(--muted-foreground)]/70 mb-1">Location</div>
                  <span className="text-white">Dallas, TX</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10 pt-8 border-t border-[var(--border)]">
              <p className="text-sm text-[var(--muted-foreground)]/70 mb-4">Connect with me</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center hover:border-[#08874a]/50 dark:hover:border-[#39FF14]/50 hover:bg-[#08874a]/10 dark:hover:bg-[#39FF14]/10 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-[var(--muted-foreground)] hover:text-[#08874a] dark:hover:text-[#39FF14]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center hover:border-[#08874a]/50 dark:hover:border-[#39FF14]/50 hover:bg-[#08874a]/10 dark:hover:bg-[#39FF14]/10 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 text-[var(--muted-foreground)] hover:text-[#08874a] dark:hover:text-[#39FF14]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 lg:p-10">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            <form className="space-y-6">
              <div>
                <label className="block text-sm text-[var(--muted-foreground)] mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg text-white placeholder-white/30 focus:border-[#08874a]/50 dark:focus:border-[#39FF14]/50 focus:outline-none transition-colors duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--muted-foreground)] mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg text-white placeholder-white/30 focus:border-[#08874a]/50 dark:focus:border-[#39FF14]/50 focus:outline-none transition-colors duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--muted-foreground)] mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg text-white placeholder-white/30 focus:border-[#08874a]/50 dark:focus:border-[#39FF14]/50 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#08874a] dark:bg-[#39FF14] text-black rounded-lg font-medium transition-all duration-300 hover:bg-[#0a9d56] dark:hover:bg-[#5EFF35] hover:shadow-[0_0_30px_rgba(57, 255, 20,0.5)] hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-[var(--border)] text-center">
          <p className="text-[var(--muted-foreground)]/70 text-sm">
            © 2026 Ethan Li. Building AI systems for real-world impact.
          </p>
        </div>

      </div>
    </section>
  );
}
