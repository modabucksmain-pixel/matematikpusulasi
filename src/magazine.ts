// Magazine Viewer - Matematik Pusulası (Redesigned v2)
// Handles sidebar navigation, page loading, progress tracking and print

import './magazine-viewer.css';

const TOTAL_PAGES = 40;

const PAGE_TITLES: Record<number, string> = {
    1: 'Kapak', 2: 'İçindekiler', 3: 'Editörden',
    4: 'Matematik Tarihi 1', 5: 'Matematik Tarihi 2',
    6: 'Pi Sayısı', 7: 'Osmanlı Mat.', 8: 'İslam Mat.', 9: 'Euler Köprüleri',
    10: 'Cahit Arf', 11: 'El-Harezmi', 12: 'Hypatia', 13: 'Emmy Noether',
    14: 'Newton', 15: 'Turing', 16: 'Ramanujan',
    17: 'Altın Oran', 18: 'Fibonacci', 19: 'Fraktallar', 20: 'Evren & Mat.',
    21: 'AI & Matematik', 22: 'Teknoloji', 23: 'Kriptografi', 24: 'Oyun Teorisi',
    25: 'Günlük Hayat', 26: 'Spor & Mat.', 27: 'Müzik & Mat.', 28: 'Sanat & Mat.',
    29: 'Eğlenceli Gerçekler', 30: 'Mat. Sözlüğü', 31: 'Paradokslar',
    32: 'Sudoku', 33: 'Mantık Bulmaca', 34: 'Sayı Piramidi',
    35: 'Kakuro & KenKen', 36: 'Karışık Bulmaca',
    37: 'Kariyer Köşesi', 38: 'Gelecek Sayı', 39: 'Sonsöz', 40: 'Arka Kapak'
};

// SVG Icons
const ICONS = {
    arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>',
    print: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
    compass: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
};

// --- Build Top Bar ---
const topbar = document.createElement('div');
topbar.className = 'mag-topbar';
topbar.innerHTML = `
    <a href="/" class="mag-back" aria-label="Ana sayfaya dön">${ICONS.arrow} Ana Sayfa</a>
    <span class="mag-title">${ICONS.compass} Matematik Pusulası</span>
    <div class="top-bar-actions">
        <button class="action-btn" id="printBtn" aria-label="Dergiyi yazdır">${ICONS.print} Yazdır</button>
    </div>
`;
document.body.prepend(topbar);

// --- Progress Bar ---
const progressWrap = document.createElement('div');
progressWrap.className = 'reading-progress';
progressWrap.innerHTML = '<div class="reading-progress-bar" id="progressBar"></div>';
document.body.appendChild(progressWrap);

// --- Build Sidebar ---
const sidebar = document.createElement('div');
sidebar.className = 'mag-sidebar';
sidebar.setAttribute('role', 'navigation');
sidebar.setAttribute('aria-label', 'Sayfa navigasyonu');
document.getElementById('nav')!.replaceWith(sidebar);

// --- Build Content Area ---
const contentEl = document.getElementById('content')!;
contentEl.className = 'mag-content';

for (let i = 1; i <= TOTAL_PAGES; i++) {
    // Sidebar button
    const btn = document.createElement('a');
    btn.className = 'nav-btn';
    btn.textContent = String(i);
    btn.title = `Sayfa ${i}: ${PAGE_TITLES[i] || ''}`;
    btn.href = `#page-${i}`;
    btn.setAttribute('aria-label', `Sayfa ${i}: ${PAGE_TITLES[i] || ''}`);
    sidebar.appendChild(btn);

    // Page wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'page-wrapper';
    wrapper.id = `page-${i}`;

    const label = document.createElement('div');
    label.className = 'page-label';
    label.innerHTML = `<span class="pg-num">${i}</span> ${PAGE_TITLES[i] || ''}`;
    wrapper.appendChild(label);

    const iframe = document.createElement('iframe');
    iframe.src = `pages/sayfa${i}.html`;
    iframe.loading = i <= 5 ? 'eager' : 'lazy';
    iframe.title = `Sayfa ${i}: ${PAGE_TITLES[i] || ''}`;
    wrapper.appendChild(iframe);

    contentEl.appendChild(wrapper);
}

// --- Active page Observer ---
let currentPage = 1;
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            const pageNum = parseInt(id.replace('page-', ''));
            currentPage = pageNum;
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            const activeBtn = document.querySelector(`a[href="#${id}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
                // Scroll sidebar to show active button
                activeBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.page-wrapper').forEach(w => observer.observe(w));

// --- Smooth scroll ---
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const href = (btn as HTMLAnchorElement).getAttribute('href');
        if (href) {
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// --- Reading Progress ---
const progressBar = document.getElementById('progressBar') as HTMLElement;
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
}, { passive: true });

// --- Keyboard Navigation ---
const kbdHint = document.createElement('div');
kbdHint.className = 'kbd-hint';
kbdHint.innerHTML = '<kbd>←</kbd> <kbd>→</kbd> ile sayfa geçişi';
document.body.appendChild(kbdHint);

// Show hint briefly on load
setTimeout(() => { kbdHint.classList.add('visible'); }, 1500);
setTimeout(() => { kbdHint.classList.remove('visible'); }, 5000);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(currentPage + 1, TOTAL_PAGES);
        const target = document.querySelector(`#page-${next}`);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = Math.max(currentPage - 1, 1);
        const target = document.querySelector(`#page-${prev}`);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// --- Print ---
document.getElementById('printBtn')?.addEventListener('click', () => window.print());

// --- Hash on load ---
if (window.location.hash) {
    setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
}
