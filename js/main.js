/* ===========================================================
   E-Cycle — Main JS
   Vanilla JS only. No backend, no external calls.
=========================================================== */
(function () {
  "use strict";

  const savedItems = new Set();

  /* ---------------------------------------------------------
     Helpers
  --------------------------------------------------------- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => {
    const root = typeof ctx === "string" ? document.querySelector(ctx) : ctx || document;
    return root ? Array.from(root.querySelectorAll(sel)) : [];
  };
  const formatPrice = (p) => (p === 0 ? "Free" : "₹" + p.toLocaleString("en-IN"));

  /* ---------------------------------------------------------
     Icon system — original hand-drawn line icons (24x24),
     self-contained SVG so the site needs zero external image
     requests and never breaks offline.
  --------------------------------------------------------- */
  const ICONS = {
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><line x1="10" y1="18" x2="14" y2="18"/>',
    laptop: '<rect x="4" y="4" width="16" height="10" rx="1"/><path d="M2 19h20l-2-3H4l-2 3Z"/>',
    monitor: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M9 20h6M12 16v4"/>',
    keyboard: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M6.5 10h.01M10 10h.01M14 10h.01M17.5 10h.01M6 14h12"/>',
    printer: '<path d="M6 9V3h12v6"/><rect x="4" y="9" width="16" height="8" rx="1"/><path d="M7 17v4h10v-4"/>',
    tv: '<rect x="3" y="5" width="18" height="12" rx="1"/><path d="M8 21h8M12 17v4"/>',
    battery: '<rect x="2" y="8" width="17" height="8" rx="1.5"/><line x1="21" y1="11" x2="21" y2="13"/><path d="M6 11v2M9 11v2"/>',
    camera: '<path d="M4 8h3l1.6-2h6.8L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.4"/>',
    radio: '<rect x="3" y="9" width="18" height="10" rx="1.5"/><circle cx="8" cy="14" r="2"/><path d="M13 14h5M4 9l3-5h8l3 5"/>',
    recycle: '<path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3"/><path d="M16 3v4h-4M8 21v-4h4"/>',
    list: '<path d="M4 6h16M4 12h10M4 18h7"/>',
    chat: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/>',
    handshake: '<path d="M2.5 13 7 9.5l2 1.8L13.5 8"/><path d="M21.5 13 17 9.5l-2 1.8L10.5 8"/><path d="m7 11 3.5 4c.7.8 1.9.8 2.6 0"/><path d="m17 11-3.5 4c-.35.4-.8.6-1.25.63"/>',
    user: '<circle cx="12" cy="8" r="3.4"/><path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6"/>',
    box: '<path d="M3 8l9-5 9 5-9 5-9-5Z"/><path d="M3 8v9l9 5 9-5V8"/><path d="M12 13v9"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.5 2.5L16 9.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    bookmark: '<path d="M6 3h12v18l-6-4-6 4V3Z"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><circle cx="16" cy="14" r="1.3"/>',
    bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>',
    shield: '<path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9Z"/>',
    pin: '<path d="M12 22s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12Z"/><circle cx="12" cy="10" r="2.4"/>',
    call: '<path d="M6 3h3l1.5 4.5L8.3 9.6a12 12 0 0 0 6.1 6.1l2.1-2.2L21 15v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 5a2 2 0 0 1 2-2Z"/>',
    leaf: '<path d="M5 21c0-9 6-15 15-15 0 9-6 15-15 15Z"/><path d="M5 21c3-3 6-6 9-9"/>',
    cloud: '<path d="M7 18a4.5 4.5 0 0 1-.5-9 6 6 0 0 1 11.6-2A4.5 4.5 0 0 1 18 18H7Z"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/>',
    device: '<rect x="7" y="7" width="10" height="10" rx="1.5"/><rect x="10.5" y="10.5" width="3" height="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
  };

  function icon(name, cls) {
    const inner = ICONS[name] || ICONS.box;
    return `<svg class="ico${cls ? " " + cls : ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 2600);
  }

  /* ---------------------------------------------------------
     Nav: mobile toggle + scroll shadow + active link
  --------------------------------------------------------- */
  function initNav() {
    const nav = $("#nav");
    const toggle = $("#navToggle");
    toggle.addEventListener("click", () => nav.classList.toggle("menu-open"));

    $$(".nav-links a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("menu-open"))
    );

    const scrollTopBtn = $("#scrollTop");
    window.addEventListener("scroll", () => {
      scrollTopBtn.classList.toggle("show", window.scrollY > 500);
    });
  }

  /* ---------------------------------------------------------
     Categories
  --------------------------------------------------------- */
  function renderCategories() {
    const grid = $("#catGrid");
    grid.innerHTML = CATEGORIES.map(
      (c, i) => `
      <div class="cat-card reveal" style="transition-delay:${i * 40}ms" data-cat="${c.name}">
        <div class="cat-icon">${icon(c.icon)}</div>
        <h3>${c.name}</h3>
        <p>${c.count} listings</p>
      </div>`
    ).join("");

    $$(".cat-card", grid).forEach((card) =>
      card.addEventListener("click", () => {
        const cat = card.dataset.cat;
        $("#searchInput").value = cat;
        applyFilters();
        document.getElementById("marketplace").scrollIntoView({ behavior: "smooth" });
      })
    );
  }

  /* ---------------------------------------------------------
     Marketplace: render, search, filter
  --------------------------------------------------------- */
  let activeFilter = "All";

  function productCardHTML(p) {
    const tagClass = "tag-" + p.tag.toLowerCase();
    const priceClass = p.price === 0 ? "is-free" : "";
    const savedClass = savedItems.has(p.id) ? "saved" : "";
    const savedIcon = savedItems.has(p.id) ? "★" : "☆";
    return `
    <article class="product-card fade-up" data-id="${p.id}">
      <div class="product-media">
        <span class="tag ${tagClass}">${p.tag}</span>
        ${icon(p.icon, "ico-lg")}
      </div>
      <div class="product-body">
        <span class="product-cat">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-meta">
          <span>${p.sellerType}</span>
          <span>${p.location.split(",")[0]}</span>
        </div>
        <div class="product-price-row">
          <span class="product-price ${priceClass}">${formatPrice(p.price)}</span>
          <span class="product-meta">♥ ${p.interest}</span>
        </div>
        <div class="product-actions">
          <button class="btn btn-ghost btn-view" data-id="${p.id}">View</button>
          <button class="icon-btn btn-save ${savedClass}" data-id="${p.id}" aria-label="Save item">${savedIcon}</button>
          <button class="btn btn-primary btn-buy" data-id="${p.id}">Buy Now</button>
        </div>
      </div>
    </article>`;
  }

  function renderProducts(list) {
    const grid = $("#productGrid");
    const empty = $("#emptyState");
    if (!list.length) {
      grid.innerHTML = "";
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    grid.innerHTML = list.map(productCardHTML).join("");
    observeReveal($$(".fade-up", grid));

    $$(".btn-view", grid).forEach((b) =>
      b.addEventListener("click", () => openModal(Number(b.dataset.id)))
    );
    $$(".btn-buy", grid).forEach((b) =>
      b.addEventListener("click", () => {
        const p = PRODUCTS.find((x) => x.id === Number(b.dataset.id));
        toast(`Demo only — "${p.name}" would start a checkout flow.`);
      })
    );
    $$(".btn-save", grid).forEach((b) =>
      b.addEventListener("click", () => {
        const id = Number(b.dataset.id);
        toggleSaved(id);
        b.classList.toggle("saved", savedItems.has(id));
        b.textContent = savedItems.has(id) ? "★" : "☆";
      })
    );
  }

  /* ---------------------------------------------------------
     Saved items — shared state across cards, modal, and drawer
  --------------------------------------------------------- */
  function toggleSaved(id, silent) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (savedItems.has(id)) {
      savedItems.delete(id);
      if (!silent) toast("Removed from saved items.");
    } else {
      savedItems.add(id);
      if (!silent) toast(p ? `Saved "${p.name}" to your list.` : "Saved to your dashboard.");
    }
    updateSavedBadge();
    if ($("#drawerOverlay").classList.contains("active")) renderDrawer();
  }

  function updateSavedBadge() {
    const badge = $("#savedBadge");
    const count = savedItems.size;
    badge.textContent = count;
    badge.hidden = count === 0;
  }

  function renderDrawer() {
    const body = $("#drawerBody");
    $("#drawerCount").textContent = `(${savedItems.size})`;
    if (!savedItems.size) {
      body.innerHTML = `<p class="drawer-empty">Nothing saved yet — tap the ☆ on any listing to keep it here.</p>`;
      return;
    }
    const items = PRODUCTS.filter((p) => savedItems.has(p.id));
    body.innerHTML = items
      .map(
        (p) => `
      <div class="drawer-item" data-id="${p.id}">
        <div class="drawer-icon">${icon(p.icon)}</div>
        <div class="drawer-info">
          <h4>${p.name}</h4>
          <p>${formatPrice(p.price)}</p>
        </div>
        <button class="drawer-remove" data-id="${p.id}" aria-label="Remove">✕</button>
      </div>`
      )
      .join("");
    $$(".drawer-remove", body).forEach((b) =>
      b.addEventListener("click", () => {
        toggleSaved(Number(b.dataset.id), true);
        renderDrawer();
        applyFilters();
      })
    );
  }

  function initSavedDrawer() {
    const overlay = $("#drawerOverlay");
    $("#savedToggle").addEventListener("click", () => {
      renderDrawer();
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
    const close = () => {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    };
    $("#drawerClose").addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target.id === "drawerOverlay") close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
    updateSavedBadge();
  }

  /* ---------------------------------------------------------
     Filtering + sorting
  --------------------------------------------------------- */
  function applyFilters() {
    const q = $("#searchInput").value.trim().toLowerCase();
    const sort = $("#sortSelect") ? $("#sortSelect").value : "featured";
    let list = PRODUCTS.filter((p) => {
      const matchesFilter = activeFilter === "All" || p.tag === activeFilter;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
    list = list.slice();
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "popular") list.sort((a, b) => b.interest - a.interest);
    renderProducts(list);
  }

  function initMarketplace() {
    renderProducts(PRODUCTS);
    $("#searchInput").addEventListener("input", applyFilters);
    $("#sortSelect").addEventListener("change", applyFilters);
    $$(".pill", "#filterPills").forEach((pill) =>
      pill.addEventListener("click", () => {
        $$(".pill", "#filterPills").forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        activeFilter = pill.dataset.filter;
        applyFilters();
      })
    );
  }

  /* ---------------------------------------------------------
     Product modal
  --------------------------------------------------------- */
  function openModal(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    const tagClass = "tag-" + p.tag.toLowerCase();
    const priceClass = p.price === 0 ? "is-free" : "";

    $("#modalBody").innerHTML = `
      <div class="modal-media">${icon(p.icon, "ico-xl")}</div>
      <div class="modal-content">
        <span class="tag ${tagClass}">${p.tag}</span>
        <h2>${p.name}</h2>
        <p class="modal-sub">${p.category} · Listed by ${p.seller} (${p.sellerType})</p>
        <div class="modal-price ${priceClass}">${formatPrice(p.price)}</div>
        <p>${p.desc}</p>
        <div class="modal-grid">
          <div><p>Condition</p><span>${p.condition}</span></div>
          <div><p>Age</p><span>${p.age}</span></div>
          <div><p>Location</p><span>${p.location}</span></div>
          <div><p>Interest</p><span>${p.interest} people watching</span></div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-outline" id="modalSave">${savedItems.has(p.id) ? "★ Saved" : "☆ Save Item"}</button>
          <button class="btn btn-primary" id="modalBuy">Buy Now</button>
        </div>
      </div>`;

    $("#modalOverlay").classList.add("active");
    document.body.style.overflow = "hidden";

    $("#modalBuy").addEventListener("click", () => {
      toast(`Demo only — "${p.name}" would start a checkout flow.`);
      closeModal();
    });
    $("#modalSave").addEventListener("click", (e) => {
      toggleSaved(p.id);
      e.target.textContent = savedItems.has(p.id) ? "★ Saved" : "☆ Save Item";
      applyFilters();
    });
  }

  function closeModal() {
    $("#modalOverlay").classList.remove("active");
    document.body.style.overflow = "";
  }

  function initModal() {
    $("#modalClose").addEventListener("click", closeModal);
    $("#modalOverlay").addEventListener("click", (e) => {
      if (e.target.id === "modalOverlay") closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  /* ---------------------------------------------------------
     Testimonials
  --------------------------------------------------------- */
  function renderTestimonials() {
    const track = $("#testTrack");
    track.innerHTML = TESTIMONIALS.map(
      (t, i) => `
      <div class="test-card">
        <div class="test-stars">★★★★★</div>
        <p class="test-quote">"${t.quote}"</p>
        <div class="test-person">
          <div class="test-avatar avatar-${i % 4}">${icon(t.avatar)}</div>
          <div>
            <div class="test-name">${t.name}</div>
            <div class="test-role">${t.role}</div>
          </div>
        </div>
      </div>`
    ).join("");

    initTestimonialCarousel(track);
  }

  function initTestimonialCarousel(track) {
    const dotsWrap = $("#testDots");
    const cards = $$(".test-card", track);
    if (!cards.length) return;

    dotsWrap.innerHTML = cards.map((_, i) => `<button class="test-dot${i === 0 ? " active" : ""}" data-i="${i}" aria-label="Go to testimonial ${i + 1}"></button>`).join("");
    const dots = $$(".test-dot", dotsWrap);

    let current = 0;
    let autoplayTimer;

    function goTo(i) {
      current = (i + cards.length) % cards.length;
      const card = cards[current];
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
      dots.forEach((d, idx) => d.classList.toggle("active", idx === current));
    }

    $("#testPrev").addEventListener("click", () => { goTo(current - 1); restartAutoplay(); });
    $("#testNext").addEventListener("click", () => { goTo(current + 1); restartAutoplay(); });
    dots.forEach((d) => d.addEventListener("click", () => { goTo(Number(d.dataset.i)); restartAutoplay(); }));

    function startAutoplay() {
      autoplayTimer = setInterval(() => goTo(current + 1), 5000);
    }
    function restartAutoplay() {
      clearInterval(autoplayTimer);
      startAutoplay();
    }
    const carousel = track.closest(".test-carousel") || track;
    carousel.addEventListener("mouseenter", () => clearInterval(autoplayTimer));
    carousel.addEventListener("mouseleave", startAutoplay);
    startAutoplay();
  }

  /* ---------------------------------------------------------
     FAQ accordion
  --------------------------------------------------------- */
  function renderFAQ() {
    const list = $("#faqList");
    list.innerHTML = FAQS.map(
      (f, i) => `
      <div class="faq-item${i === 0 ? " open" : ""}">
        <div class="faq-q"><span>${f.q}</span><span class="plus">+</span></div>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>`
    ).join("");

    $$(".faq-item", list).forEach((item) => {
      $(".faq-q", item).addEventListener("click", () => {
        const wasOpen = item.classList.contains("open");
        $$(".faq-item", list).forEach((i) => i.classList.remove("open"));
        if (!wasOpen) item.classList.add("open");
      });
    });
  }

  /* ---------------------------------------------------------
     Dashboard bar chart
  --------------------------------------------------------- */
  function renderBarChart() {
    const wrap = $("#barChart");
    const max = Math.max(...BAR_CHART_DATA.map((d) => d.value));
    wrap.innerHTML = BAR_CHART_DATA.map(
      (d) => `
      <div class="bar-col">
        <div class="bar" data-h="${(d.value / max) * 100}" style="height:0"></div>
        <span>${d.label}</span>
      </div>`
    ).join("");

    observeReveal([wrap], () => {
      $$(".bar", wrap).forEach((bar, i) => {
        setTimeout(() => {
          bar.style.height = bar.dataset.h + "%";
        }, i * 90);
      });
    });
  }

  /* ---------------------------------------------------------
     Count-up numbers (stats + impact)
  --------------------------------------------------------- */
  function animateCount(el) {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString("en-IN") + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString("en-IN") + suffix;
    }
    requestAnimationFrame(tick);
  }

  function isInViewport(el) {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.92 && r.bottom > 0;
  }

  function initCounters() {
    const counters = $$("[data-count]");
    if (!counters.length) return;

    function sweep() {
      counters.forEach((el) => {
        if (!el.dataset.done && isInViewport(el)) {
          el.dataset.done = "1";
          animateCount(el);
        }
      });
    }

    // IntersectionObserver handles the common case efficiently...
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.dataset.done) {
              entry.target.dataset.done = "1";
              animateCount(entry.target);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      counters.forEach((c) => io.observe(c));
    }

    // ...but a plain scroll/resize sweep is kept as a guaranteed fallback,
    // so numbers are never left stuck at 0 if the observer doesn't fire
    // (e.g. elements already on screen at load).
    sweep();
    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("resize", sweep);
    window.addEventListener("load", sweep);
    // Final safety net a moment after load, in case fonts/images shifted layout.
    setTimeout(sweep, 600);
    setTimeout(sweep, 1500);
  }

  /* ---------------------------------------------------------
     Reveal-on-scroll (generic)
  --------------------------------------------------------- */
  function observeReveal(elements, onReveal) {
    elements = elements.filter(Boolean);
    if (!elements.length) return;
    let fired = false;
    const reveal = (el) => {
      if (el.classList.contains("in")) return;
      el.classList.add("in");
      if (onReveal && !fired) {
        fired = true;
        onReveal();
      }
    };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      elements.forEach((el) => io.observe(el));
    }

    // Guaranteed fallback sweep — covers elements already in view at load
    // and any environment where IntersectionObserver behaves unexpectedly.
    function sweep() {
      elements.forEach((el) => {
        if (!el.classList.contains("in") && isInViewport(el)) reveal(el);
      });
    }
    sweep();
    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("load", sweep);
    setTimeout(sweep, 600);
  }

  function initReveal() {
    observeReveal($$(".reveal"));
  }

  /* ---------------------------------------------------------
     Forms (demo only — no submission)
  --------------------------------------------------------- */
  function initForms() {
    const sellForm = $("#sellForm");
    sellForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = sellForm.querySelector('input[type="text"]').value || "your item";
      $("#formNote").textContent = `Preview ready — "${name}" would now appear in the marketplace. (Demo only — nothing was submitted.)`;
      toast("Listing preview generated (demo only).");
      sellForm.reset();
    });

    const contactForm = $("#contactForm");
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      $("#contactNote").textContent = "Thanks for reaching out! This is a demo form — no message was actually sent.";
      toast("Message queued (demo only).");
      contactForm.reset();
    });

    const newsletterForm = $("#newsletterForm");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        $("#newsletterNote").textContent = "Subscribed! (Demo only — no email was actually sent.)";
        toast("Subscribed to updates (demo only).");
        newsletterForm.reset();
      });
    }
  }

  /* ---------------------------------------------------------
     Dark mode toggle — persists via localStorage
  --------------------------------------------------------- */
  function initTheme() {
    const root = document.documentElement;
    const toggle = $("#themeToggle");
    const stored = localStorage.getItem("ecycle-theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) root.setAttribute("data-theme", "dark");

    toggle.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      if (isDark) {
        root.removeAttribute("data-theme");
        localStorage.setItem("ecycle-theme", "light");
      } else {
        root.setAttribute("data-theme", "dark");
        localStorage.setItem("ecycle-theme", "dark");
      }
    });
  }

  /* ---------------------------------------------------------
     Scroll progress bar
  --------------------------------------------------------- */
  function initScrollProgress() {
    const bar = $("#scrollProgress");
    function update() {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      const pct = scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0;
      bar.style.width = pct + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------------------------------------------------------
     Custom cursor — desktop, fine-pointer devices only
  --------------------------------------------------------- */
  function initCustomCursor() {
    const supportsFine = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    if (!supportsFine) return;

    const dot = $("#cursorDot");
    const ring = $("#cursorRing");
    document.body.classList.add("has-custom-cursor");

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf = null;

    function onMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
      dot.classList.remove("cursor-hidden");
      ring.classList.remove("cursor-hidden");
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function tick() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      if (Math.abs(mouseX - ringX) > 0.3 || Math.abs(mouseY - ringY) > 0.3) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", () => {
      dot.classList.add("cursor-hidden");
      ring.classList.add("cursor-hidden");
    });
    document.addEventListener("mousedown", () => ring.style.opacity = ".9");
    document.addEventListener("mouseup", () => ring.style.opacity = "");

    const hoverSelector = "a, button, input, textarea, select, .pill, .cat-card, .product-card, .test-dot, .icon-btn, .step, label";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverSelector)) {
        dot.classList.add("cursor-hover");
        ring.classList.add("cursor-hover");
      }
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverSelector)) {
        dot.classList.remove("cursor-hover");
        ring.classList.remove("cursor-hover");
      }
    });
  }

  /* ---------------------------------------------------------
     Init
  --------------------------------------------------------- */
  function safe(fn, label) {
    try {
      fn();
    } catch (err) {
      console.error(`E-Cycle init error [${label}]:`, err);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    safe(initTheme, "theme");
    safe(initScrollProgress, "scrollProgress");
    safe(initCustomCursor, "cursor");
    safe(initNav, "nav");
    safe(renderCategories, "categories");
    safe(initMarketplace, "marketplace");
    safe(initModal, "modal");
    safe(initSavedDrawer, "savedDrawer");
    safe(renderTestimonials, "testimonials");
    safe(renderFAQ, "faq");
    safe(renderBarChart, "barChart");
    safe(initCounters, "counters");
    safe(initForms, "forms");
    safe(initReveal, "reveal");
  });
})();
