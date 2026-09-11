/**
 * LIGHTWEIGHTPARKA.COM — TECHNICAL CORE JAVASCRIPT ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initSearchModal();
  initFaqAccordion();
  initPackabilityCalculator();
  initReadingProgressBar();
  initBackToTop();
});

/* 1. Mobile Drawer Navigation */
function initMobileDrawer() {
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (!toggle || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1181 && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* 2. Instant Search Modal */
function initSearchModal() {
  const triggers = document.querySelectorAll('.search-trigger-btn');
  const modal = document.querySelector('.search-modal-backdrop');
  const input = document.querySelector('.search-modal-input');
  const resultsContainer = document.querySelector('.search-modal-results');

  if (!modal || !input || !resultsContainer) return;

  const siteSearchIndex = [
    { title: "Ultralight Packable Parka (7D)", url: "/#collection", desc: "Sub-135g technical mountain weather shell with 20,000mm hydrostatic head." },
    { title: "Hydrostatic Head & Membrane Physics", url: "/blog/hydrostatic-head-membrane-physics.html", desc: "Deep study on water column resistance and microporous ePTFE mechanics." },
    { title: "RET Breathability & MVTR Standards", url: "/blog/ret-breathability-moisture-vapor-transmission.html", desc: "ISO 11092 sweating guarded hot-plate testing and microclimate regulation." },
    { title: "Ripstop Denier Weaves & Ballistic Strength", url: "/blog/ripstop-nylon-denier-tensile-strength.html", desc: "Grid-stop architecture in 7D, 15D, and 20D Cordura technical textiles." },
    { title: "Ultrasonic Seam Welding & 8mm Micro-Tape", url: "/blog/ultrasonic-welding-seam-tape-engineering.html", desc: "Molecular fabric fusion eliminating needle holes for complete stormproofing." },
    { title: "C0 Fluorocarbon-Free DWR Chemistry", url: "/blog/dwr-c0-fluorocarbon-free-hydrophobicity.html", desc: "Non-toxic surface tension engineering for persistent water beading." },
    { title: "Storm Hood Kinematics & Vision Fields", url: "/blog/storm-hood-kinematics-peripheral-vision.html", desc: "Co-axial cinch systems delivering unobstructed 180-degree peripheral vision." },
    { title: "Technical Outerwear Care Protocols", url: "/#care", desc: "Restoring DWR, washing membrane laminates, and lifetime maintenance." }
  ];

  function openSearch() {
    modal.classList.add('open');
    input.focus();
    renderResults(siteSearchIndex);
  }

  function closeSearch() {
    modal.classList.remove('open');
    input.value = '';
  }

  triggers.forEach(btn => btn.addEventListener('click', openSearch));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeSearch();
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      renderResults(siteSearchIndex);
      return;
    }
    const filtered = siteSearchIndex.filter(item => 
      item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
    );
    renderResults(filtered);
  });

  function renderResults(list) {
    if (list.length === 0) {
      resultsContainer.innerHTML = '<p style="color: var(--text-muted); padding: 1rem; text-align: center;">No matching technical specifications found.</p>';
      return;
    }
    resultsContainer.innerHTML = list.map(item => `
      <a href="${item.url}" class="search-result-item">
        <strong style="display: block; color: var(--text-primary); font-size: 0.95rem;">${item.title}</strong>
        <span style="font-size: 0.82rem; color: var(--text-secondary);">${item.desc}</span>
      </a>
    `).join('');
  }
}

/* 3. FAQ Accordion */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* 4. Packability & Weight Calculator */
function initPackabilityCalculator() {
  const fabricSelect = document.getElementById('calc-fabric');
  const sizeSelect = document.getElementById('calc-size');
  const outputWeight = document.getElementById('calc-output-weight');
  const outputVol = document.getElementById('calc-output-volume');

  if (!fabricSelect || !sizeSelect || !outputWeight || !outputVol) return;

  function calculate() {
    const fabricBase = parseFloat(fabricSelect.value) || 120;
    const sizeMultiplier = parseFloat(sizeSelect.value) || 1.0;

    const totalWeight = Math.round(fabricBase * sizeMultiplier);
    const totalVolume = (totalWeight * 3.8 / 1000).toFixed(2);

    outputWeight.textContent = totalWeight + ' g';
    outputVol.textContent = totalVolume + ' L';
  }

  fabricSelect.addEventListener('change', calculate);
  sizeSelect.addEventListener('change', calculate);
  calculate();
}

/* 5. Reading Progress Bar (Blog Posts) */
function initReadingProgressBar() {
  const bar = document.querySelector('.reading-progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const progress = (window.scrollY / docHeight) * 100;
    bar.style.width = Math.min(100, Math.max(0, progress)) + '%';
  });
}

/* 6. Back To Top */
function initBackToTop() {
  const btt = document.querySelector('.back-to-top');
  if (!btt) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }
  });

  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
