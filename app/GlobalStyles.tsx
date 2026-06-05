export default function GlobalStyles() {
  return (
    <style>{`
      /* ── Design tokens ─────────────────────────────────────────────────── */
      :root {
        --font-playfair: 'Playfair Display', Georgia, serif;
        --font-manrope:  'Manrope', system-ui, sans-serif;

        --charcoal:   #333333;
        --graphite:   #1F1F1F;
        --light-gray: #F4F4F4;
        --warm-gray:  #D6D3CE;
        --stone-gray: #B8B4AE;
        --muted:      #7A7672;
        --border:     #D6D3CE;
      }

      /* ── Reset ─────────────────────────────────────────────────────────── */
      * { box-sizing: border-box; padding: 0; margin: 0; }

      html {
        scroll-behavior: smooth;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      body {
        background-color: #FFFFFF;
        color: var(--charcoal);
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
      ::-webkit-scrollbar-track { background: var(--light-gray); }
      ::-webkit-scrollbar-thumb { background: var(--warm-gray); border-radius: 2px; }
      ::-webkit-scrollbar-thumb:hover { background: var(--stone-gray); }

      ::selection { background: rgba(51, 51, 51, 0.10); color: var(--charcoal); }

      /* ── Utility classes ───────────────────────────────────────────────── */
      .image-zoom { overflow: hidden; }
      .image-zoom img { transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
      .image-zoom:hover img { transform: scale(1.04); }

      .dark-section {
        background-color: var(--charcoal);
        color: #FFFFFF;
      }

      .text-gradient-charcoal {
        background: linear-gradient(135deg, #2B2B2B 0%, #4A4A4A 50%, #2B2B2B 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .glass-card {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }

      .hover-lift {
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                    box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .hover-lift:hover {
        transform: translateY(-3px);
        box-shadow: 0 16px 50px rgba(0, 0, 0, 0.22);
      }

      /* ── Animations ────────────────────────────────────────────────────── */
      .image-reveal {
        animation: imageReveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      @keyframes imageReveal {
        from { clip-path: inset(0 100% 0 0); }
        to   { clip-path: inset(0 0% 0 0); }
      }

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
        100% { opacity: 1; transform: scale(1.0)  translateZ(0); }
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
