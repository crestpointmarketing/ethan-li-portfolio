import { useState, useEffect } from 'react';
import HeroVisual from '../components/HeroVisual';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import AchievementsSection from '../components/AchievementsSection';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <main className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full py-12 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <div className="lg:col-span-6 space-y-8">
              <div
                className={`space-y-6 transition-all duration-1000 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                {/* Name */}
                <h1
                  className="tracking-tight text-[96px]"
                  style={{
                    fontFamily: "'TASA Explorer', sans-serif",
                    fontWeight: 700,
                    lineHeight: 0.95
                  }}
                >Ethan Li</h1>

                {/* Title */}
                <h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[var(--foreground)]/90"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 600,
                    lineHeight: 1.2
                  }}
                >
                  AI Systems Builder for{' '}
                  <span className="text-[#08874a] dark:text-[#39FF14]">Real-World Problems</span>
                </h2>

                {/* Description */}
                <p className="text-base sm:text-lg md:text-xl text-[var(--muted-foreground)] max-w-xl leading-relaxed">
                  Rising senior at Highland Park High School building production-level AI systems
                  across speech, finance, and human-AI interaction.
                </p>
              </div>

              {/* CTA Buttons */}
              <div
                className={`flex flex-wrap gap-4 transition-all duration-1000 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <a
                  href="#projects"
                  className="group relative px-8 py-4 bg-[#08874a] dark:bg-[#39FF14] text-white dark:text-black rounded-lg font-medium transition-all duration-300 hover:bg-[#0a9d56] dark:hover:bg-[#5EFF35] hover:shadow-[0_0_30px_rgba(57, 255, 20,0.5)] hover:scale-105 inline-block"
                >
                  <span className="relative z-10">View Projects</span>
                  <div className="absolute inset-0 rounded-lg bg-[#0a9d56] dark:bg-[#5EFF35] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                </a>

                <a
                  href="#contact"
                  className="px-8 py-4 border border-[var(--border)] text-[var(--foreground)] rounded-lg font-medium transition-all duration-300 hover:border-[#08874a]/50 dark:hover:border-[#39FF14]/50 hover:bg-[var(--foreground)]/5 inline-block"
                >
                  Contact Me
                </a>
              </div>

              {/* Credibility Line */}
              <div
                className={`flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[var(--muted-foreground)] transition-all duration-1000 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14]" />
                  USACO Gold
                </span>
                <span className="text-[var(--muted-foreground)]/50 hidden sm:inline">|</span>
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14]" />
                  1540 SAT
                </span>
                <span className="text-[var(--muted-foreground)]/50 hidden sm:inline">|</span>
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#08874a] dark:bg-[#39FF14]" />
                  AI Systems & Full-Stack
                </span>
              </div>
            </div>

            {/* Right Visual */}
            <div
              className={`hidden lg:block lg:col-span-6 transition-all duration-1200 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <HeroVisual />
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-[var(--muted-foreground)]/50 uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-[var(--muted-foreground)]/30 to-transparent" />
          </div>
        </div>
      </main>

      {/* Additional Sections */}
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <AchievementsSection />
      <ContactSection />
    </>
  );
}
