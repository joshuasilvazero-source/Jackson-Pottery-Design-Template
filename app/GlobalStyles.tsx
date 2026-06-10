export default function GlobalStyles() {
  return (
    <style>{`
      /* ── Design tokens (light) ─────────────────────────────────────────── */
      :root {
        --font-playfair: 'Playfair Display', Georgia, serif;
        --font-manrope:  'Manrope', system-ui, sans-serif;

        --bg:         #FFFFFF;
        --bg-surface: #F4F4F4;
        --bg-card:    #FFFFFF;
        --charcoal:   #333333;
        --graphite:   #333333;
        --light-gray: #F4F4F4;
        --warm-gray:  rgba(51,51,51,0.15);
        --stone-gray: rgba(51,51,51,0.25);
        --muted:      rgba(51,51,51,0.55);
        --border:     rgba(51,51,51,0.15);
        --text:       #333333;
        --text-muted: rgba(51,51,51,0.55);
      }


      /* ── Reset ─────────────────────────────────────────────────────────── */
      * { box-sizing: border-box; padding: 0; margin: 0; }

      html {
        scroll-behavior: smooth;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      body {
        background-color: var(--bg);
        color: var(--text);
        font-family: var(--font-manrope), system-ui, sans-serif;
        overflow-x: hidden;
        font-size: 15px;
        line-height: 1.6;
      }

      button { cursor: pointer; border: none; background: none; }
      a { color: inherit; text-decoration: none; }
      img { display: block; }

      /* ── Scrollbar ─────────────────────────────────────────────────────── */
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: var(--bg-surface); }
      ::-webkit-scrollbar-thumb { background: var(--warm-gray); border-radius: 2px; }
      ::-webkit-scrollbar-thumb:hover { background: var(--stone-gray); }

      ::selection {
        background: rgba(51, 51, 51, 0.10);
        color: var(--charcoal);
      }

      /* ── Utility ────────────────────────────────────────────────────────── */
      .image-zoom { overflow: hidden; }
      .image-zoom img { transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
      .image-zoom:hover img { transform: scale(1.04); }

      .glass-card {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }

      /* ── Animations ────────────────────────────────────────────────────── */
      @keyframes heroCinematicMobile {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      .hero-cinematic-mobile {
        opacity: 0;
        animation: heroCinematicMobile 2.5s ease-in-out forwards;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }

      @keyframes heroCinematicDesktop {
        0%   { opacity: 0; transform: scale(1.07) translateZ(0); }
        18%  { opacity: 1; }
        100% { opacity: 1; transform: scale(1.0) translateZ(0); }
      }
      .hero-cinematic-desktop {
        opacity: 0;
        will-change: transform;
        transform: scale(1.07) translateZ(0);
        animation: heroCinematicDesktop 22s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }
    `}</style>
  )
}
