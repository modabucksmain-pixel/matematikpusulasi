// Magazine Viewer - Matematik Pusulası
// Handles sidebar navigation, page loading, view modes, and print

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

// --- Styles ---
const style = document.createElement('style');
style.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #525659; font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; color: #fff; display: flex; flex-direction: column; overflow-x: hidden; }

    .mag-topbar { position: fixed; top: 0; left: 0; right: 0; z-index: 200; background: #1e293b; display: flex; align-items: center; justify-content: space-between; padding: 0 1rem; height: 48px; box-shadow: 0 2px 10px rgba(0,0,0,.3); }
    .mag-back { color: #94a3b8; text-decoration: none; font-size: .85rem; font-weight: 600; }
    .mag-back:hover { color: #fff; }
    .mag-title { font-weight: 700; font-size: 1rem; }
    .top-bar-actions { display: flex; gap: .5rem; }
    .action-btn, .print-btn { background: #334155; border: none; color: #fff; border-radius: 6px; padding: .35rem .75rem; cursor: pointer; font-size: .85rem; font-weight: 600; transition: background .2s; }
    .action-btn:hover, .print-btn:hover { background: #d97706; }

    .mag-sidebar { position: fixed; left: 0; top: 48px; bottom: 0; width: 60px; background: #1e293b; overflow-y: auto; display: flex; flex-direction: column; align-items: center; padding: 10px 0; z-index: 100; }
    .mag-sidebar::-webkit-scrollbar { width: 5px; }
    .mag-sidebar::-webkit-scrollbar-thumb { background: #475569; border-radius: 3px; }
    .nav-btn { display: block; width: 40px; height: 40px; line-height: 40px; text-align: center; background: #334155; color: #fff; margin-bottom: 5px; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: bold; transition: all .2s; cursor: pointer; }
    .nav-btn:hover { background: #d97706; transform: scale(1.05); }
    .nav-btn.active { background: #d97706; box-shadow: 0 0 0 2px rgba(217,119,6,.3); }

    .mag-content { margin-left: 70px; margin-top: 58px; padding: 30px 20px; display: flex; flex-direction: column; align-items: center; width: calc(100% - 70px); }

    .page-wrapper { position: relative; margin-bottom: 40px; scroll-margin-top: 60px; }
    .page-label { color: #fff; font-size: 13px; font-weight: 500; opacity: .7; margin-bottom: 6px; }

    iframe { width: 210mm; height: 297mm; border: none; box-shadow: 0 10px 30px rgba(0,0,0,.5); background: #fff; display: block; }

    @media screen and (max-width: 768px) {
        .mag-sidebar { width: 50px; }
        .nav-btn { width: 35px; height: 35px; line-height: 35px; font-size: 11px; }
        .mag-content { margin-left: 60px; width: calc(100% - 60px); }
        iframe { width: 100%; height: auto; aspect-ratio: 210/297; }
    }

    @media print {
        .mag-topbar, .mag-sidebar, .page-label { display: none !important; }
        .mag-content { margin: 0; padding: 0; width: 100%; }
        .page-wrapper { margin: 0; page-break-after: always; break-after: page; }
        .page-wrapper:last-child { page-break-after: auto; }
        iframe { box-shadow: none; width: 210mm; height: 297mm; margin: 0; page-break-inside: avoid; }
        @page { size: A4 portrait; margin: 0; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    }
`;
document.head.appendChild(style);

// --- Build Pages ---
const nav = document.getElementById('nav')!;
const content = document.getElementById('content')!;

for (let i = 1; i <= TOTAL_PAGES; i++) {
    // Sidebar button
    const btn = document.createElement('a');
    btn.className = 'nav-btn';
    btn.textContent = String(i);
    btn.title = `Sayfa ${i}: ${PAGE_TITLES[i] || ''}`;
    btn.href = `#page-${i}`;
    nav.appendChild(btn);

    // Page wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'page-wrapper';
    wrapper.id = `page-${i}`;

    const label = document.createElement('div');
    label.className = 'page-label';
    label.textContent = `Sayfa ${i} — ${PAGE_TITLES[i] || ''}`;
    wrapper.appendChild(label);

    const iframe = document.createElement('iframe');
    iframe.src = `pages/sayfa${i}.html`;
    iframe.loading = i <= 5 ? 'eager' : 'lazy';
    iframe.title = `Sayfa ${i}`;
    wrapper.appendChild(iframe);

    content.appendChild(wrapper);
}

// --- Active page Observer ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            const activeBtn = document.querySelector(`a[href="#${id}"]`);
            if (activeBtn) activeBtn.classList.add('active');
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

// --- Print ---
document.getElementById('printBtn')?.addEventListener('click', () => window.print());

// --- Hash on load ---
if (window.location.hash) {
    setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
}
