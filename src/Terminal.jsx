import { useEffect, useRef, useState } from 'react'
import { person, links, projects, experience, skills, certs } from './data'

const L = (text, href) => ({ text, href })
const row = (label, value, href) => [label.padEnd(11), href ? L(value, href) : value]

const commands = {
  help: () => [
    'Available commands:',
    row('about', 'who I am'),
    row('skills', 'languages and tools'),
    row('projects', 'things I have built'),
    row('experience', 'internships and work'),
    row('education', 'degree and school'),
    row('certs', 'certifications'),
    row('contact', 'email and profiles'),
    row('clear', 'clear the screen'),
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
}

const QUICK = ['about', 'skills', 'projects', 'contact']

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
    { out: ['Welcome. Type help to see what you can ask, or use the buttons below.'] },
  ])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState([])
  const [cursor, setCursor] = useState(-1)
  const [isAutoTyping, setIsAutoTyping] = useState(false)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const typeIntervalRef = useRef(null)
  const typeTimeoutRef = useRef(null)

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, value])

  const stopAutoType = () => {
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current)
    if (typeTimeoutRef.current) clearTimeout(typeTimeoutRef.current)
    setIsAutoTyping(false)
  }

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    setHistory((h) => [...h, cmd])
    setCursor(-1)
    if (cmd === 'clear') return setLines([])
    const fn = commands[cmd]
    const out = fn ? fn() : ['Command not found: ' + cmd + '. Type help for the list.']
    setLines((l) => [...l, { cmd, out }])
  }

  const typeAndRun = (text, speed = 40) => {
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
        }, 220)
      }
    }, speed)
  }

  // Auto-play 'about' command on initial load
  useEffect(() => {
    typeTimeoutRef.current = setTimeout(() => {
      typeAndRun('about', 50)
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
    <div className="term">
      <div className="term-bar" aria-hidden="true">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="term-title">praveen@portfolio: ~</span>
      </div>
      <div
        className="term-body"
        ref={bodyRef}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        role="log"
        aria-live="polite"
      >
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
            placeholder={isAutoTyping ? '' : 'type a command (e.g. skills, projects)...'}
          />
        </form>
      </div>
      <div className="term-quick">
        {QUICK.map((c) => (
          <button key={c} type="button" onClick={() => typeAndRun(c, 35)}>
            {c}
          </button>
        ))}
        <button type="button" onClick={() => typeAndRun('help', 35)}>help</button>
      </div>
    </div>
  )
}

