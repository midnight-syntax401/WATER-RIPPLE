@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Playfair+Display:wght@400&display=swap");

:root {
  color-scheme: dark;
  font-family: "DM Sans", sans-serif;
  background: #061b2b;
  color: #e4f1ed;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  min-width: 320px;
  height: 100%;
  margin: 0;
  overflow: hidden;
}

body {
  min-height: 100vh;
  min-height: 100dvh;
}

.experience {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  isolation: isolate;
  background: linear-gradient(145deg, #071b31 0%, #0c3544 58%, #28695f 100%);
}

.water {
  position: absolute;
  inset: 0;
  z-index: -1;
  display: block;
  width: 100%;
  height: 100%;
  touch-action: none;
  outline: none;
}

.intro {
  position: absolute;
  top: clamp(2.5rem, 9vh, 6rem);
  left: 50%;
  width: max-content;
  max-width: calc(100% - 2rem);
  text-align: center;
  transform: translateX(-50%);
  pointer-events: none;
}

.eyebrow {
  margin: 0 0 0.75rem;
  color: rgb(219 241 232 / 68%);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-family: "Playfair Display", Georgia, serif;
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 400;
  letter-spacing: 0.025em;
  line-height: 1;
}

.hint {
  position: absolute;
  right: 1.5rem;
  bottom: max(2rem, env(safe-area-inset-bottom));
  left: 1.5rem;
  margin: 0;
  color: rgb(223 241 234 / 72%);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-align: center;
  pointer-events: none;
}

@media (max-width: 480px) {
  .intro {
    top: 12vh;
  }

  .hint {
    font-size: 0.68rem;
  }
}
