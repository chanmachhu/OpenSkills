#!/usr/bin/env node
// Validates content/ and renders the whole site into _site/. Node stdlib only.
// Usage: node scripts/build.js           (exit code 1 on any content error)
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "_site");
const CONTENT = path.join(ROOT, "content");
const DOWNLOADS = path.join(CONTENT, "downloads");

/* ---------- load ---------- */
const readJson = f => {
  try { return JSON.parse(fs.readFileSync(f, "utf8")); }
  catch (e) { fail(`${path.relative(ROOT, f)}: invalid JSON (${e.message})`); return null; }
};
const errors = [], warnings = [];
const fail = m => errors.push(m);
const warn = m => warnings.push(m);

const themes = readJson(path.join(CONTENT, "themes.json")) || [];
const skillFiles = fs.readdirSync(path.join(CONTENT, "skills")).filter(f => f.endsWith(".json")).sort();
const skills = skillFiles.map(f => ({ file: f, data: readJson(path.join(CONTENT, "skills", f)) })).filter(s => s.data);

/* ---------- validate ---------- */
const SKILL_REQUIRED = ["id", "name", "command", "description", "theme", "platform", "contributor", "why", "yes", "no", "examples"];
const SKILL_OPTIONAL = ["source", "contact", "glyph", "cover", "year", "related", "version"];
const EX_REQUIRED = ["title", "input", "output"];
const EX_OPTIONAL = ["note", "image"];
const isText = v => typeof v === "string" && v.trim() !== "";
const isTextList = v => Array.isArray(v) && v.length > 0 && v.every(isText);

function checkFields(obj, required, optional, where) {
  for (const k of required) if (!(k in obj)) fail(`${where}: missing required field "${k}"`);
  for (const k of Object.keys(obj)) if (!required.includes(k) && !optional.includes(k)) fail(`${where}: unknown field "${k}"`);
}
function allStrings(v, out = []) {
  if (typeof v === "string") out.push(v);
  else if (v && typeof v === "object") Object.values(v).forEach(x => allStrings(x, out));
  return out;
}

const themeIds = new Set();
themes.forEach((t, i) => {
  const where = `content/themes.json [${i}]`;
  checkFields(t, ["id", "name", "description"], [], where);
  if (!/^[a-z0-9-]+$/.test(t.id || "")) fail(`${where}: id must be lowercase letters, digits and dashes`);
  if (themeIds.has(t.id)) fail(`${where}: duplicate theme id "${t.id}"`);
  themeIds.add(t.id);
});

const skillIds = new Set(skills.map(s => s.data.id));
const packaged = new Set(fs.existsSync(DOWNLOADS) ? fs.readdirSync(DOWNLOADS).filter(d => fs.statSync(path.join(DOWNLOADS, d)).isDirectory()) : []);
for (const d of packaged) if (!skillIds.has(d)) fail(`content/downloads/${d}/: no matching content/skills/${d}.json`);
const seen = new Set();
for (const { file, data: s } of skills) {
  const where = `content/skills/${file}`;
  checkFields(s, SKILL_REQUIRED, SKILL_OPTIONAL, where);
  if (s.id !== file.replace(/\.json$/, "")) fail(`${where}: "id" must equal the file name ("${file.replace(/\.json$/, "")}")`);
  if (!/^[a-z0-9-]+$/.test(s.id || "")) fail(`${where}: id must be lowercase letters, digits and dashes`);
  if (seen.has(s.id)) fail(`${where}: duplicate id "${s.id}"`);
  seen.add(s.id);
  for (const k of ["name", "command", "description", "platform", "why"]) if (k in s && !isText(s[k])) fail(`${where}: "${k}" must be a non-empty string`);
  if ("theme" in s && !themeIds.has(s.theme)) fail(`${where}: theme "${s.theme}" is not in content/themes.json`);
  for (const k of ["yes", "no"]) if (k in s && !isTextList(s[k])) fail(`${where}: "${k}" must be a non-empty list of strings`);
  if (s.source !== undefined && !/^https:\/\/\S+$/.test(s.source)) fail(`${where}: "source" must be an https:// URL`);
  for (const k of ["contact", "contributor"]) if (s[k] !== undefined && !isText(s[k])) fail(`${where}: "${k}" must be a name`);
  if (s.cover !== undefined && !(Array.isArray(s.cover) && s.cover.length === 2 && s.cover.every(c => /^#[0-9a-fA-F]{3,8}$/.test(c))))
    fail(`${where}: "cover" must be two hex colors, e.g. ["#C9DAE2", "#E8E2D3"]`);
  if (packaged.has(s.id)) {
    if (!/^\d+\.\d+\.\d+$/.test(s.version || "")) fail(`${where}: content/downloads/${s.id}/ exists, so "version" is required (e.g. "1.0.0")`);
    if (!fs.existsSync(path.join(DOWNLOADS, s.id, "SKILL.md"))) fail(`content/downloads/${s.id}/: missing SKILL.md`);
  } else if (s.version !== undefined) fail(`${where}: "version" is set but content/downloads/${s.id}/ does not exist`);
  for (const r of s.related || []) if (!skillIds.has(r)) fail(`${where}: related skill "${r}" does not exist`);
  if (!Array.isArray(s.examples) || !s.examples.length) fail(`${where}: "examples" must be a non-empty list`);
  (Array.isArray(s.examples) ? s.examples : []).forEach((ex, i) => {
    const w = `${where} examples[${i}]`;
    checkFields(ex, EX_REQUIRED, EX_OPTIONAL, w);
    for (const k of EX_REQUIRED) if (k in ex && !isText(ex[k])) fail(`${w}: "${k}" must be a non-empty string`);
    if (ex.image !== undefined && !fs.existsSync(path.join(CONTENT, "images", s.id, String(ex.image))))
      fail(`${w}: image not found at content/images/${s.id}/${ex.image}`);
  });
  if (allStrings(s).some(t => /\(\d{1,3}\)/.test(t))) fail(`${where}: no counters like "(3)" in text`);
  if (isText(s.description) && s.description.split(/[.!?](?:\s|$)/).filter(x => x.trim()).length > 1) warn(`${where}: description should be one sentence`);
  if (Array.isArray(s.yes) && s.yes.length !== 3) warn(`${where}: aim for 3 "yes" items (has ${s.yes.length})`);
  if (Array.isArray(s.no) && s.no.length !== 2) warn(`${where}: aim for 2 "no" items (has ${s.no.length})`);
}

warnings.forEach(w => console.warn(`warning: ${w}`));
if (errors.length) {
  errors.forEach(e => console.error(`error: ${e}`));
  console.error(`\n${errors.length} error(s). Nothing was built.`);
  process.exit(1);
}

/* ---------- render helpers ---------- */
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
// [label](https://…) and bare https:// URLs become links.
const inline = s => esc(s).replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)|https:\/\/[^\s)\]]*[^\s)\].,;:]/g, (m, label, url) => `<a href="${url || m}" target="_blank" rel="noopener">${label || m}</a>`).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`(.+?)`/g, '<code>$1</code>');
// Lines starting with "- " become a list, other lines paragraphs.
function rich(text) {
  let html = "", list = [];
  const flush = () => { if (list.length) html += `<ul>${list.map(l => `<li>${inline(l)}</li>`).join("")}</ul>`; list = []; };
  for (const line of text.split("\n")) {
    if (line.startsWith("- ")) list.push(line.slice(2));
    else if (line.startsWith("## ")) { flush(); html += `<p><strong>${inline(line.slice(3))}</strong></p>`; }
    else { flush(); if (line.trim()) html += `<p>${inline(line)}</p>`; }
  }
  flush();
  return html;
}
const typed = s => esc(s).replace(/`(.+?)`/g, '<span class="c">$1</span>');

const themeOf = id => themes.find(t => t.id === id);
// Global order: theme order, then file name. Drives the carousel and "Next skill".
const ordered = themes.flatMap(t => skills.map(s => s.data).filter(s => s.theme === t.id));
const coverStyle = s => { const [a, b] = s.cover || ["#E8E2D3", "#DCD5C2"]; return `background:linear-gradient(170deg,${a} 0%,${b} 100%)`; };
const glyph = s => esc(s.glyph || s.name[0]);
const askLabel = s => `Ask ${s.contact || "Basile"}`;
// Download wins over source, source over "Ask …".
const zipName = s => `${s.id}-${s.version}.zip`;
const srcShort = s => packaged.has(s.id) ? `Download v${s.version}` : s.source ? (new URL(s.source).hostname.endsWith("github.com") ? "GitHub ↗" : new URL(s.source).hostname + " ↗") : askLabel(s);
const srcLong = (s, root) => {
  if (packaged.has(s.id)) return `<a class="dl" href="${root}downloads/${esc(zipName(s))}" download>Download v${esc(s.version)} ↓</a>`;
  if (!s.source) return `<span class="pending">${esc(askLabel(s))}</span>`;
  const u = new URL(s.source);
  const label = u.hostname.endsWith("github.com") ? u.pathname.replace(/^\/|\/$/g, "") : u.hostname;
  return `<a href="${esc(s.source)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;
};
const updated = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function page({ root, title, description, body, script }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:site_name" content="OpenSkills">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<link rel="icon" type="image/png" href="${root}assets/img/favicon.png">
<link rel="apple-touch-icon" href="${root}assets/img/apple-touch-icon.png">
<link rel="stylesheet" href="${root}assets/css/style.css">
<script>try{var t=localStorage.getItem("os-color");if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
</head>
<body data-root="${root}">
<div class="wrap">
  <header class="top">
    <a class="logo" href="${root}">OpenSkills.</a>
    <nav class="lbl"><a href="${root}#catalogue">Catalog</a><button type="button" class="color-toggle lbl" id="color-toggle">Dark</button></nav>
  </header>
  <main>
${body}
  </main>
  <footer class="foot lbl"><span>OpenSkills</span><span>Updated ${esc(updated)}</span></footer>
</div>
<script src="${root}assets/js/site.js"></script>
<script src="${root}assets/js/${script}"></script>
</body>
</html>
`;
}

function card(s, root, hidden) {
  const t = themeOf(s.theme);
  const hay = [s.command, s.name, s.description, s.why, s.platform, ...s.yes].join(" ").toLowerCase();
  return `<a class="card" href="${root}skills/${s.id}/" draggable="false" data-search="${esc(hay)}"${hidden ? ' aria-hidden="true" tabindex="-1"' : ""}>
      <div class="cover" style="${coverStyle(s)}">
        <span class="glyph">${glyph(s)}</span>
        <span class="vert">${esc(s.name)}${s.year ? ` — ${esc(s.year)}` : ""}</span>
        <span class="yr">${esc(t.name)}</span>
      </div>
      <div class="c-body">
        <div class="c-cmd"><span>/</span>${esc(s.command)}</div>
        <p class="c-one">${esc(s.description)}</p>
        <dl class="c-meta">
          <dt>Platform</dt><dd>${esc(s.platform)}</dd>
          <dt>Source</dt><dd class="mono">${esc(srcShort(s))}</dd>
        </dl>
        <div class="c-go"><span>Open</span><b>→</b></div>
      </div>
    </a>`;
}

/* ---------- home ---------- */
function renderHome() {
  const root = "";
  // The carousel needs at least ~8 cards plus one full copy to loop seamlessly.
  const reps = Math.max(1, Math.ceil(8 / Math.max(1, ordered.length)));
  const loop = Array.from({ length: reps }, () => ordered).flat();
  const body = `
    <section class="hero">
      <h1>Open<br>Skills</h1>
      <div class="side lbl"><a href="#catalogue">Find a skill</a><a href="#catalogue">Scroll ↓</a></div>
    </section>
    <div class="marquee" id="mq" aria-label="All skills">
      <div class="mq-track">
        ${loop.map((s, i) => card(s, root, i >= ordered.length)).join("")}${loop.map(s => card(s, root, true)).join("")}
      </div>
    </div>
    <div class="mq-bar">
      <span class="lbl muted">Drag, or hover to pause</span>
      <div class="tr-nav"><button type="button" data-mq="-1" aria-label="Previous">←</button><button type="button" data-mq="1" aria-label="Next">→</button></div>
    </div>
    <section id="catalogue">
      <div class="cat-head">
        <h2>Catalog</h2>
        <span class="lbl muted">By theme</span>
      </div>
      <div class="searchbar">
        <form class="search" role="search" id="sform">
          <input id="q" type="search" placeholder="Search a skill or a use case…" autocomplete="off" aria-label="Search">
          <select id="th" aria-label="Theme">
            <option value="all">All themes</option>
            ${themes.map(t => `<option value="${esc(t.id)}">${esc(t.name)}</option>`).join("")}
          </select>
        </form>
        <span class="hint muted">Tip: press <span class="mono">/</span> anywhere to search.</span>
      </div>
      ${themes.map(t => {
        const items = ordered.filter(s => s.theme === t.id);
        if (!items.length) return "";
        return `<section class="theme-row" data-theme-id="${esc(t.id)}">
        <div class="tr-head">
          <div><h3>${esc(t.name)}</h3><p>${esc(t.description)}</p></div>
          <div class="tr-nav"><button type="button" data-dir="-1" aria-label="Previous">←</button><button type="button" data-dir="1" aria-label="Next">→</button></div>
        </div>
        <div class="track">${items.map(s => card(s, root)).join("")}</div>
      </section>`;
      }).join("")}
      <p class="empty" id="empty" hidden>No skill matches your search.</p>
    </section>`;
  return page({ root, title: "OpenSkills", description: "A catalog of AI agent skills, by theme: where to get them, what they're for, when to use them.", body, script: "home.js" });
}

/* ---------- skill page ---------- */
function renderSkill(s, i) {
  const root = "../../";
  const t = themeOf(s.theme);
  const next = ordered[(i + 1) % ordered.length];
  const pad = n => String(n).padStart(2, "0");
  const body = `
    <section class="s-hero">
      <div>
        <nav class="s-crumb lbl muted"><a href="${root}">← All skills</a><span>/</span><span>${esc(t.name)}</span></nav>
        <h1 class="${s.name.length > 10 ? "long" : ""}">${esc(s.name)}</h1>
        <span class="s-cmd">/${esc(s.command)}</span>
      </div>
      <div>
        <p class="s-lead">${esc(s.description)}</p>
        <div class="cover s-cover" style="${coverStyle(s)}"><span class="glyph">${glyph(s)}</span><span class="vert">${esc(s.name)}${s.year ? ` — ${esc(s.year)}` : ""}</span><span class="yr">${esc(t.name)}</span></div>
      </div>
    </section>

    <dl class="facts">
      <div><dt class="lbl muted">Where to find it</dt><dd>${srcLong(s, root)}</dd></div>
      <div><dt class="lbl muted">Platform</dt><dd>${esc(s.platform)}</dd></div>
      <div><dt class="lbl muted">Theme</dt><dd>${esc(t.name)}</dd></div>${s.contributor ? `
      <div><dt class="lbl muted">Contributor</dt><dd>${esc(s.contributor)}</dd></div>` : ""}
    </dl>

    <section class="block"><h2>What it's for</h2><div>${rich(s.why)}</div></section>

    <section class="block"><h2>When to use it</h2>
      <div class="when">
        <div class="yes"><h3>Yes</h3><ul>${s.yes.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div class="no"><h3 class="muted">Not really</h3><ul>${s.no.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      </div>
    </section>

    <section class="ex-sec" id="ex-sec">
      <div class="ex-sticky">
        <div class="ex-head">
          <h2>Examples</h2>
          <span class="lbl muted">Scroll ↓</span>
        </div>
        <div class="ex-viewport" id="ex-vp">
          <div class="ex-track" id="ex-track">
            ${s.examples.map(ex => `<article class="ex">
              <div class="ex-top"><b>${esc(ex.title)}</b>${ex.note ? `<span class="lbl muted">${esc(ex.note)}</span>` : ""}</div>
              <div class="ex-grid">
                <div class="ex-in"><div class="lbl">You type</div><pre>${typed(ex.input)}</pre></div>
                <div class="ex-out"><div class="lbl">You get</div>${rich(ex.output)}${ex.image ? `<img src="${root}content/images/${esc(s.id)}/${esc(ex.image)}" alt="${esc(ex.title)}" loading="lazy">` : ""}</div>
              </div></article>`).join("")}
          </div>
        </div>
        <div class="ex-foot">
          <div class="progress"><i id="ex-prog"></i></div>
          <div class="minimap">${s.examples.map((_, j) => `<button class="mm${j === 0 ? " on" : ""}" type="button" data-i="${j}" aria-label="Example ${j + 1}">${pad(j + 1)}</button>`).join("")}</div>
        </div>
      </div>
    </section>

    ${(s.related || []).length ? `<section class="block"><h2>See also</h2><div class="ops">${s.related.map(id => `<a class="op" href="${root}skills/${esc(id)}/"><span class="mono">/${esc(ordered.find(x => x.id === id).command)}</span></a>`).join("")}</div></section>` : ""}

    <a class="next" href="${root}skills/${next.id}/">
      <div><div class="lbl muted next-lbl">Next skill</div><div class="big">${esc(next.name)}</div></div>
      <span class="lbl">Open →</span>
    </a>`;
  return page({ root, title: `${s.name} — OpenSkills`, description: s.description, body, script: "skill.js" });
}

/* ---------- zip ---------- */
// Minimal deflate zip of a folder; entries are prefixed with the skill id, like Claude's .skill export.
// Fixed timestamps keep the archive identical between builds.
function zipFolder(dir, prefix) {
  const files = [];
  const walk = d => fs.readdirSync(d).sort().forEach(f => {
    const full = path.join(d, f);
    if (fs.statSync(full).isDirectory()) walk(full); else files.push(full);
  });
  walk(dir);
  const locals = [], centrals = [];
  let offset = 0;
  for (const full of files) {
    const name = Buffer.from(prefix + "/" + path.relative(dir, full).split(path.sep).join("/"));
    const raw = fs.readFileSync(full), data = zlib.deflateRawSync(raw), crc = zlib.crc32(raw);
    const head = (sig, extra) => {
      const b = Buffer.alloc(extra ? 46 : 30);
      let o = 0; const u32 = v => { b.writeUInt32LE(v >>> 0, o); o += 4; }, u16 = v => { b.writeUInt16LE(v, o); o += 2; };
      u32(sig); if (extra) u16(20); u16(20); u16(0x0800); u16(8); u16(0); u16(0x21);
      u32(crc); u32(data.length); u32(raw.length); u16(name.length); u16(0);
      if (extra) { u16(0); u16(0); u16(0); u32(0); u32(offset); }
      return b;
    };
    centrals.push(head(0x02014b50, true), name);
    const local = Buffer.concat([head(0x04034b50, false), name, data]);
    locals.push(local); offset += local.length;
  }
  const cd = Buffer.concat(centrals), end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, cd, end]);
}

/* ---------- write ---------- */
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.cpSync(path.join(ROOT, "assets"), path.join(OUT, "assets"), { recursive: true });
fs.cpSync(path.join(CONTENT, "images"), path.join(OUT, "content", "images"), { recursive: true });
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
fs.mkdirSync(path.join(OUT, "downloads"));
for (const s of ordered) if (packaged.has(s.id)) fs.writeFileSync(path.join(OUT, "downloads", zipName(s)), zipFolder(path.join(DOWNLOADS, s.id), s.id));
fs.writeFileSync(path.join(OUT, "index.html"), renderHome());
ordered.forEach((s, i) => {
  fs.mkdirSync(path.join(OUT, "skills", s.id), { recursive: true });
  fs.writeFileSync(path.join(OUT, "skills", s.id, "index.html"), renderSkill(s, i));
});
console.log(`Built ${ordered.length} skill page(s) into _site/`);
