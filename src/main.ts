// ============================================
// UNDERGROUND NAVY BLUE MAGAZINE WEBSITE
// Main TypeScript Entry Point
// ============================================

import '../style.css';

// ---- Particle Network Canvas ----
class ParticleNetwork {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouse = { x: -1000, y: -1000 };
  private w = 0;
  private h = 0;
  private animId = 0;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
    this.init();
    this.animate();
  }

  private resize() {
    this.w = this.canvas.width = window.innerWidth;
    this.h = this.canvas.height = window.innerHeight;
  }

  private init() {
    const count = Math.min(100, Math.floor((this.w * this.h) / 12000));
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(this.w, this.h));
    }
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.w, this.h);

    for (const p of this.particles) {
      p.update(this.w, this.h, this.mouse);
      p.draw(this.ctx);
    }

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.15 * (1 - dist / 120)})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    this.animId = requestAnimationFrame(this.animate);
  };

  destroy() {
    cancelAnimationFrame(this.animId);
  }
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.size = Math.random() * 2 + 0.5;
    this.baseAlpha = Math.random() * 0.5 + 0.2;
  }

  update(w: number, h: number, mouse: { x: number; y: number }) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > w) this.vx = -this.vx;
    if (this.y < 0 || this.y > h) this.vy = -this.vy;

    // Mouse repulsion
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      this.x += dx * 0.02;
      this.y += dy * 0.02;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 212, 255, ${this.baseAlpha})`;
    ctx.fill();
  }
}

// ---- Scroll Reveal Animation ----
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// ---- Navbar Scroll Shrink ----
function initNavbar() {
  const nav = document.querySelector('.navbar') as HTMLElement;
  if (!nav) return;


  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

  });

  // Mobile toggle
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    // Close on link click
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('active');
      })
    );
  }
}

// ---- Smooth Scroll ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const id = (anchor as HTMLAnchorElement).getAttribute('href')!;
      const el = document.querySelector(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---- Accordion for Answers ----
function initAccordion() {
  document.querySelectorAll('.acc-header').forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.parentElement!;
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.acc-item').forEach((i) => i.classList.remove('open'));

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

// ---- Glitch Text Effect ----
function initGlitch() {
  const el = document.querySelector('.glitch') as HTMLElement;
  if (!el) return;
  const text = el.getAttribute('data-text') || el.textContent || '';
  el.setAttribute('data-text', text);
}

// ---- Counter Animation ----
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = parseInt(el.getAttribute('data-target') || '0');
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => observer.observe(c));
}

function animateCounter(el: HTMLElement, target: number) {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toString();
  }, 20);
}

// ---- Tilt Effect on Cards ----
function initTilt() {
  document.querySelectorAll('.tilt-card').forEach((card) => {
    const el = card as HTMLElement;
    el.addEventListener('mousemove', (e: Event) => {
      const me = e as MouseEvent;
      const rect = el.getBoundingClientRect();
      const x = me.clientX - rect.left;
      const y = me.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) * 6;
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// ---- Initialize Everything ----
document.addEventListener('DOMContentLoaded', () => {
  // Particle canvas
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    new ParticleNetwork('particle-canvas');
  }

  initScrollReveal();
  initNavbar();
  initSmoothScroll();
  initAccordion();
  initGlitch();
  initCounters();
  initTilt();
});
