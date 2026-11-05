import { useEffect, useRef } from 'react';

// Side panel (bottom sheet on small screens) that holds one part of the site.
export default function Panel({ open, title, onClose, children }) {
  const closeRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    bodyRef.current?.scrollTo(0, 0);
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, title, onClose]);

  return (
    <>
      <div className={`scrim ${open ? 'is-open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside
        className={`panel ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!open}
        inert={open ? undefined : ''}
      >
        <header className="panel-head">
          <p className="panel-title">{title}</p>
          <button ref={closeRef} type="button" className="panel-close" onClick={onClose} aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <div className="panel-body" ref={bodyRef}>{children}</div>
      </aside>
    </>
  );
}
