export default function AchievementsSection() {
  const achievements = [
    {
      category: 'Science & Engineering',
      awards: [
        {
          title: 'HPHS SciTech Fair',
          achievement: '1st Place & Jay Ingram Award',
          description: 'Top recognition for AI-Powered Speech Therapy Platform'
        },
        {
          title: 'Dallas Regional Science & Engineering Fair (DRSEF)',
          achievement: 'Honorable Mention (Top 4)',
          description: 'Regional recognition in senior division'
        }
      ]
    },
    {
      category: 'Academic & Leadership',
      awards: [
        {
          title: 'Scholastic Writing Awards',
          achievement: 'Regional Silver Key',
          description: 'Recognition for exceptional writing and communication'
        },
        {
          title: 'Youth Board of Governors',
          achievement: 'Member — Computer Science Chapter',
          description: 'Asian Culture and Education Society USA'
        },
        {
          title: 'AI Club & Coding Interest Group',
          achievement: 'Active Member',
          description: 'Leadership in student technical organizations'
        }
      ]
    },
    {
      category: 'Service & Impact',
      awards: [
        {
          title: "President's Volunteer Service Award",
          achievement: 'Gold',
          description: 'Recognition for 100+ hours of community service'
        },
        {
          title: 'International Service Honor Recognition',
          achievement: 'Gold Award',
          description: 'Global recognition for service and leadership'
        }
      ]
    },
    {
      category: 'Technical Development',
      awards: [
        {
          title: 'Hackathon — Prompt Design & Agentic AI Systems',
          achievement: 'Participant',
          description: 'Summer 2025 advanced AI systems development'
        },
        {
          title: 'USACO (USA Computing Olympiad)',
          achievement: 'Gold Division',
          description: 'Advanced competitive programming achievement'
        }
      ]
    },
    {
      category: 'CTY — Johns Hopkins University',
      awards: [
        {
          title: 'Talent Search Qualification',
          achievement: 'Advanced CTY-Level Verbal · CTY-Level Math · Advanced CTY-Level Math',
          description: 'Eligible across all three identification levels — gifted program recognition'
        },
        {
          title: 'Diagnosis: Be the Doctor (DDOC)',
          achievement: 'Successful Completion',
          description: 'Jan 2024 – Mar 2024'
        },
        {
          title: 'Biotechnology (BIOT)',
          achievement: 'Successful Completion',
          description: 'Jun 2024 – Jul 2024'
        },
        {
          title: 'Introduction to Java (IJAQ)',
          achievement: 'Grade: A',
          description: 'Nov 2024 – Mar 2025'
        }
      ]
    }
  ];

  return (
    <section id="achievements" className="relative py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Section Header */}
        <div className="mb-16">
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '48px',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}
          >
            Achievements
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-2xl">
            Recognition in science fairs, academic competitions, leadership, and community service
          </p>
          <div className="w-20 h-1 bg-[#08874a] dark:bg-[#39FF14] mt-6" />
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {achievements.map((category, index) => (
            <div
              key={index}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 hover:border-[#08874a]/30 dark:hover:border-[#39FF14]/30 transition-all duration-500"
            >
              <h3 className="text-xl font-semibold text-[#08874a] dark:text-[#39FF14] mb-6">
                {category.category}
              </h3>

              <div className="space-y-6">
                {category.awards.map((award, i) => (
                  <div key={i} className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                      <div className="flex-1">
                        <h4 className="font-medium text-[var(--foreground)] mb-1 group-hover:text-[#08874a] dark:group-hover:text-[#39FF14] transition-colors duration-300">
                          {award.title}
                        </h4>
                        <p className="text-sm text-[#08874a]/90 dark:text-[#39FF14]/90 mb-1">
                          {award.achievement}
                        </p>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          {award.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-[#08874a]/10 dark:from-[#39FF14]/10 to-transparent border border-[#08874a]/20 dark:border-[#39FF14]/20 rounded-xl p-6 text-center">
            <div
              className="text-4xl lg:text-5xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              3
            </div>
            <div className="text-sm text-[var(--muted-foreground)]">Major Projects</div>
          </div>

          <div className="bg-gradient-to-br from-[#08874a]/10 dark:from-[#39FF14]/10 to-transparent border border-[#08874a]/20 dark:border-[#39FF14]/20 rounded-xl p-6 text-center">
            <div
              className="text-4xl lg:text-5xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              1st
            </div>
            <div className="text-sm text-[var(--muted-foreground)]">Place Awards</div>
          </div>

          <div className="bg-gradient-to-br from-[#08874a]/10 dark:from-[#39FF14]/10 to-transparent border border-[#08874a]/20 dark:border-[#39FF14]/20 rounded-xl p-6 text-center">
            <div
              className="text-4xl lg:text-5xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              100+
            </div>
            <div className="text-sm text-[var(--muted-foreground)]">Service Hours</div>
          </div>

          <div className="bg-gradient-to-br from-[#08874a]/10 dark:from-[#39FF14]/10 to-transparent border border-[#08874a]/20 dark:border-[#39FF14]/20 rounded-xl p-6 text-center">
            <div
              className="text-4xl lg:text-5xl font-bold text-[#08874a] dark:text-[#39FF14] mb-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Gold
            </div>
            <div className="text-sm text-[var(--muted-foreground)]">USACO Division</div>
          </div>
        </div>

      </div>
    </section>
  );
}
