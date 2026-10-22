import { useState, useEffect } from 'react'
import Terminal from './Terminal.jsx'
import { person, links, projects, experience, skills, certs } from './data'
import profilePhoto from './compresed.png'

export default function App() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  const [activeSkill, setActiveSkill] = useState(null)
  const [msgName, setMsgName] = useState('')
  const [msgBody, setMsgBody] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const [copied, setCopied] = useState(false)
  const [timeStr, setTimeStr] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Scroll Progress and Back-to-Top visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)))
      }
      setShowBackToTop(window.scrollY > 380)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Live Chennai Time (IST)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const formatter = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        setTimeStr(formatter.format(now))
      } catch {
        setTimeStr('IST')
      }
    }
    updateTime()
    const timer = setInterval(updateTime, 30000)
    return () => clearInterval(timer)
  }, [])

  // Keyboard shortcut: '/' to focus terminal, 'Escape' to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowResume(false)
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault()
        const termInput = document.getElementById('term-field')
        if (termInput) {
          termInput.focus()
          termInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(links.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isMatch = (p) => {
    if (!activeSkill) return true
    const term = activeSkill.toLowerCase()
    return (
      (p.tags && p.tags.some((t) => t.toLowerCase() === term)) ||
      (p.tech && p.tech.toLowerCase().includes(term)) ||
      (p.text && p.text.toLowerCase().includes(term))
    )
  }

  const filteredFeatured = featured.filter(isMatch)
  const filteredRest = rest.filter(isMatch)
  const totalCount = filteredFeatured.length + filteredRest.length

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!msgBody.trim()) return
    const subject = encodeURIComponent(`Portfolio Message from ${msgName || 'Visitor'}`)
    const body = encodeURIComponent(`Hi Praveen,\n\n${msgBody}\n\nFrom: ${msgName}`)
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <>
      {copied && (
        <div className="toast-notification" role="status" aria-live="polite">
          <span>✓ Email copied to clipboard!</span>
        </div>
      )}

      {/* Resume Preview Modal */}
      {showResume && (
        <div className="modal-backdrop" onClick={() => setShowResume(false)} role="dialog" aria-modal="true">
          <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
            <div className="resume-header-bar">
              <div className="resume-title">
                <span>📄 Praveen_R_S_Resume.pdf</span>
              </div>
              <div className="resume-actions">
                <button type="button" className="btn primary print-btn" onClick={() => window.print()}>
                  🖨️ Print / Save as PDF
                </button>
                <button type="button" className="btn-close" onClick={() => setShowResume(false)} title="Close (Esc)">
                  ✕
                </button>
              </div>
            </div>

            <div className="resume-paper" id="resume-document">
              <header className="resume-doc-header">
                <h2>{person.name}</h2>
                <p className="resume-role">{person.role}</p>
                <p className="resume-contacts">
                  Chennai, India • <a href={'mailto:' + links.email}>{links.email}</a> •{' '}
                  <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> •{' '}
                  <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
                </p>
              </header>

              <section className="resume-section">
                <h3>Executive Summary</h3>
                <p>{person.summary}</p>
              </section>

              <section className="resume-section">
                <h3>Education</h3>
                <div className="resume-item">
                  <div className="resume-item-head">
                    <strong>{person.education.degree}</strong>
                    <span>{person.education.year}</span>
                  </div>
                  <p>{person.education.school}</p>
                </div>
              </section>

              <section className="resume-section">
                <h3>Technical Skills</h3>
                <p><strong>Languages:</strong> Java (OOP, Swing, Multithreading), Python, JavaScript, HTML5, CSS3</p>
                <p><strong>Frameworks & AI:</strong> React, XGBoost, OpenCV, Local LLM Tooling</p>
                <p><strong>Databases & Tools:</strong> MySQL, MongoDB, Git, GitHub, VS Code, Docker, Linux</p>
              </section>

              <section className="resume-section">
                <h3>Experience & Internships</h3>
                {experience.map((e) => (
                  <div className="resume-item" key={e.title + e.org}>
                    <div className="resume-item-head">
                      <strong>{e.title} — {e.org}</strong>
                      {e.when && <span>{e.when}</span>}
                    </div>
                    <p>{e.text}</p>
                  </div>
                ))}
              </section>

              <section className="resume-section">
                <h3>Key Engineered Projects</h3>
                {projects.slice(0, 4).map((p) => (
                  <div className="resume-item" key={p.name}>
                    <div className="resume-item-head">
                      <strong>{p.name}</strong>
                      <span className="tech">({p.tech})</span>
                    </div>
                    <p>{p.text}</p>
                  </div>
                ))}
              </section>

              <section className="resume-section">
                <h3>Certifications</h3>
                <p>{certs.summary}</p>
                <ul>
                  {certs.highlights.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Top Scroll Reading Progress */}
      <div
        className="scroll-progress-line"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className="nav">
        <a className="brand" href="#top">
          <img src={profilePhoto} alt="Praveen R S" className="brand-avatar" />
          <span>Praveen R S</span>
        </a>
        <div className="nav-center-widget" title="Current Local Time in Chennai, India">
          <span className="live-dot" />
          <span>Chennai, IN • {timeStr}</span>
        </div>
        <nav aria-label="Sections">
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <span className="kbd-hint" title="Press / to focus terminal">Press /</span>
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap">
          <div className="hero-copy">
            <div className="hero-profile-badge">
              <div className="hero-avatar-frame">
                <img src={profilePhoto} alt="Praveen R S" className="hero-avatar" />
                <span className="status-indicator" title="Open to opportunities"></span>
              </div>
              <div className="hero-status-pill">
                <span className="pulse-dot"></span>
                <span>Open for 2026 Internships & Full-Time Roles</span>
              </div>
            </div>
            <h1>{person.name}</h1>
            <p className="role">{person.role}</p>
            <p className="lede">{person.summary}</p>
            <div className="actions">
              <a className="btn primary" href="#projects">See my projects</a>
              <button type="button" className="btn resume-btn" onClick={() => setShowResume(true)}>
                📄 View Resume
              </button>
              <button type="button" className="btn icon-btn" onClick={copyEmail} title="Copy Email to Clipboard">
                📋 Copy Email
              </button>
            </div>
          </div>
          <Terminal />
        </section>

        {/* Developer Metrics Strip */}
        <section className="metrics-strip wrap" aria-label="Career Highlights">
          <div className="metric-card">
            <div className="metric-number">150+</div>
            <div className="metric-label">Certifications</div>
            <div className="metric-desc">Salesforce, Microsoft, Java, MongoDB</div>
          </div>
          <div className="metric-card">
            <div className="metric-number">3</div>
            <div className="metric-label">Industry Internships</div>
            <div className="metric-desc">healthOmation, Corizo, AKTech</div>
          </div>
          <div className="metric-card">
            <div className="metric-number">6+</div>
            <div className="metric-label">Projects</div>
            <div className="metric-desc">Java, AI/ML, Cryptography & Systems</div>
          </div>
          <div className="metric-card">
            <div className="metric-number">2027</div>
            <div className="metric-label">B.Sc Graduation</div>
            <div className="metric-desc">AMET University, Chennai</div>
          </div>
        </section>

        <section id="projects" className="wrap section">
          <div className="section-head">
            <h2>Projects</h2>
            {activeSkill && (
              <div className="filter-pill-active">
                <span>Filter: <strong>{activeSkill}</strong> ({totalCount} found)</span>
                <button
                  type="button"
                  className="btn-clear-filter"
                  onClick={() => setActiveSkill(null)}
                  title="Clear filter"
                >
                  ✕ Clear
                </button>
              </div>
            )}
          </div>

          {totalCount === 0 && (
            <div className="no-projects">
              <p>No projects currently tagged with <strong>"{activeSkill}"</strong>.</p>
              <button type="button" className="btn" onClick={() => setActiveSkill(null)}>
                Show All Projects
              </button>
            </div>
          )}

          {filteredFeatured.map((p) => (
            <article className="feature" key={p.name}>
              <div className="feature-head">
                <h3>{p.name}</h3>
                <div className="project-actions">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="btn-code-link">
                      Code ↗
                    </a>
                  )}
                  {p.featured && <span className="featured-badge">Featured</span>}
                </div>
              </div>
              <p className="tech">{p.tech}</p>
              <p>{p.text}</p>
              {p.tags && (
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={`tag-chip ${activeSkill === t ? 'active' : ''}`}
                      onClick={() => setActiveSkill((prev) => (prev === t ? null : t))}
                      title={`Filter by ${t}`}
                    >
                      #{t}
                    </button>
                  ))}
                </div>
              )}
            </article>
          ))}

          <ul className="rows">
            {filteredRest.map((p) => (
              <li key={p.name}>
                <div className="row-head">
                  <h3>{p.name}</h3>
                  <div className="row-actions">
                    <span className="tech">{p.tech}</span>
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="btn-code-link">
                        Code ↗
                      </a>
                    )}
                  </div>
                </div>
                <p>{p.text}</p>
                {p.tags && (
                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <button
                        type="button"
                        key={t}
                        className={`tag-chip ${activeSkill === t ? 'active' : ''}`}
                        onClick={() => setActiveSkill((prev) => (prev === t ? null : t))}
                        title={`Filter by ${t}`}
                      >
                        #{t}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <p className="more">
            More code and repos on <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>.
          </p>
        </section>

        <section id="experience" className="wrap section">
          <h2>Experience</h2>
          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.title + e.org}>
                <div className="row-head">
                  <h3>{e.title}, {e.org}</h3>
                  {e.when && <span className="tech">{e.when}</span>}
                </div>
                <p>{e.text}</p>
              </li>
            ))}
          </ol>
          <div className="edu">
            <h3>{person.education.degree}</h3>
            <p>{person.education.school}. {person.education.year}.</p>
          </div>
        </section>

        <section id="skills" className="wrap section">
          <h2>Skills</h2>
          <p className="skills-subtext">Click any skill to filter matching projects above:</p>
          <dl className="skills">
            {skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>
                  {s.items.map((i) => (
                    <button
                      type="button"
                      className={`chip ${activeSkill === i ? 'active' : ''}`}
                      key={i}
                      onClick={() => {
                        setActiveSkill((prev) => (prev === i ? null : i))
                        const el = document.getElementById('projects')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }}
                      title={`Filter projects using ${i}`}
                    >
                      {i}
                    </button>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
          
          <h3 className="sub">Certifications & Credentials</h3>
          <p className="certs-summary">{certs.summary}</p>
          <div className="certs-grid">
            {certs.items.map((c) => (
              <div className="cert-card" key={c.title}>
                <div className="cert-top">
                  <span className="cert-icon">{c.icon}</span>
                  <span className="cert-badge">{c.category}</span>
                </div>
                <h4 className="cert-title">{c.title}</h4>
                <div className="cert-meta">
                  <span className="cert-issuer">{c.issuer}</span>
                  <span className="cert-year">{c.year}</span>
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub" style={{ marginTop: '48px' }}>Coding & Problem Solving Profiles</h3>
          <div className="profiles-strip">
            <div className="profile-card">
              <div className="profile-card-left">
                <span className="profile-icon">⚡</span>
                <div>
                  <h4>LeetCode</h4>
                  <p>DSA, problem solving & algorithmic challenges</p>
                </div>
              </div>
              <a href={links.leetcode} target="_blank" rel="noreferrer" className="btn-profile-link">
                Profile ↗
              </a>
            </div>

            <div className="profile-card">
              <div className="profile-card-left">
                <span className="profile-icon">🏆</span>
                <div>
                  <h4>HackerRank</h4>
                  <p>Verified certificates in Java, Python & SQL</p>
                </div>
              </div>
              <a href={links.hackerrank} target="_blank" rel="noreferrer" className="btn-profile-link">
                Profile ↗
              </a>
            </div>

            <div className="profile-card">
              <div className="profile-card-left">
                <span className="profile-icon">🐙</span>
                <div>
                  <h4>GitHub</h4>
                  <p>Open source code, repositories & contributions</p>
                </div>
              </div>
              <a href={links.github} target="_blank" rel="noreferrer" className="btn-profile-link">
                Profile ↗
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="wrap section last">
          <h2>Contact</h2>
          <p>I am open to internships, full-time roles, and collaborative projects. Feel free to leave a message below or email directly.</p>

          <div className="contact-grid">
            <div className="contact-info">
              <p className="mail">
                <a href={'mailto:' + links.email}>{links.email}</a>
              </p>
              <div className="socials">
                <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
                <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={links.hackerrank} target="_blank" rel="noreferrer">HackerRank</a>
                <a href={links.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
              </div>
            </div>

            <form className="contact-card" onSubmit={handleSendMessage}>
              <h3>Leave a Message</h3>
              <div className="field-group">
                <label htmlFor="msg-name">Your Name</label>
                <input
                  id="msg-name"
                  type="text"
                  placeholder="e.g. John Doe / Recruiter"
                  value={msgName}
                  onChange={(e) => setMsgName(e.target.value)}
                  required
                />
              </div>
              <div className="field-group">
                <label htmlFor="msg-body">Message</label>
                <textarea
                  id="msg-body"
                  rows="4"
                  placeholder="Hi Praveen, I would love to connect regarding..."
                  value={msgBody}
                  onChange={(e) => setMsgBody(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn primary send-btn">
                <span>Send Message</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
              {submitted && <p className="form-feedback">Opening your email app to send...</p>}
            </form>
          </div>
        </section>
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          className="btn-back-to-top"
          onClick={scrollToTop}
          title="Back to top"
          aria-label="Back to top"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}

      <footer className="foot wrap">Praveen©{new Date().getFullYear()}. Built with React.</footer>
    </>
  )
}
