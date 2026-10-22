import Terminal from './Terminal.jsx'
import { person, links, projects, experience, skills, certs } from './data'
import profilePhoto from './compresed.png'

export default function App() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <>
      <header className="nav">
        <a className="brand" href="#top">
          <img src={profilePhoto} alt="Praveen R S" className="brand-avatar" />
          <span>Praveen R S</span>
        </a>
        <nav aria-label="Sections">
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
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
                <span>Open to work & internships</span>
              </div>
            </div>
            <h1>{person.name}</h1>
            <p className="role">{person.role}</p>
            <p className="lede">{person.summary}</p>
            <div className="actions">
              <a className="btn primary" href="#projects">See my projects</a>
              <a className="btn" href={'mailto:' + links.email}>Email me</a>
            </div>
          </div>
          <Terminal />
        </section>

        <section id="projects" className="wrap section">
          <h2>Projects</h2>
          {featured.map((p) => (
            <article className="feature" key={p.name}>
              <h3>{p.name}</h3>
              <p className="tech">{p.tech}</p>
              <p>{p.text}</p>
            </article>
          ))}
          <ul className="rows">
            {rest.map((p) => (
              <li key={p.name}>
                <div className="row-head">
                  <h3>{p.name}</h3>
                  <span className="tech">{p.tech}</span>
                </div>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
          <p className="more">
            More code on <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>.
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
          <dl className="skills">
            {skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>
                  {s.items.map((i) => (
                    <span className="chip" key={i}>{i}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
          <h3 className="sub">Certifications</h3>
          <p>{certs.summary} Highlights:</p>
          <ul className="plain">
            {certs.highlights.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section id="contact" className="wrap section last">
          <h2>Contact</h2>
          <p>I am open to internships and entry-level roles. The quickest way to reach me is email.</p>
          <p className="mail">
            <a href={'mailto:' + links.email}>{links.email}</a>
          </p>
          <p className="socials">
            <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={links.hackerrank} target="_blank" rel="noreferrer">HackerRank</a>
            <a href={links.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
          </p>
        </section>
      </main>

      <footer className="foot wrap">Praveen©{new Date().getFullYear()}. Built with React.</footer>
    </>
  )
}
