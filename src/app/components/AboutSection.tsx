export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 lg:py-32 border-t border-[var(--border)]">
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
            Education
          </h2>
          <div className="w-20 h-1 bg-[#08874a] dark:bg-[#39FF14]" />
        </div>

        {/* Education Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left Column - School */}
          <div className="space-y-8">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Highland Park High School</h3>
                  <p className="text-[var(--muted-foreground)]">Dallas, TX</p>
                </div>
                <span className="text-sm text-[var(--muted-foreground)]/70">2023 - 2027</span>
              </div>
              <p className="text-[var(--foreground)]/90 mb-6">12th Grade (Fall 2026)</p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-[#08874a] dark:text-[#39FF14] mb-3">Academic Focus</h4>
                  <ul className="space-y-2 text-[var(--muted-foreground)]">
                    <li className="flex items-start gap-3">
                      <span className="text-[#08874a] dark:text-[#39FF14] mt-1">•</span>
                      <span>Computer Science & AI Systems Development</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#08874a] dark:text-[#39FF14] mt-1">•</span>
                      <span>AP Calculus BC — Advanced Mathematics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#08874a] dark:text-[#39FF14] mt-1">•</span>
                      <span>Multivariable Calculus (12th Grade, planned)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#08874a] dark:text-[#39FF14] mt-1">•</span>
                      <span>Latin I – IV (Classical Languages)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Standardized Tests & GPA */}
            <div className="pt-8 border-t border-[var(--border)]">
              <h4 className="text-lg font-medium mb-4">Standardized Tests & GPA</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--card)] rounded-lg p-4 border border-[var(--border)]">
                  <div className="text-3xl font-bold text-[#08874a] dark:text-[#39FF14] mb-1">1540</div>
                  <div className="text-sm text-[var(--muted-foreground)]">SAT</div>
                  <div className="text-xs text-[var(--muted-foreground)]/70 mt-2">EBRW: 750 | Math: 800</div>
                </div>
                <div className="bg-[var(--card)] rounded-lg p-4 border border-[var(--border)]">
                  <div className="text-3xl font-bold text-[#08874a] dark:text-[#39FF14] mb-1">5.52</div>
                  <div className="text-sm text-[var(--muted-foreground)]">Weighted GPA</div>
                  <div className="text-xs text-[var(--muted-foreground)]/70 mt-2">Highland Park HS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Certifications */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Certifications & Learning</h3>

              <div className="space-y-6">
                <div className="group hover:bg-[var(--card)] p-4 rounded-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Full-Stack Web Development Certificate</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">UT Austin</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-[var(--card)] p-4 rounded-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">CS50: Introduction to Computer Science</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">Harvard University</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-[var(--card)] p-4 rounded-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Introduction to Java (Grade A)</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">Johns Hopkins Center for Talented Youth</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-[var(--card)] p-4 rounded-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Competitive Programming Practice</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">LeetCode, Codeforces (C++, Python)</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-[var(--card)] p-4 rounded-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#08874a] dark:bg-[#39FF14] mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Prompt Engineering Bootcamp</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">Udemy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="pt-8 border-t border-[var(--border)]">
              <h4 className="text-lg font-medium mb-4">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Python', 'Java', 'JavaScript', 'TypeScript', 'C++',
                  'React', 'Node.js', 'Express.js', 'LLM Systems',
                  'Speech Processing', 'Docker', 'API Design',
                  'Dify', 'n8n', 'Prompt Engineering'
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs bg-[var(--card)] border border-[var(--border)] rounded-full text-[var(--foreground)]/90 hover:border-[#08874a]/50 dark:hover:border-[#39FF14]/50 hover:text-[#08874a] dark:hover:text-[#39FF14] transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
