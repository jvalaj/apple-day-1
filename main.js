const cursor = document.querySelector('.cursor');
const toggleButton = document.querySelector('.nav__toggle-cursor');
let isCustomCursor = true;  // Start with custom cursor active
const cursorcircle = document.querySelector('.cursor');  // New: Select the image
const cursorIcon = document.querySelector('.cursorico');  // New: Select the image

// Responsive nav hamburger toggle
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.nav__hamburger');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('nav--open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      nav.classList.remove('nav--open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// Existing mouse move logic
document.addEventListener('mousemove', (e) => {
  if (isCustomCursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});
// New toggle logic
toggleButton.addEventListener('click', () => {
  isCustomCursor = !isCustomCursor;
  if (isCustomCursor) {
    cursorIcon.style.opacity = '1'; // Hide image when custom cursor is active
    cursorcircle.style.opacity = '1'; 
  } else {
    cursorcircle.style.opacity = '0';  // Show image when normal cursor is active
    cursorIcon.style.opacity = '0';
  }
});

//animations:// ...existing code...

// Collect any element that declares a data-animate attribute
const ioAnimatedEls = document.querySelectorAll('[data-animate]');

// Helper: convert "1s"/"750ms" -> milliseconds number
function toMs(val) {
  if (!val) return 0;
  return val.endsWith('ms') ? parseFloat(val) : parseFloat(val) * 1000;
}

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const animName = el.dataset.animate;                 // required
    const duration = el.dataset.duration || '0.9s';      // optional
    const easing = el.dataset.easing || 'ease-out';      // optional
    const delay = el.dataset.delay || '0s';              // optional
    const fill = el.dataset.fill || 'forwards';          // optional
    const iteration = el.dataset.iteration || '1';       // optional

    // Entrance animation
    const firstAnim = `${animName} ${duration} ${easing} ${delay} ${iteration} ${fill}`;
    el.style.animation = firstAnim;
    el.classList.add('is-animated');

    // Chain a float/hover loop if requested (data-float-after="floatPulse")
    if (el.dataset.floatAfter) {
      const floatName = el.dataset.floatAfter;
      const floatDur = el.dataset.floatDuration || '4s';
      const floatEase = el.dataset.floatEasing || 'ease-in-out';
      const floatDelay = el.dataset.floatDelay || '0s'; // usually 0
      const total = toMs(delay) + toMs(duration);

      setTimeout(() => {
        // Preserve completed first animation (it already ended & used forwards)
        el.style.animation = `${firstAnim}, ${floatName} ${floatDur} ${floatEase} ${floatDelay} infinite`;
      }, total);
    }

    io.unobserve(el);
  });
}, {
  threshold: 0.25,
  rootMargin: '0px 0px -10% 0px'
});

// Observe all declarative animated elements
ioAnimatedEls.forEach(el => io.observe(el));

// Optional: helper to apply stagger inside a container
function applyStagger(containerSelector, stepMs = 120) {
  const parent = document.querySelector(containerSelector);
  if (!parent) return;
  [...parent.querySelectorAll('[data-animate]')].forEach((el, i) => {
    if (!el.dataset.delay) el.dataset.delay = `${i * stepMs}ms`;
  });
}

// ...existing code...

/* Optional dynamic tuning for the moving glass (iPhone Air section)
  Uncomment to have JS compute travel distance instead of static CSS breakpoints.
  Logic: wider screens -> longer travel & slightly faster cycle. */
// (function dynamicGlassMotion(){
//   const media = document.querySelector('.section2-media');
//   if(!media) return;
//   function calc(){
//     const vw = window.innerWidth;
//     // travel factor scales between phone and very wide desktop
//     const travel = vw < 480 ? 110 : vw < 900 ? 200 : 280; // percent right target
//     const left = vw < 480 ? 0 : vw < 900 ? 10 : 25;       // percent left start
//     const dur = vw < 480 ? 8 : vw < 900 ? 6.5 : 5;        // seconds
//     media.style.setProperty('--x-left', left + '%');
//     media.style.setProperty('--x-right', travel + '%');
//     media.style.setProperty('--osc-duration', dur + 's');
//   }
//   calc();
//   window.addEventListener('resize', () => { requestAnimationFrame(calc); });
// })();

// ...existing code...

// Disable scroll/entrance animations on small screens
const isSmallScreen = window.matchMedia('(max-width:700px)').matches;
if (isSmallScreen) {
  document.documentElement.classList.add('no-anim-mobile');
}

// Collect any element that declares a data-animate attribute
if (!isSmallScreen) {
  const ioAnimatedEls = document.querySelectorAll('[data-animate]');

  function toMs(val) {
    if (!val) return 0;
    return val.endsWith('ms') ? parseFloat(val) : parseFloat(val) * 1000;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const animName = el.dataset.animate;
      const duration = el.dataset.duration || '0.9s';
      const easing = el.dataset.easing || 'ease-out';
      const delay = el.dataset.delay || '0s';
      const fill = el.dataset.fill || 'forwards';
      const iteration = el.dataset.iteration || '1';
      el.style.animation = `${animName} ${duration} ${easing} ${delay} ${iteration} ${fill}`;
      el.classList.add('is-animated');
      io.unobserve(el);
    });
  }, {
    threshold: 0.25,
    rootMargin: '0px 0px -10% 0px'
  });

  document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));
}

// ...existing code...