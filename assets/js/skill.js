/* Skill page examples: on desktop the page scroll drives a horizontal track; on mobile / reduced motion it's a swipe carousel. */
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sec = document.getElementById("ex-sec"), vp = document.getElementById("ex-vp");
  const track = document.getElementById("ex-track"), prog = document.getElementById("ex-prog");
  const cards = [...track.children], mms = [...document.querySelectorAll(".mm")];
  const isStatic = () => reduced || innerWidth < 700 || cards.length < 2;
  let dist = 0;
  const setActive = i => mms.forEach((m, j) => m.classList.toggle("on", j === i));
  const nearest = x => { let b = 0, bd = Infinity; cards.forEach((c, i) => { const d = Math.abs(c.offsetLeft - x); if (d < bd) { bd = d; b = i; } }); return b; };

  function layout() {
    if (isStatic()) { sec.classList.add("static"); sec.style.height = ""; track.style.transform = ""; return; }
    sec.classList.remove("static");
    const lastCard = cards[cards.length - 1];
    dist = Math.max(0, Math.min(lastCard.offsetLeft, lastCard.offsetLeft - (vp.clientWidth - lastCard.offsetWidth) / 2));
    sec.style.height = (innerHeight + dist) + "px";
    onScroll();
  }
  function onScroll() {
    if (isStatic()) return;
    const top = sec.getBoundingClientRect().top + scrollY;
    const p = Math.min(1, Math.max(0, (scrollY - top) / Math.max(1, dist)));
    track.style.transform = `translate3d(${-p * dist}px,0,0)`;
    prog.style.width = (p * 100) + "%";
    setActive(nearest(p * dist));
  }
  vp.addEventListener("scroll", () => {
    setActive(nearest(vp.scrollLeft));
    prog.style.width = ((vp.scrollLeft / Math.max(1, vp.scrollWidth - vp.clientWidth)) * 100) + "%";
  }, { passive: true });
  mms.forEach(m => m.addEventListener("click", () => {
    const c = cards[Number(m.dataset.i)];
    if (isStatic()) { vp.scrollTo({ left: c.offsetLeft, behavior: reduced ? "auto" : "smooth" }); return; }
    const top = sec.getBoundingClientRect().top + scrollY;
    scrollTo({ top: top + Math.min(dist, c.offsetLeft), behavior: reduced ? "auto" : "smooth" });
  }));
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", layout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  layout();
})();
