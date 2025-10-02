// Progressive enhancement: small modules, no frameworks.

// ScrollReveal: fade/slide in when visible
class ScrollReveal {
  constructor(el) { this.el = el; }
  mount() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.el.style.opacity = 0;
    this.el.style.transform = 'translateY(12px)';
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          this.el.style.transition = 'opacity 500ms ease, transform 600ms ease';
          requestAnimationFrame(() => {
            this.el.style.opacity = 1;
            this.el.style.transform = 'translateY(0)';
          });
          obs.unobserve(this.el);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(this.el);
  }
}

// Marquee: subtle, GPU-cheap horizontal drift
class Marquee {
  constructor(el) { this.el = el; this.list = el.querySelector('.marquee__list'); this._r = null; this._x = 0; }
  mount() {
    if (!this.list || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tick = () => {
      this._x -= 0.2; // adjust speed
      this.list.style.transform = `translateX(${this._x}px)`;
      this._r = requestAnimationFrame(tick);
    };
    this._r = requestAnimationFrame(tick);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this._r) cancelAnimationFrame(this._r);
      else this._r = requestAnimationFrame(tick);
    });
  }
}

// Boot: attach controllers by data-module
// Glass cursor: follows pointer and reacts to interactive elements
class GlassCursor {
  constructor(el) { this.el = el; this._boundMove = this.onMove.bind(this); this._raf = null; this._x = 0; this._y = 0; this._hx = 0; this._hy = 0; }
  mount() {
    if (!('PointerEvent' in window) || matchMedia('(hover: none)').matches) return;
    const update = () => {
      // simple easing for smoother motion
      this._hx += (this._x - this._hx) * 0.22;
      this._hy += (this._y - this._hy) * 0.22;
      this.el.style.transform = `translate(${this._hx}px, ${this._hy}px) translate(-50%, -50%) scale(${this.el.classList.contains('is-hover') ? 1.25 : 1})`;
      this._raf = requestAnimationFrame(update);
    };
    window.addEventListener('pointermove', this._boundMove, { passive: true });
    // Hover detection on interactive elements
    const hoverables = 'a, button, [role="button"], .btn, input, select, textarea';
    document.addEventListener('pointerover', (e) => {
      if (e.target.closest(hoverables)) this.el.classList.add('is-hover');
    }, true);
    document.addEventListener('pointerout', (e) => {
      if (e.target.closest(hoverables)) this.el.classList.remove('is-hover');
    }, true);
    // Show cursor after first move
    this.el.style.opacity = '0';
    requestAnimationFrame(() => this.el.style.opacity = '1');
    this._raf = requestAnimationFrame(update);
  }
  onMove(e) { this._x = e.clientX; this._y = e.clientY; }
}

const modules = { ScrollReveal, Marquee, GlassCursor };
document.querySelectorAll('[data-module]').forEach(el => {
  const name = el.dataset.module;
  const Ctor = modules[name];
  if (Ctor) new Ctor(el).mount();
});
