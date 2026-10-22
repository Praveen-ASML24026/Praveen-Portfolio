import { useEffect, useRef, useState } from 'react'
import { person, links, projects, experience, skills, certs } from './data'

const L = (text, href) => ({ text, href })
const row = (label, value, href) => [label.padEnd(11), href ? L(value, href) : value]

const aiResponses = [
  {
    triggers: ['why hire', 'hire you', 'why you', 'strength', 'value', 'fit'],
    response: [
      '🤖 [AI Praveen]: Why hire me?',
      '• Strong Java core: Object-oriented architecture, RSA encryption, Swing GUI, MySQL.',
      '• Hands-on AI/ML: Built MAX (local AI assistant) and trained XGBoost claim analysis models.',
      '• Practical industry exposure: Completed 3 internships (healthOmation, Corizo, AKTech).',
      '• Relentless learner: 150+ certifications across Microsoft, UiPath, Salesforce, and MongoDB.',
      '• Ready to contribute immediately to production software engineering teams.',
    ],
  },
  {
    triggers: ['java', 'spring', 'oop', 'backend'],
    response: [
      '🤖 [AI Praveen]: Java Expertise',
      '• Primary language for desktop & backend engineering.',
      '• Built an RSA 2048-bit asymmetric encrypted password manager in Java & MySQL.',
      '• Certified in Java Programming (Besant Technologies, 2025).',
      '• Passionate about clean architecture, multithreading, and algorithmic data structures.',
    ],
  },
  {
    triggers: ['python', 'ml', 'ai', 'max', 'machine learning', 'model', 'xgboost'],
    response: [
      '🤖 [AI Praveen]: AI & Machine Learning',
      '• Built "MAX": A local-first autonomous AI assistant for task planning and computer automation.',
      '• Machine learning at healthOmation: Built XGBoost models to predict insurance claim rejection reasons.',
      '• Computer Vision: Real-time OpenCV facial recognition attendance system.',
      '• Pursuing B.Tech in Artificial Intelligence & Machine Learning (AMET University).',
    ],
  },
  {
    triggers: ['internship', 'job', 'available', 'role', 'hire', 'work', 'open'],
    response: [
      '🤖 [AI Praveen]: Availability',
      '• I am actively seeking software development & AI/ML internships or entry-level roles.',
      '• Location: Chennai, India (open to on-site, hybrid, or remote).',
      '• Email me directly at praveen7200429516@gmail.com or leave a message below!',
    ],
  },
  {
    triggers: ['education', 'college', 'degree', 'university', 'study'],
    response: [
      '🤖 [AI Praveen]: Education',
      `• Degree: ${person.education.degree}`,
      `• Institution: ${person.education.school}`,
      `• Graduation: ${person.education.year}`,
    ],
  },
  {
    triggers: ['cert', 'certificate', 'credential'],
    response: [
      '🤖 [AI Praveen]: Certifications',
      `• ${certs.summary}`,
      ...certs.highlights.map((c) => '  - ' + c),
    ],
  },
]

const matchAiQuery = (query) => {
  const clean = query.toLowerCase()
  for (const item of aiResponses) {
    if (item.triggers.some((t) => clean.includes(t))) {
      return item.response
    }
  }
  return [
    '🤖 [AI Praveen]: I am Praveen\'s interactive portfolio assistant.',
    'You can ask me questions like:',
    '  - "why should we hire you?"',
    '  - "what is your Java experience?"',
    '  - "tell me about MAX and AI projects"',
    '  - "are you open to internships?"',
    'Or type "help" for a list of standard Unix-like commands.',
  ]
}

const commands = {
  help: () => [
    'Available commands:',
    row('about', 'who I am and background'),
    row('skills', 'languages, frameworks, tools'),
    row('projects', 'featured and recent projects'),
    row('experience', 'internships and work history'),
    row('education', 'degree and university'),
    row('certs', '150+ verified certifications'),
    row('contact', 'email, GitHub, LinkedIn'),
    row('resume', 'view resume summary'),
    row('ask <q>', 'ask AI Praveen any question'),
    row('coffee', 'brew a fresh cup of Java'),
    row('matrix', 'enter the matrix'),
    row('theme', 'switch terminal color theme'),
    row('sudo', 'super-user privilege check'),
    row('clear', 'clear terminal output'),
  ],
  about: () => [person.name, person.role, '', person.summary],
  skills: () => skills.map((s) => row(s.group, s.items.join(', '))),
  projects: () =>
    projects.flatMap((p) => [[p.name, '  (' + p.tech + ')'], '  ' + p.text, '']),
  experience: () =>
    experience.flatMap((e) => [
      [e.title + ', ' + e.org + (e.when ? '  (' + e.when + ')' : '')],
      '  ' + e.text,
      '',
    ]),
  education: () => [person.education.degree, person.education.school + ', ' + person.education.year],
  certs: () => [certs.summary, '', ...certs.highlights],
  contact: () => [
    row('email', links.email, 'mailto:' + links.email),
    row('github', links.github.replace('https://', ''), links.github),
    row('linkedin', links.linkedin.replace('https://www.', ''), links.linkedin),
    row('hackerrank', links.hackerrank.replace('https://www.', ''), links.hackerrank),
    row('leetcode', links.leetcode.replace('https://', ''), links.leetcode),
  ],
  resume: () => [
    '═══════════════════════════════════════════════════════════',
    '  PRAVEEN R S — SOFTWARE DEVELOPER & AI/ML ENGINEER',
    '═══════════════════════════════════════════════════════════',
    `Degree: ${person.education.degree}`,
    `School: ${person.education.school} (${person.education.year})`,
    'Languages: Java, Python, JavaScript, HTML, CSS',
    'AI / ML: XGBoost, OpenCV, Local LLM Tooling',
    'Databases: MySQL, MongoDB',
    'Experience: 3 Internships (healthOmation, Corizo, AKTech)',
    'Certifications: 150+ (Besant Java, Salesforce, Microsoft, UiPath)',
    'Status: Ready for Summer 2026 / Entry-Level Roles',
    '═══════════════════════════════════════════════════════════',
  ],
  coffee: () => [
    '      (  )   (   )  )',
    '       ) (   )  (  (',
    '       ( )  (    ) )',
    '       _____________',
    '      <_____________> ___',
    '      |             |/ _ \\',
    '      |  Java Brew  | | | |',
    '      |   Coffee    |_| | |',
    '      |             |\\___/',
    '      \\_____________/',
    '  Fresh cup of Java brewed for you! ☕',
  ],
  sudo: () => [
    '[sudo] password for recruiter: **********',
    'ACCESS GRANTED. Root permissions enabled. Welcome aboard!',
  ],
}

const QUICK = ['about', 'skills', 'projects', 'resume', 'coffee', 'matrix']

const part = (p, i) =>
  typeof p === 'string' ? (
    <span key={i}>{p}</span>
  ) : (
    <a key={i} href={p.href} target="_blank" rel="noreferrer">
      {p.text}
    </a>
  )

const renderLine = (line) => (Array.isArray(line) ? line.map(part) : part(line, 0))

export default function Terminal() {
  const [lines, setLines] = useState([
    { out: ['Welcome. Type help, ask any question to AI Praveen, or click a button below.'] },
  ])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState([])
  const [cursor, setCursor] = useState(-1)
  const [isAutoTyping, setIsAutoTyping] = useState(false)
  const [theme, setTheme] = useState('default') // default, matrix, amber
  const [isMatrixActive, setIsMatrixActive] = useState(false)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const typeIntervalRef = useRef(null)
  const typeTimeoutRef = useRef(null)

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, value, isMatrixActive])

  const stopAutoType = () => {
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current)
    if (typeTimeoutRef.current) clearTimeout(typeTimeoutRef.current)
    setIsAutoTyping(false)
  }

  const run = (raw) => {
    const cmd = raw.trim()
    if (!cmd) return
    const lower = cmd.toLowerCase()
    setHistory((h) => [...h, cmd])
    setCursor(-1)

    if (lower === 'clear') return setLines([])

    if (lower === 'matrix') {
      setIsMatrixActive(true)
      setLines((l) => [
        ...l,
        { cmd, out: ['Wake up, Neo...', 'The Matrix has you.', 'Follow the white rabbit. 🐇'] },
      ])
      setTimeout(() => {
        setIsMatrixActive(false)
        setLines((l) => [
          ...l,
          { out: ['[MATRIX]: Simulation complete. Welcome back to Praveen\'s reality.'] },
        ])
      }, 4500)
      return
    }

    if (lower === 'theme') {
      const themes = ['default', 'matrix', 'amber']
      const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length]
      setTheme(nextTheme)
      setLines((l) => [...l, { cmd, out: [`Switched terminal theme to: ${nextTheme}`] }])
      return
    }

    if (lower.startsWith('ask ')) {
      const q = cmd.slice(4).trim()
      const out = matchAiQuery(q)
      setLines((l) => [...l, { cmd, out }])
      return
    }

    if (commands[lower]) {
      const out = commands[lower]()
      setLines((l) => [...l, { cmd, out }])
      return
    }

    // Freeform question fallback to AI Praveen
    if (
      lower.includes('why') ||
      lower.includes('java') ||
      lower.includes('python') ||
      lower.includes('ai') ||
      lower.includes('intern') ||
      lower.includes('who') ||
      lower.includes('hire') ||
      lower.includes('cert') ||
      lower.includes('degree') ||
      lower.endsWith('?')
    ) {
      const out = matchAiQuery(cmd)
      setLines((l) => [...l, { cmd, out }])
      return
    }

    setLines((l) => [
      ...l,
      { cmd, out: [`Command not found: "${cmd}". Type "help" or ask AI Praveen a question.`] },
    ])
  }

  const typeAndRun = (text, speed = 35) => {
    stopAutoType()
    setIsAutoTyping(true)
    setValue('')
    let idx = 0

    typeIntervalRef.current = setInterval(() => {
      idx++
      setValue(text.slice(0, idx))

      if (idx >= text.length) {
        clearInterval(typeIntervalRef.current)
        typeTimeoutRef.current = setTimeout(() => {
          run(text)
          setValue('')
          setIsAutoTyping(false)
        }, 200)
      }
    }, speed)
  }

  // Auto-play 'about' on initial load
  useEffect(() => {
    typeTimeoutRef.current = setTimeout(() => {
      typeAndRun('about', 45)
    }, 750)

    return () => stopAutoType()
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    stopAutoType()
    run(value)
    setValue('')
  }

  const onKeyDown = (e) => {
    stopAutoType()
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault()
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1)
      setCursor(next)
      setValue(history[next])
    } else if (e.key === 'ArrowDown' && cursor !== -1) {
      e.preventDefault()
      const next = cursor + 1
      if (next >= history.length) {
        setCursor(-1)
        setValue('')
      } else {
        setCursor(next)
        setValue(history[next])
      }
    }
  }

  return (
    <div className={`term theme-${theme}`}>
      <div className="term-bar" aria-hidden="true">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="term-title">praveen@portfolio: ~ (AI Shell)</span>
        <button
          type="button"
          className="term-theme-btn"
          onClick={() => {
            const themes = ['default', 'matrix', 'amber']
            setTheme(themes[(themes.indexOf(theme) + 1) % themes.length])
          }}
          title="Toggle Terminal Theme"
        >
          theme: {theme}
        </button>
      </div>

      <div
        className={`term-body ${isMatrixActive ? 'matrix-running' : ''}`}
        ref={bodyRef}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        role="log"
        aria-live="polite"
      >
        {isMatrixActive && (
          <div className="matrix-overlay" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, col) => (
              <span key={col} className="matrix-stream">
                01010110PraveenAI01Java1011ML010100101
              </span>
            ))}
          </div>
        )}

        {lines.map((entry, i) => (
          <div className="term-entry" key={i}>
            {entry.cmd && (
              <div className="term-cmd">
                <span className="prompt">$</span> {entry.cmd}
              </div>
            )}
            {entry.out.map((line, j) => (
              <div className="term-line" key={j}>
                {renderLine(line) || '\u00a0'}
              </div>
            ))}
          </div>
        ))}
        <form className="term-input" onSubmit={onSubmit}>
          <label htmlFor="term-field" className="prompt">$</label>
          <input
            id="term-field"
            ref={inputRef}
            value={value}
            onChange={(e) => {
              stopAutoType()
              setValue(e.target.value)
            }}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Terminal command"
            placeholder={isAutoTyping ? '' : 'Ask AI Praveen a question or type a command...'}
          />
        </form>
      </div>

      <div className="term-quick">
        {QUICK.map((c) => (
          <button key={c} type="button" onClick={() => typeAndRun(c, 30)}>
            {c}
          </button>
        ))}
        <button
          type="button"
          className="quick-ai"
          onClick={() => typeAndRun('ask why should I hire you?', 25)}
        >
          🤖 why hire?
        </button>
        <button type="button" onClick={() => typeAndRun('help', 30)}>help</button>
      </div>
    </div>
  )
}
