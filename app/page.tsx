export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-warm-bg)]/90 backdrop-blur-sm border-b border-[var(--color-warm-border)]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-xl font-bold text-[var(--color-warm-accent)]">
            Purcell Ventures
          </a>
          <div className="hidden sm:flex gap-8 text-sm font-medium text-[var(--color-warm-text-muted)]">
            <a href="#services" className="hover:text-[var(--color-warm-accent)] transition-colors">Services</a>
            <a href="#work" className="hover:text-[var(--color-warm-accent)] transition-colors">Work</a>
            <a href="#about" className="hover:text-[var(--color-warm-accent)] transition-colors">About</a>
            <a href="#contact" className="hover:text-[var(--color-warm-accent)] transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[var(--color-warm-accent)] font-medium mb-4">Purcell Ventures LLC</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Websites, automation, and digital solutions that{" "}
            <span className="text-[var(--color-warm-accent)]">actually work.</span>
          </h1>
          <p className="text-lg text-[var(--color-warm-text-muted)] max-w-2xl mb-10 leading-relaxed">
            I build fast, professional websites and custom software tools for businesses
            who need results — not buzzwords. Based in Georgia, serving clients everywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[var(--color-warm-accent)] text-white font-medium rounded-lg hover:bg-[var(--color-warm-text)] transition-colors"
            >
              Get a Free Quote
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-[var(--color-warm-border)] text-[var(--color-warm-text-muted)] font-medium rounded-lg hover:border-[var(--color-warm-accent)] hover:text-[var(--color-warm-accent)] transition-colors"
            >
              See My Work
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">What I Build</h2>
          <p className="text-[var(--color-warm-text-muted)] mb-12 max-w-2xl">
            Every project is built with modern tools, optimized for speed, and designed to make your business look as good as it actually is.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Professional Websites",
                desc: "Clean, fast, mobile-friendly sites that convert visitors into customers. Built with modern frameworks and deployed on enterprise-grade infrastructure.",
                price: "Starting at $500",
              },
              {
                title: "Business Automation",
                desc: "Custom scripts and tools that eliminate repetitive work. Scheduling, invoicing, email automation, data processing — if it's manual, I can automate it.",
                price: "Starting at $200",
              },
              {
                title: "Web Applications",
                desc: "Full-stack apps with databases, user accounts, dashboards, and APIs. From internal tools to customer-facing products.",
                price: "Starting at $1,000",
              },
              {
                title: "Landing Pages",
                desc: "High-converting single-page sites for launches, events, or lead generation. Fast turnaround — often delivered in 48 hours.",
                price: "Starting at $300",
              },
              {
                title: "SEO & Optimization",
                desc: "Make sure people can actually find you. Google Business setup, search optimization, performance tuning, and analytics.",
                price: "Starting at $150",
              },
              {
                title: "Ongoing Support",
                desc: "Monthly retainers for updates, maintenance, content changes, and technical support. Your site stays current without you lifting a finger.",
                price: "$100/month",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-[var(--color-warm-card)] rounded-xl p-6 border border-[var(--color-warm-border)] hover:border-[var(--color-warm-accent-light)] transition-colors"
              >
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-[var(--color-warm-text-muted)] mb-4 leading-relaxed">
                  {service.desc}
                </p>
                <p className="text-sm font-medium text-[var(--color-warm-accent)]">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work / Portfolio */}
      <section id="work" className="py-20 px-6 bg-[var(--color-warm-card)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Recent Work</h2>
          <p className="text-[var(--color-warm-text-muted)] mb-12 max-w-2xl">
            A selection of projects I&apos;ve built. Each one solved a real problem for a real person.
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                title: "Scholarship Sniper",
                type: "Python CLI Tool",
                desc: "Automated scholarship finder with ROI analysis, deadline tracking, essay generation, and speed-apply tools. Built to close a $20K college funding gap.",
                tags: ["Python", "Web Scraping", "Automation", "CLI"],
              },
              {
                title: "Persona AI",
                type: "Mobile Application",
                desc: "Hyper-personalized AI companion app with chat, voice, calendar, fitness tracking, and daily check-ins. Full-stack mobile development.",
                tags: ["React Native", "Express", "AI/ML", "Mobile"],
              },
              {
                title: "Project Prowess",
                type: "Interactive Experience",
                desc: "Campus-wide cipher scavenger hunt featuring Caesar ciphers, steganography, Vigenere encryption, and an Enigma machine finale. Deployed at Lee University.",
                tags: ["Cryptography", "Game Design", "Education"],
              },
              {
                title: "Your Project Here",
                type: "Let's Build It",
                desc: "I'm always looking for interesting problems to solve. If you have a business that needs a website, a process that needs automating, or an idea that needs building — let's talk.",
                tags: ["Web Dev", "Automation", "Your Idea"],
              },
            ].map((project, i) => (
              <div
                key={i}
                className="bg-[var(--color-warm-bg)] rounded-xl p-8 border border-[var(--color-warm-border)]"
              >
                <p className="text-xs font-medium text-[var(--color-warm-accent)] uppercase tracking-wider mb-2">
                  {project.type}
                </p>
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-sm text-[var(--color-warm-text-muted)] mb-4 leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-xs px-3 py-1 rounded-full bg-[var(--color-warm-card)] border border-[var(--color-warm-border)] text-[var(--color-warm-text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="space-y-4 text-[var(--color-warm-text-muted)] leading-relaxed">
              <p>
                I&apos;m Elijah Purcell — an 18-year-old developer, entrepreneur, and incoming
                pre-med student at the University of Alabama. I founded Purcell Ventures LLC
                because I believe good software shouldn&apos;t be something only big companies can afford.
              </p>
              <p>
                I build with modern tools — React, Next.js, Python, AI integrations — and I
                deliver fast because I use the same cutting-edge AI development tools that
                top engineers at companies like Anthropic use. That means you get professional-grade
                work at a price that makes sense for small businesses, churches, and startups.
              </p>
              <p>
                When I&apos;m not coding, I&apos;m leading worship at my church, studying apologetics,
                or working on my long-term goal: an MD in Psychiatry focused on integrating
                AI with mental healthcare.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["React / Next.js", "Python", "TypeScript", "AI Integration", "React Native", "Tailwind CSS", "Node.js", "Web Scraping"].map((skill, i) => (
                <span
                  key={i}
                  className="text-sm px-4 py-2 rounded-lg bg-[var(--color-warm-card)] border border-[var(--color-warm-border)] font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 bg-[var(--color-warm-card)]">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together</h2>
            <p className="text-[var(--color-warm-text-muted)] mb-8 leading-relaxed">
              Have a project in mind? Need a website, an automation tool, or just want to
              talk about what&apos;s possible? Reach out and I&apos;ll get back to you within 24 hours.
            </p>
            <div className="space-y-4">
              <a
                href="mailto:elijah@purcellventures.com"
                className="flex items-center gap-3 text-lg font-medium text-[var(--color-warm-accent)] hover:text-[var(--color-warm-text)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                elijah@purcellventures.com
              </a>
              <p className="text-sm text-[var(--color-warm-text-muted)]">
                Based in Georgia — available for local and remote projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[var(--color-warm-border)]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-warm-text-muted)]">
          <p>&copy; {new Date().getFullYear()} Purcell Ventures LLC. All rights reserved.</p>
          <p>Built with Next.js &middot; Deployed on Vercel</p>
        </div>
      </footer>
    </div>
  );
}
