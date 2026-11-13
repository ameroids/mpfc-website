const C = window.MPFC_CONFIG;

// 1. Config bindings
document.querySelectorAll('[data-cfg]').forEach(e => {
  if (C[e.dataset.cfg]) {
    e.textContent = C[e.dataset.cfg];
  }
});

const yrSpan = document.getElementById('yr');
if (yrSpan) yrSpan.textContent = new Date().getFullYear();
if (C.name) document.title = C.name + ' | Madhya Pradesh Freight Carrier — Redefining Logistics';

// ---------------------------------------------------------------------------
// 2. Custom Precision Cursor (Nike UI Inspired)
// ---------------------------------------------------------------------------
const customCursor = document.getElementById('customCursor');
const cursorText = document.getElementById('cursorText');

if (customCursor) {
  window.addEventListener('mousemove', (e) => {
    customCursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
  });

  const hoverTargets = document.querySelectorAll('button, a, select, input, .cat-tab, .chips-grid i, .lane-filter-btn');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
  });

  const viewTargets = document.querySelectorAll('.fleet-card, .corridor-box');
  viewTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      customCursor.classList.add('view');
      if (cursorText) cursorText.textContent = 'VIEW';
    });
    el.addEventListener('mouseleave', () => {
      customCursor.classList.remove('view');
    });
  });
}

// ---------------------------------------------------------------------------
// 3. Toast Notifications System
// ---------------------------------------------------------------------------
const toastShelf = document.getElementById('toastShelf');

function showToast(msg) {
  if (!toastShelf) return;
  const bubble = document.createElement('div');
  bubble.className = 'toast-bubble';
  bubble.innerHTML = `<span>★</span> <span>${msg}</span>`;
  toastShelf.appendChild(bubble);

  setTimeout(() => {
    bubble.style.opacity = '0';
    bubble.style.transform = 'translateY(10px)';
    bubble.style.transition = 'all 0.3s ease';
    setTimeout(() => bubble.remove(), 300);
  }, 3200);
}

// ---------------------------------------------------------------------------
// 4. Quick Fleet Modal (Nike QuickView UX)
// ---------------------------------------------------------------------------
const FLEET_DATA = {
  1: {
    category: "HEAVY FTL (MULTI-AXLE)",
    title: "32 FT MX High-Cube Container",
    payload: "Payload: 18 - 22 Tonnes",
    rate: "High-Frequency Dedicated Line",
    desc: "Engineered for high-volume FMCG, pharmaceuticals, automotive components, and white goods with high-grade anti-pilferage digital locks.",
    dim: "32' x 8' x 8.5' (1,980 cu.ft)",
    sla: "Indore-Mumbai in 18h",
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
    serviceType: "Full truck load"
  },
  2: {
    category: "EXPRESS LINEHAUL",
    title: "24 FT Express Container",
    payload: "Payload: 9 - 12 Tonnes",
    rate: "Express Hub-to-Hub",
    desc: "Speed-tuned chassis built for fast inter-city connections. Direct transit from warehouse dock to distribution hub with guaranteed priority lanes.",
    dim: "24' x 7.5' x 7.5' (1,350 cu.ft)",
    sla: "Indore-Bhopal in 5h",
    img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800",
    serviceType: "Part load"
  },
  3: {
    category: "HEAVY HAULAGE & ODC",
    title: "40 FT Flatbed Tri-Axle Trailer",
    payload: "Payload: 28 - 35 Tonnes",
    rate: "Industrial Heavy Transport",
    desc: "Heavy-duty structural steel frame, reinforced multi-leaf suspension, and hydraulic lashing points for steel coils, industrial reactors, and transformers.",
    dim: "40' x 8.5' Flatbed",
    sla: "Route Surveyed Escort",
    img: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&q=80&w=800",
    serviceType: "ODC / project cargo"
  },
  4: {
    category: "AGRI & BULK COMMODITIES",
    title: "20 FT Open Body Taurus",
    payload: "Payload: 16 Tonnes",
    rate: "Direct Mandi Corridor",
    desc: "All-weather heavy duty tarpaulin with side-drop boards for efficient crane or manual loading across agricultural mandis and industrial mills.",
    dim: "20' x 7.8' Open Drop",
    sla: "Direct Mandi Express",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    serviceType: "Full truck load"
  }
};

const quickModal = document.getElementById('quickModal');
const modalClose = document.getElementById('modalClose');
const modalImg = document.getElementById('modalImg');
const modalCategory = document.getElementById('modalCategory');
const modalTitle = document.getElementById('modalTitle');
const modalPayload = document.getElementById('modalPayload');
const modalRate = document.getElementById('modalRate');
const modalDesc = document.getElementById('modalDesc');
const modalDim = document.getElementById('modalDim');
const modalSla = document.getElementById('modalSla');
const modalBookBtn = document.getElementById('modalBookBtn');

let currentModalItem = null;

function openQuickModal(truckId) {
  const item = FLEET_DATA[truckId];
  if (!item) return;
  currentModalItem = item;

  modalImg.src = item.img;
  modalCategory.textContent = item.category;
  modalTitle.textContent = item.title;
  modalPayload.textContent = item.payload;
  modalRate.textContent = item.rate;
  modalDesc.textContent = item.desc;
  modalDim.textContent = item.dim;
  modalSla.textContent = item.sla;

  quickModal.classList.add('open');
  showToast(`Inspecting ${item.title}`);
}

function closeQuickModal() {
  quickModal.classList.remove('open');
  currentModalItem = null;
}

if (modalClose) modalClose.addEventListener('click', closeQuickModal);
if (quickModal) {
  quickModal.addEventListener('click', (e) => {
    if (e.target === quickModal) closeQuickModal();
  });
}

// Quick View Button clicks
document.querySelectorAll('.quick-view-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openQuickModal(btn.dataset.truck);
  });
});

// Modal book button transfers specs to quote form
if (modalBookBtn) {
  modalBookBtn.addEventListener('click', () => {
    if (!currentModalItem) return;
    const qType = document.getElementById('qType');
    const qMsg = document.getElementById('qMsg');
    
    if (qType) qType.value = currentModalItem.serviceType;
    if (qMsg) qMsg.value = `Requested Carrier Asset: ${currentModalItem.title} (${currentModalItem.payload}).`;
    
    closeQuickModal();
    const quoteSec = document.getElementById('quote');
    if (quoteSec) quoteSec.scrollIntoView({ behavior: 'smooth' });
    showToast(`Vehicle configured: ${currentModalItem.title}`);
  });
}

// Select Truck button directly from cards
document.querySelectorAll('.select-truck-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const truckName = btn.dataset.truckName;
    const type = btn.dataset.type;
    const qType = document.getElementById('qType');
    const qMsg = document.getElementById('qMsg');
    
    if (qType) qType.value = type;
    if (qMsg) qMsg.value = `Selected Fleet Unit: ${truckName}. Urgent allocation requested.`;

    const quoteSec = document.getElementById('quote');
    if (quoteSec) quoteSec.scrollIntoView({ behavior: 'smooth' });
    showToast(`Selected ${truckName} for booking!`);
  });
});

// ---------------------------------------------------------------------------
// 5. Fleet Category Tabs Filter (Nike UX)
// ---------------------------------------------------------------------------
const fleetTabs = document.querySelectorAll('#fleetTabs .cat-tab');
const fleetCards = document.querySelectorAll('.fleet-card');

fleetTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    fleetTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.cat;

    fleetCards.forEach(card => {
      if (cat === 'all' || card.dataset.category === cat) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ---------------------------------------------------------------------------
// 6. City & Corridor Hubs with Filter & Search
// ---------------------------------------------------------------------------
const mpCities = ["Indore", "Bhopal", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Ratlam", "Rewa", "Dewas", "Satna", "Pithampur"];
const interstateCities = ["Mumbai", "Delhi NCR", "Ahmedabad", "Nagpur", "Pune", "Jaipur", "Raipur", "Surat"];

const citiesContainer = document.getElementById('cities');

function renderCities(filter = 'all', searchQuery = '') {
  if (!citiesContainer) return;
  let list = C.cities && C.cities.length ? C.cities : [...mpCities, ...interstateCities];
  
  if (filter === 'mp') {
    list = list.filter(c => mpCities.includes(c) || !interstateCities.includes(c));
  } else if (filter === 'interstate') {
    list = list.filter(c => interstateCities.includes(c));
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(c => c.toLowerCase().includes(q));
  }

  if (list.length === 0) {
    citiesContainer.innerHTML = '<span style="color:#6c757d;font-size:13px;">No direct hubs matched. Custom all-India lanes available on request.</span>';
    return;
  }

  citiesContainer.innerHTML = list.map(c => `<i>📍 ${c}</i>`).join('');
  
  // Clicking sets into quote form
  citiesContainer.querySelectorAll('i').forEach(chip => {
    chip.addEventListener('click', () => {
      const city = chip.textContent.replace('📍 ', '').trim();
      const qFrom = document.getElementById('qFrom');
      const qTo = document.getElementById('qTo');
      if (qFrom && !qFrom.value) {
        qFrom.value = city;
        qFrom.focus();
        showToast(`Origin set: ${city}`);
      } else if (qTo && !qTo.value) {
        qTo.value = city;
        qTo.focus();
        showToast(`Destination set: ${city}`);
      } else {
        const qTo = document.getElementById('qTo');
        if (qTo) {
          qTo.value = city;
          showToast(`Destination updated: ${city}`);
        }
      }
    });
  });
}

renderCities();

// Filter buttons for lanes
const laneFilterBtns = document.querySelectorAll('#laneFilters .lane-filter-btn');
laneFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    laneFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    const searchVal = document.getElementById('laneSearch')?.value || '';
    renderCities(filter, searchVal);
  });
});

const laneSearch = document.getElementById('laneSearch');
if (laneSearch) {
  laneSearch.addEventListener('input', (e) => {
    const activeFilter = document.querySelector('#laneFilters .lane-filter-btn.active')?.dataset.filter || 'all';
    renderCities(activeFilter, e.target.value);
  });
}

// ---------------------------------------------------------------------------
// 7. Scroll Progress & Sticky Effects
// ---------------------------------------------------------------------------
const nav = document.getElementById('mainNav');
const progressBar = document.getElementById('scrollProgress');
const floatingCta = document.getElementById('floatingCta');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progressPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
  
  if (progressBar) progressBar.style.width = `${progressPercent}%`;

  if (nav) {
    if (scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }

  if (floatingCta) {
    if (scrollY > 350) floatingCta.classList.add('show');
    else floatingCta.classList.remove('show');
  }
}, { passive: true });

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Returned to top');
  });
}

// ---------------------------------------------------------------------------
// 9. Intersection Observer & Counters
// ---------------------------------------------------------------------------
const revealElements = document.querySelectorAll('.reveal');
const statNumbers = document.querySelectorAll('.perf-val');

let animatedStats = false;
function animateStats() {
  if (animatedStats) return;
  animatedStats = true;
  statNumbers.forEach(stat => {
    const target = parseFloat(stat.dataset.count);
    const suffix = stat.querySelector('span') ? stat.querySelector('span').textContent : '';
    let current = 0;
    const duration = 1600;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      current = target * ease;
      
      if (Number.isInteger(target)) {
        stat.innerHTML = `${Math.floor(current)}<span>${suffix}</span>`;
      } else {
        stat.innerHTML = `${current.toFixed(1)}<span>${suffix}</span>`;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        stat.innerHTML = `${target}<span>${suffix}</span>`;
      }
    }
    requestAnimationFrame(step);
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => observer.observe(el));

const statsSection = document.getElementById('stats');
if (statsSection) {
  const statsObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) animateStats();
  }, { threshold: 0.2 });
  statsObs.observe(statsSection);
}

// ---------------------------------------------------------------------------
// 10. Form Submission to WhatsApp & Email
// ---------------------------------------------------------------------------
const f = document.getElementById('qf');
const textPayload = () => {
  const d = new FormData(f);
  return `*🔴 MPFC (Madhya Pradesh Freight Carrier) - Instant Booking Dispatch*\n\n` +
    `👤 *Client / Consignor:* ${d.get('name') || 'N/A'}\n` +
    `📞 *Phone / WhatsApp:* ${d.get('phone') || 'N/A'}\n` +
    `📍 *Origin Loading City:* ${d.get('from') || 'N/A'}\n` +
    `🏁 *Destination City:* ${d.get('to') || 'N/A'}\n` +
    `🚛 *Service Required:* ${d.get('type') || 'N/A'}\n` +
    `⚖️ *Tonnage / Weight:* ${d.get('weight') || 'N/A'}\n` +
    `📝 *Specifications / Material:* ${d.get('msg') || 'Standard industrial freight'}\n\n` +
    `_Sent via official MPFC web portal_`;
};

if (f) {
  f.addEventListener('submit', e => {
    e.preventDefault();
    const phone = C.whatsapp || '919826000000';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(textPayload())}`, '_blank');
    showToast('Opening WhatsApp dispatch desk...');
  });
}

const mailBtn = document.getElementById('mail');
if (mailBtn && f) {
  mailBtn.onclick = () => {
    if (f.reportValidity()) {
      const email = C.email || 'dispatch@mpfc.in';
      location.href = `mailto:${email}?subject=${encodeURIComponent('MPFC Freight Carrier Quote Request - ' + (document.getElementById('qFrom')?.value || 'MPFC'))}&body=${encodeURIComponent(textPayload())}`;
      showToast('Opening email draft...');
    }
  };
}
