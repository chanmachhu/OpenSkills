# OpenSkills

A small portal listing AI agent skills (Claude, Codex…), grouped by theme. Each skill has its own shareable page: where to get it, what it's for, when to use it (or not), and examples.

Live site: https://chanmachhu.github.io/OpenSkills/

Content lives in JSON files; a dependency-free Node script validates them and generates the static site. Adding a skill means adding one file. You never touch HTML or JS for that.

## Folder structure

```
.
├── content/                     ← everything editors change
│   ├── themes.json              ordered list of themes (order = order on the home page)
│   ├── skills/<id>.json         one file per skill; file name = skill id = URL
│   ├── downloads/<id>/          the skill itself (SKILL.md + files), zipped at build for the Download button
│   └── images/<id>/             optional example images for skill <id>
├── assets/                      ← look & behavior, shared by all pages
│   ├── css/style.css            all styles (colors, fonts, layout, dark mode)
│   ├── img/                     favicon (64px) and apple-touch-icon (180px), from the SIGL logo
│   └── js/
│       ├── site.js              every page: light/dark toggle, "/" search shortcut
│       ├── home.js              home: auto-scrolling carousel, search, theme filter
│       └── skill.js             skill page: examples scrolled by the page (desktop) or swiped (mobile)
├── scripts/build.js             validates content/, then renders all HTML into _site/
├── .github/workflows/pages.yml  CI: build on every PR; build + deploy to GitHub Pages on main
├── AGENTS.md                    short rules for coding agents (points here)
└── _site/                       generated output (git-ignored, never edit)
```

Generated URLs: `/` (home), `/skills/<id>/` (one page per skill, with its own title and description so Slack/Teams link previews show the skill) and `/downloads/<id>-<version>.zip`.

## Add or edit a skill

1. Create `content/skills/<id>.json`. The `<id>` is lowercase letters, digits and dashes (`my-skill`). It becomes the URL `/skills/my-skill/`.
2. Fill the fields below. Copy an existing skill as a starting point.
3. Optional: put example images in `content/images/<id>/` and reference them by file name.
4. Run `node scripts/build.js`. Fix every `error:`. Read the `warning:` lines too.
5. Preview locally (see below), then open a PR.

Editing is the same: change the file, rebuild, check, push. Renaming a file changes the URL and breaks links already shared, so avoid it.

### Full example

```json
{
  "id": "premium-frontend-skill",
  "name": "Premium Frontend",
  "command": "premium-frontend-skill",
  "description": "From a short brief to a polished React interface with React Bits animations.",
  "theme": "front-end",
  "platform": "Codex",
  "year": "2026",
  "glyph": "</>",
  "cover": ["#E9805F", "#F4CDB8"],
  "source": "https://github.com/hamza-hnt/Premium-Frontend-Skill",
  "why": "Give a React interface a **real visual direction**: the agent picks a style that fits the brief, adds interactions, then reviews the result on desktop and mobile.",
  "yes": ["Landing pages, portfolios, online shops", "Restyling an existing React app", "Starting from a two-line brief"],
  "no": ["Projects not built with React", "Static pages with no interaction"],
  "examples": [
    {
      "title": "Showcase site",
      "note": "from the README",
      "input": "Use `$premium-frontend-skill` to build\na website for a ceramics studio.",
      "output": "The agent proposes a direction (palette, type, mood), builds the site, then reviews it on desktop and mobile.",
      "image": "showcase.png"
    }
  ],
  "related": []
}
```

### Fields

| Field | Required | What it is |
|---|---|---|
| `id` | yes | Same as the file name, without `.json`. |
| `name` | yes | Display name (big title). |
| `command` | yes | How the skill is invoked, without the leading `/`. |
| `description` | yes | **One** sentence. Used on cards and in link previews. |
| `theme` | yes | A theme `id` from `content/themes.json`. |
| `platform` | yes | Free text: `Claude`, `Codex`… |
| `why` | yes | "What it's for": 1–2 sentences. |
| `yes` | yes | "When to use it": about 3 short items. |
| `no` | yes | "Not really": about 2 short items. |
| `examples` | yes | List of `{title, input, output}` plus optional `note` (e.g. `illustrative`) and `image` (file name in `content/images/<id>/`). |
| `version` | if downloadable | `MAJOR.MINOR.PATCH`. Required when `content/downloads/<id>/` exists, forbidden otherwise. |
| `source` | no | `https://` link where to get the skill (GitHub repo…). |
| `contact` | no | A person's name, shown as "Ask <name>" when there is no `source`. |
| `glyph` | no | Big symbol on the cover. Defaults to the first letter of `name`. |
| `cover` | no | Two hex colors for the cover gradient. |
| `year` | no | Shown in the card's vertical caption. |
| `related` | no | Ids of other skills, shown as "See also". |

"Where to find it" shows, in order of priority: a **Download** button if `content/downloads/<id>/` exists, else the `source` link, else "Ask <contact>", else **Ask Basile**.

Text formatting (no HTML, everything is escaped):
- `why` and `output`: `**bold**`, `` `mono` ``, and lines starting with `- ` become a bullet list.
- `input`: what the user types; `` `text` `` is highlighted (use it for the command).
- `\n` in JSON strings is a line break.

## Make a skill downloadable, publish a new version

Skills that are not on GitHub are stored **unzipped** in `content/downloads/<id>/`, so every change to `SKILL.md` shows up as a readable diff in PRs. The build zips each folder into `downloads/<id>-<version>.zip` (entries prefixed with `<id>/`, like Claude's `.skill` export).

- **Add**: unzip the `.skill` / `.zip` you received. Copy the folder that contains `SKILL.md` to `content/downloads/<id>/` (folder name = skill id). Then add `"version": "1.0.0"` to `content/skills/<id>.json`.
- **New version**: edit the files in `content/downloads/<id>/`, then bump `version` (patch `1.0.1` for a fix, minor `1.1.0` for new behavior, major `2.0.0` when usage changes). The download URL changes with the version, so nobody gets a cached old file.
- **History**: git keeps every version. `git log -p content/downloads/<id>/` shows what changed. To get an old version, check out that commit.
- Never commit `.zip` / `.skill` files. The build makes them.

The build fails if a folder has no matching skill JSON, has no `SKILL.md`, or if `version` is missing or set without a folder.

## Add a theme

Add an entry to `content/themes.json`:

```json
{ "id": "ops", "name": "Ops & cloud", "description": "Run and watch production." }
```

The array order is the order of rows on the home page. A theme with no skill is not displayed. Don't delete a theme still used by a skill: the build will fail and name the skill.

## Content rules

- Everything is in **English**.
- **No technical details that will go stale**: no command lists, flags, syntax reference or install steps. Keep usage, situations and examples. Point to `source` for the rest.
- Keep it short: one-sentence description, about 3 "Yes" and 2 "Not really".
- Unknown source → leave `source` and `contact` out: the site shows "Ask Basile".
- No counters in parentheses like "(3)". The build rejects them.
- Nothing on the site should suggest a skill can be added from the page. Additions happen in this repository.

## Design rules

- **Colors**: only the CSS variables at the top of `assets/css/style.css` (`--paper`, `--ink`, `--muted`, `--line`, `--card`, `--accent`…). Never hard-code a color in a rule. Skill covers are the only per-skill colors (`cover`).
- **Dark mode**: each color variable is redefined for dark. It follows the OS, and the header button overrides it (stored in the browser). Any new color needs both a light and a dark value.
- **Fonts**: Archivo (text, titles) and IBM Plex Mono (commands, code). Titles are uppercase with tight letter-spacing. Small labels use the `.lbl` class (11px, uppercase).
- **Fixed sizes**: font sizes are fixed in px per breakpoint (`@media (min-width:900px)`). Never use `vw`, `clamp()` or `%` for font sizes.
- **Mobile**: test at 390px wide. No horizontal page scroll. Cards and examples swipe horizontally.
- Respect `prefers-reduced-motion` (the carousel stops, examples become a plain carousel).

## Run locally

Needs Node 20.15+ and nothing else (no `npm install`).

```sh
node scripts/build.js                 # validate + generate _site/
python3 -m http.server -d _site 8000  # then open http://localhost:8000
```

Rebuild after every change. `_site/` is git-ignored.

## Deployment

`.github/workflows/pages.yml` runs `node scripts/build.js` on every pull request, so invalid content fails the PR. On every push to `main`, it builds and deploys `_site/` to GitHub Pages. If the build fails, nothing is deployed and the live site keeps the previous version.

One-time setup: repository *Settings → Pages → Build and deployment → Source: **GitHub Actions***.

## Checklist before pushing

- [ ] `node scripts/build.js` shows no `error:`, and the warnings were read.
- [ ] Text is English, short, and has no install steps, command lists or "(n)" counters.
- [ ] The new or changed skill page looks right locally, in light **and** dark mode.
- [ ] Checked at mobile width (about 390px): no horizontal scroll, examples swipe.
- [ ] Changed a file in `content/downloads/<id>/`? `version` was bumped.
- [ ] No file in `_site/` was edited or committed.
- [ ] If you renamed a skill file: you accept that old shared links break.
