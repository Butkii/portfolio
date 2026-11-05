import { useCallback, useEffect, useRef, useState } from 'react';
import Scene, { HOTSPOTS } from './components/Scene';
import Panel from './components/Panel';
import InstagramProfile from './components/InstagramProfile';
import { profile, positioning, TAGS, experience, skills, education, art } from './content';

const IDS = HOTSPOTS.map((h) => h.id);
const TITLES = { work: 'Work', about: 'About', art: 'Art', contact: 'Contact' };
const MENU = ['work', 'about', 'art', 'contact'];

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
  return () => setTheme(isDark() ? 'light' : 'dark');
}

// Open panel is mirrored in the URL hash, so #work etc. are shareable and Back closes it.
function useHashPanel() {
  const read = () => {
    const h = window.location.hash.slice(1);
    return IDS.includes(h) ? h : null;
  };
  const [active, setActive] = useState(read);
  useEffect(() => {
    const onHash = () => setActive(read());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const open = useCallback((id) => {
    if (window.location.hash !== `#${id}`) window.location.hash = id;
    setActive(id);
  }, []);
  const close = useCallback(() => {
    history.replaceState(null, '', window.location.pathname + window.location.search);
    setActive(null);
  }, []);
  return [active, open, close];
}

function Dots({ tags }) {
  return (
    <span className="dots" aria-label={tags.join(', ')}>
      {tags.map((t) => <span key={t} className={`pd pd-${t.toLowerCase()}`} title={t} />)}
    </span>
  );
}

function Work() {
  return (
    <>
      <h2 className="p-title">{positioning}</h2>
      <p className="legend">
        {TAGS.map((t) => (
          <span key={t}><span className={`pd pd-${t.toLowerCase()}`} />{t}</span>
        ))}
      </p>
      <ol className="places">
        {experience.map((job) => {
          const Name = job.link ? 'a' : 'span';
          return (
            <li key={job.company} className={`place ${job.link ? 'has-link' : ''}`}>
              <p className="place-meta">
                <span>{job.dates}</span>
                <span>{job.title}</span>
                <Dots tags={job.tags} />
              </p>
              <h3>
                <Name className="place-name" {...(job.link ? { href: job.link, target: '_blank', rel: 'noreferrer' } : {})}>
                  {job.company}
                  {job.link && <span className="place-arrow" aria-hidden="true">↗</span>}
                </Name>
                {job.note && <span className="place-note">{job.note}</span>}
              </h3>
              <p className="place-line">{job.line}</p>
            </li>
          );
        })}
      </ol>
    </>
  );
}

function About() {
  return (
    <>
      <h2 className="p-title">Engineer first, product lead now, painter throughout.</h2>
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
    </>
  );
}

function Art() {
  return (
    <>
      <h2 className="p-title art-title">{art.name}</h2>
      <p className="lede">{art.intro}</p>
      <InstagramProfile handle={art.handle.replace('@', '')} />
    </>
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
    <>
      <h2 className="p-title">Let&rsquo;s grab a coffee.</h2>
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
    </>
  );
}

const CONTENT = { work: Work, about: About, art: Art, contact: Contact };

export default function App() {
  const toggleTheme = useTheme();
  const [active, open, close] = useHashPanel();
  // Keep the last panel's content mounted while it slides out.
  const [shown, setShown] = useState(active);
  const opener = useRef(null);

  useEffect(() => { if (active) setShown(active); }, [active]);

  // On wide screens, shrink the scene into the space left of the open panel
  // (instead of hiding the clicked object behind it).
  const stageRef = useRef(null);
  // On phones the scene is wider than the screen; start centred on her.
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = (el.scrollWidth - el.clientWidth) * 0.55;
  }, []);
  useEffect(() => {
    const fit = () => {
      const stage = stageRef.current;
      const scene = stage?.querySelector('.scene');
      if (!scene) return;
      const vw = window.innerWidth;
      const panel = Math.min(620, vw);
      const room = vw - panel - 48;
      stage.style.setProperty('--shift', `${-panel / 2}px`);
      stage.style.setProperty('--shrink', Math.min(1, room / scene.offsetWidth).toFixed(3));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const handleOpen = (id, el) => {
    opener.current = el || document.activeElement;
    open(id);
  };
  const handleClose = useCallback(() => {
    close();
    opener.current?.focus?.({ preventScroll: true });
  }, [close]);

  const Body = shown ? CONTENT[shown] : null;

  return (
    <div ref={stageRef} className={`stage ${active ? 'has-panel' : ''}`}>
      <header className="topbar">
        <div className="intro">
          <h1 className="name">{profile.name}</h1>
          <p className="roles">{profile.roles.join(' · ')}</p>
        </div>
        <nav className="menu" aria-label="Sections">
          {MENU.map((id) => (
            <button
              key={id}
              type="button"
              className={active === id ? 'is-active' : ''}
              aria-current={active === id ? 'true' : undefined}
              onClick={(e) => handleOpen(id, e.currentTarget)}
            >
              {TITLES[id]}
            </button>
          ))}
          <button type="button" className="theme-btn" onClick={toggleTheme} aria-label="Toggle light or dark theme">
            <span className="theme-icon" />
          </button>
        </nav>
      </header>

      <main className="desk" aria-label="Interactive desk">
        <div className="desk-scroll" ref={scrollRef}>
          <Scene active={active} onOpen={handleOpen} />
        </div>
      </main>

      <footer className="foot">
        <span>© {new Date().getFullYear()} Bhakti Ghaghda · {profile.location}</span>
      </footer>

      <Panel open={!!active} title={shown ? TITLES[shown] : ''} onClose={handleClose}>
        {Body && <Body />}
      </Panel>
    </div>
  );
}
