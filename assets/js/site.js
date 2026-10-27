/* Shared by every page: light/dark toggle and the "/" search shortcut. */
(() => {
  const btn = document.getElementById("color-toggle");
  const html = document.documentElement;
  const isDark = () => (html.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) === "dark";
  const label = () => { btn.textContent = isDark() ? "Light" : "Dark"; btn.setAttribute("aria-label", `Switch to ${btn.textContent.toLowerCase()} mode`); };
  btn.addEventListener("click", () => {
    html.dataset.theme = isDark() ? "light" : "dark";
    try { localStorage.setItem("os-color", html.dataset.theme); } catch (e) {}
    label();
  });
  label();

  addEventListener("keydown", e => {
    if (e.key !== "/" || /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
    e.preventDefault();
    const q = document.getElementById("q");
    if (q) { q.scrollIntoView({ block: "center" }); q.focus(); }
    else location.href = document.body.dataset.root + "#search";
  });
})();
