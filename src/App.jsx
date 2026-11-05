import { useEffect, useMemo, useState } from 'react';
import LineHero from './components/LineHero';
import DotStudy from './components/DotStudy';
import StipplePad from './components/StipplePad';
import {
  profile, positioning, TAGS, experience, projects, skills, education,
  art, artworks, series, exhibitions,
} from './content';

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || null; } catch { return null; }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme) root.setAttribute('data-theme', theme);
    else root.removeAttribute('data-theme');
    try { theme ? localStorage.setItem('theme', theme) : localStorage.removeItem('theme'); } catch {}
  }, [theme]);
  const isDark = () =>
    theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  return { toggle: () => setTheme(isDark() ? 'light' : 'dark') };
}

function Nav({ onTheme }) {
  return (
    <header className="nav">
      <a href="#top" className="nav-mark" aria-label="Back to top">
        <span className="dot d1" /><span className="dot d2" /><span className="dot d3" />
        <span className="nav-name">Bhakti Ghaghda</span>
      </a>
      <nav className="nav-links" aria-label="Sections">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#art">Art</a>
        <a href="#contact">Contact</a>
      </nav>
      <button className="theme-btn" onClick={onTheme} aria-label="Toggle light or dark theme">
        <span className="theme-icon" />
      </button>
    </header>
  );
}

function SectionHead({ n, kicker, title, children }) {
  return (
    <div className="section-head">
      <p className="kicker"><span className="kicker-n">{n}</span>{kicker}</p>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function Filter({ value, onChange }) {
  const opts = ['All', ...TAGS];
  return (
    <div className="filter" role="tablist" aria-label="Filter by discipline">
      {opts.map((o) => (
        <button
          key={o}
          role="tab"
          aria-selected={value === o}
          className={`chip chip-${o.toLowerCase()} ${value === o ? 'is-on' : ''}`}
          onClick={() => onChange(o)}
        >
          {o !== 'All' && <span className="chip-dot" />}
          {o}
        </button>
      ))}
    </div>
  );
}

function Role({ job, filter }) {
  const bullets = filter === 'All' ? job.bullets : job.bullets.filter(([t]) => t === filter);
  if (!bullets.length) return null;
  return (
    <article className={`role ${job.earlier ? 'role-earlier' : ''}`}>
      <div className="role-meta">
        <p className="role-dates">{job.dates}</p>
        <p className="role-place">{job.place}</p>
      </div>
      <div className="role-body">
        <h3>
          {job.company}
          {job.note && <span className="role-note"> · {job.note}</span>}
        </h3>
        <p className="role-title">{job.title}</p>
        {job.summary && <p className="role-summary">{job.summary}</p>}
        {job.stats && filter === 'All' && (
          <div className="stats">
            {job.stats.map((s) => (
              <div key={s.label} className="stat"><strong>{s.value}</strong><span>{s.label}</span></div>
            ))}
          </div>
        )}
        <ul className="bullets">
          {bullets.map(([t, text]) => (
            <li key={text} className={`b-${(t || 'none').toLowerCase()}`}>
              {t && <span className="sr-only">{t}: </span>}
              {text}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Tech() {
  const [filter, setFilter] = useState('All');
  const visibleProjects = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter]
  );
  return (
    <section id="work" className="section">
      <SectionHead n="01" kicker="Product & engineering" title={positioning}>
        <Filter value={filter} onChange={setFilter} />
      </SectionHead>

      <div className="roles">
        {experience.map((job) => <Role key={job.company} job={job} filter={filter} />)}
      </div>

      <h3 className="sub-head">Selected projects</h3>
      <div className="projects">
        {visibleProjects.map((p, i) => (
          <article key={p.name} className="project" style={{ '--i': i }}>
            <div className="project-dots" aria-hidden="true">
              {p.tags.map((t) => <span key={t} className={`pd pd-${t.toLowerCase()}`} />)}
            </div>
            <h4>{p.name}</h4>
            <p className="project-role">{p.role}</p>
            <p>{p.blurb}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about">
      <SectionHead n="02" kicker="About" title="Engineer first, product lead now, painter throughout." />
      <div className="about-grid">
        <div className="about-bio">
          {profile.longBio.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        </div>
        <aside className="about-side">
          <h3 className="sub-head">Skills</h3>
          <dl className="skills">
            {skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
      <h3 className="sub-head">Education</h3>
      <div className="edu">
        {education.map((e) => (
          <article key={e.school} className="edu-item">
            <h4>{e.school}</h4>
            <p className="edu-degree">{e.degree}</p>
            <p className="edu-detail">{e.detail}</p>
            <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Art() {
  return (
    <section id="art" className="section art">
      <SectionHead n="03" kicker="Art" title={art.name}>
        <p className="lede">{art.intro}</p>
        <a className="link-arrow" href={profile.links.instagram} target="_blank" rel="noreferrer">
          Follow the work on Instagram {art.handle}
        </a>
      </SectionHead>

      <div className="works">
        {artworks.map((w) => (
          <figure key={w.title} className="work">
            <div className="work-frame">
              {w.image ? (
                <img src={w.image} alt={`${w.title}: ${w.description}`} loading="lazy" />
              ) : (
                <DotStudy seed={w.seed} motif={w.motif} palette={w.palette} label={`Dot study after ${w.title}`} />
              )}
              {w.status && <span className="work-status">{w.status}</span>}
            </div>
            <figcaption>
              <h4>{w.title}</h4>
              {(w.medium || w.size) && (
                <p className="work-medium">{[w.medium, w.size].filter(Boolean).join(' · ')}</p>
              )}
              <p>{w.description}</p>
              {w.note && <p className="work-note">{w.note}</p>}
              {!w.image && <p className="work-placeholder">Generated dot study · photograph to come</p>}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="series">
        <div>
          <h3 className="sub-head">{series.title}</h3>
          <p className="series-detail">{series.detail}</p>
          <p>{series.description}</p>
        </div>
        <ol className="series-grid" aria-label="Series progress">
          {series.pieces.map((p, i) => (
            <li key={i} className={`canvas-slot slot-${p.kind} ${p.done ? 'is-done' : ''}`}>
              <span className="slot-glyph" aria-hidden="true" />
              <span className="slot-label">{String(i + 1).padStart(2, '0')} · {p.kind}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="art-lower">
        <div>
          <h3 className="sub-head">Exhibitions</h3>
          <ul className="exhibitions">
            {exhibitions.map((x, i) => (
              <li key={i} className={x.upcoming ? 'is-upcoming' : ''}>
                <span className="ex-year">{x.year}</span>
                <span className="ex-main">
                  <strong>{x.title}</strong>
                  <span>{x.venue}</span>
                </span>
                {x.note && <span className={`ex-note ${x.highlight ? 'is-hl' : ''}`}>{x.note}</span>}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="sub-head">Try it: one dot at a time</h3>
          <p className="muted">
            Pointillism builds an image from thousands of small marks. Paint something here and save it.
          </p>
          <StipplePad />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = profile.links.email;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };
  return (
    <section id="contact" className="section contact">
      <SectionHead n="04" kicker="Contact" title="Say hello." />
      <p className="lede">
        Product roles, frontend work, original paintings and exhibition enquiries all come to the same inbox.
        For art, you can also DM {art.handle}.
      </p>
      <div className="contact-row">
        <a className="btn" href={`mailto:${email}`}>{email}</a>
        <button className="btn-ghost" onClick={copy}>{copied ? 'Copied ✓' : 'Copy email'}</button>
      </div>
      <ul className="socials">
        <li><a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
        <li><a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a></li>
        <li><a href={profile.links.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
      </ul>
    </section>
  );
}

export default function App() {
  const { toggle } = useTheme();
  return (
    <>
      <Nav onTheme={toggle} />
      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <h1 className="hero-name">{profile.name}</h1>
            <p className="hero-roles">{profile.roles.join(' · ')}</p>
            <p className="hero-bio">{profile.shortBio}</p>
            <p className="hero-links">
              <a href="#work">See the work</a>
              <a href="#art">See the paintings</a>
            </p>
          </div>
          <div className="hero-art">
            <LineHero label="Black-and-white line drawing of a girl working on a laptop at a desk" />
          </div>
        </section>
        <Tech />
        <About />
        <Art />
        <Contact />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Bhakti Ghaghda · {profile.location}</p>
        <p className="muted">Made dot by dot.</p>
      </footer>
    </>
  );
}
