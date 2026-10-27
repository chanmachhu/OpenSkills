/* Home: auto-scrolling carousel, catalog search and theme filter. Cards are pre-rendered by scripts/build.js. */
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* carousel: auto-scrolls, pauses on hover, can be dragged (mouse, wheel, touch, arrows) */
  const mq = document.getElementById("mq"), track = mq.firstElementChild, first = track.children[0];
  const copyStart = track.children[track.children.length / 2];
  let half = 0, pos = 0, hover = false, hold = 0, last = performance.now(), glide = null, drag = null, moved = false;
  const speed = 0.035; // px per ms
  const measure = () => { half = copyStart.offsetLeft - first.offsetLeft; };
  const wrap = () => { if (half > 0) { while (pos >= half) pos -= half; while (pos < 0) pos += half; } };
  const apply = () => { wrap(); mq.scrollLeft = pos; };
  const pauseFor = ms => { hold = performance.now() + ms; };

  function tick(t) {
    const dt = Math.min(64, t - last); last = t;
    if (glide) {
      const k = Math.min(1, (t - glide.t0) / 450), e = 1 - Math.pow(1 - k, 3);
      pos = glide.from + glide.by * e; apply();
      if (k === 1) glide = null;
    } else if (!reduced && !hover && !drag && t > hold) {
      pos += dt * speed; apply();
    }
    requestAnimationFrame(tick);
  }

  mq.addEventListener("scroll", () => {
    if (Math.abs(mq.scrollLeft - pos) > 2 && !drag && !glide) { pos = mq.scrollLeft; pauseFor(1500); if (pos >= half || pos <= 0) apply(); }
  }, { passive: true });
  mq.addEventListener("mouseenter", () => hover = true);
  mq.addEventListener("mouseleave", () => hover = false);
  mq.addEventListener("touchstart", () => pauseFor(4000), { passive: true });
  mq.addEventListener("focusin", () => hover = true);
  mq.addEventListener("focusout", () => hover = false);

  mq.addEventListener("pointerdown", e => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag = { x: e.clientX, from: pos }; moved = false; glide = null;
  });
  addEventListener("pointermove", e => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 5 && !moved) { moved = true; mq.classList.add("dragging"); }
    if (moved) { pos = drag.from - dx; apply(); }
  });
  addEventListener("pointerup", () => { if (!drag) return; drag = null; mq.classList.remove("dragging"); pauseFor(1200); });
  mq.addEventListener("click", e => { if (moved) { e.preventDefault(); moved = false; } }, true);
  document.querySelectorAll("[data-mq]").forEach(b => b.addEventListener("click", () => {
    glide = { from: pos, by: Number(b.dataset.mq) * 320, t0: performance.now() }; pauseFor(2500);
  }));
  addEventListener("resize", measure);
  measure();
  requestAnimationFrame(tick);

  /* catalog: search + theme filter hide pre-rendered cards and rows */
  const q = document.getElementById("q"), th = document.getElementById("th"), empty = document.getElementById("empty");
  const rows = [...document.querySelectorAll(".theme-row")];
  try { const saved = localStorage.getItem("os-theme"); if (saved && th.querySelector(`option[value="${CSS.escape(saved)}"]`)) th.value = saved; } catch (e) {}
  function filter() {
    const term = q.value.trim().toLowerCase().replace(/^\//, "");
    let any = false;
    rows.forEach(row => {
      let shown = 0;
      row.querySelectorAll(".card").forEach(c => { c.hidden = !!term && !c.dataset.search.includes(term); if (!c.hidden) shown++; });
      row.hidden = !shown || (th.value !== "all" && th.value !== row.dataset.themeId);
      any = any || !row.hidden;
    });
    empty.hidden = any;
  }
  document.getElementById("sform").addEventListener("submit", e => e.preventDefault());
  q.addEventListener("input", filter);
  th.addEventListener("change", () => { try { localStorage.setItem("os-theme", th.value); } catch (e) {} filter(); });
  rows.forEach(row => row.querySelectorAll("[data-dir]").forEach(b => b.addEventListener("click", () => {
    row.querySelector(".track").scrollBy({ left: Number(b.dataset.dir) * 320, behavior: reduced ? "auto" : "smooth" });
  })));
  filter();
  if (location.hash === "#search") { q.scrollIntoView({ block: "center" }); q.focus(); }
})();
