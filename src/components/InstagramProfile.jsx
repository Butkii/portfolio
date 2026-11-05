import { useEffect, useRef, useState } from 'react';

// Instagram's own profile embed: header plus the latest six posts.
// It updates by itself whenever a new post goes up. The embed lays out a
// fixed-height header and a 3-column grid, so height follows width.
const HEADER = 158;

export default function InstagramProfile({ handle }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(520);

  useEffect(() => {
    const el = ref.current;
    const ro = new ResizeObserver(([e]) => setHeight(Math.round(HEADER + (e.contentRect.width / 3) * 2 + 6)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <figure className="ig" ref={ref}>
      <iframe
        title={`@${handle} on Instagram`}
        src={`https://www.instagram.com/${handle}/embed/`}
        height={height}
        loading="lazy"
        scrolling="no"
        allowtransparency="true"
      />
      <figcaption>
        <a href={`https://www.instagram.com/${handle}/`} target="_blank" rel="noreferrer">
          Open @{handle} on Instagram ↗
        </a>
      </figcaption>
    </figure>
  );
}
