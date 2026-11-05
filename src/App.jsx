import { useEffect, useState } from 'react';
import LineHero from './components/LineHero';
import DotStudy from './components/DotStudy';
import StipplePad from './components/StipplePad';
import {
  profile, positioning, TAGS, experience, skills, education,
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

function Dots({ tags }) {
  return (
    <span className="dots" aria-label={tags.join(', ')}>
      {tags.map((t) => <span key={t} className={`pd pd-${t.toLowerCase()}`} title={t} />)}
    </span>
  );
}

function Tech() {
  return (
    <section id="work" className="section">
      <SectionHead n="01" kicker="Work" title={positioning}>
        <p className="legend">
          {TAGS.map((t) => (
            <span key={t}><span className={`pd pd-${t.toLowerCase()}`} />{t}</span>
          ))}
        </p>
      </SectionHead>

      <ol className="places">
        {experience.map((job) => {
          const Name = job.link ? 'a' : 'span';
          return (
            <li key={job.company} className={`place ${job.link ? 'has-link' : ''}`}>
              <span className="place-dates">{job.dates}</span>
              <div className="place-main">
                <h3>
                  <Name
                    className="place-name"
                    {...(job.link ? { href: job.link, target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {job.company}
                    {job.link && <span className="place-arrow" aria-hidden="true">↗</span>}
                  </Name>
                  {job.note && <span className="place-note">{job.note}</span>}
                </h3>
                <p className="place-line">{job.line}</p>
              </div>
              <div className="place-side">
                <span className="place-title">{job.title}</span>
                <Dots tags={job.tags} />
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about">
      <SectionHead n="02" kicker="About" title="Engineer first, product lead now, painter throughout." />
      <div className="about-bio">
        {profile.longBio.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
      </div>
      <h3 className="sub-head">What I do</h3>
      <div className="skills">
        {skills.map((s) => (
          <article key={s.title} className={`skill skill-${s.tag.toLowerCase()}`}>
            <h4><span className={`pd pd-${s.tag.toLowerCase()}`} />{s.title}</h4>
            <p className="skill-line">{s.line}</p>
            <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </article>
        ))}
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
