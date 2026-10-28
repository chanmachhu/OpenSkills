# OpenSkills

A small portal listing AI agent skills (Claude, Codex…), grouped by theme. Each skill has its own shareable page: where to get it, what it's for, when to use it (or not), and examples.

Live site: https://chanmachhu.github.io/OpenSkills/

Content lives in JSON files; a dependency-free Node script validates them and generates the static site. Adding a skill means adding one JSON file (plus the skill's own folder if it is downloadable). You never touch HTML or JS for that.

Each skill page shows: name, command, one-sentence description, a facts row (**Where to find it** · **Platform** · **Theme** · **Contributor**), "What it's for", "When to use it", examples, "See also" and "Next skill".

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

Before writing anything, collect the information below from the person adding the skill (see [Questions to ask](#questions-to-ask-before-adding-a-skill)).

1. Create a branch (see [Workflow](#workflow)).
2. Create `content/skills/<id>.json`. The `<id>` is lowercase letters, digits and dashes (`my-skill`). It becomes the URL `/skills/my-skill/`.
3. Fill the fields below. Copy an existing skill as a starting point.
4. If the skill is not on GitHub, add its files to make it downloadable (see [Downloadable skills and versions](#downloadable-skills-and-versions)).
5. Optional: put example images in `content/images/<id>/` and reference them by file name.
6. Run `node scripts/build.js`. Fix every `error:`. Read the `warning:` lines too.
7. Preview locally (see below), then open a PR.

Editing is the same: change the file, rebuild, check, push. Renaming a file changes the URL and breaks links already shared, so avoid it.

### Questions to ask before adding a skill

Ask them **all in one message**. If the skill's files are provided, read its `SKILL.md` first, draft the answers you can, and ask the person to confirm or correct them instead of asking from scratch.

1. **Contributor**: who created the skill (full name)?
2. **Where to get it**: a public link (GitHub…), or the files (`.skill` / `.zip`) to make it downloadable? Which version (default `1.0.0`)?
3. **Platform**: Claude, Codex, other?
4. **Name and command**: display name, and how it is invoked?
5. **Theme**: which existing theme (list them)? If none fits, the new theme's name and one-line description.
6. **What it's for**: in one sentence, and the problem it solves.
7. **When to use it**: about 3 situations where it shines, and 2 where it doesn't.
8. **Examples**: 2–3 cases (what you type, what you get). Real or illustrative? Any screenshot?
9. **Dependencies**: does it need other skills, tools or accounts to work?
10. **Related skills** already in the catalog, if any.

Don't open the PR while an answer is missing. Never fill a gap with a guess (especially the contributor).

### Full example

```json
{
  "id": "front-maxer",
  "name": "Front Maxer",
  "command": "front-maxer",
  "description": "Designs, builds and reviews interfaces by combining UI/UX research, art direction and an ergonomics review.",
  "theme": "front-end",
  "platform": "Codex",
  "contributor": "Hugo Spyropoulos",
  "version": "1.0.0",
  "year": "2026",
  "glyph": "◐",
  "cover": ["#E7B9A4", "#EFE6D6"],
  "why": "Three design skills behind one entry point. The agent keeps **one coherent direction** and your project's choices.",
  "yes": ["Landing pages, portfolios, product pages", "Improving a dashboard without losing its density", "Reviewing the usability of mobile or desktop screens"],
  "no": ["Back-end or data work with no interface", "Without the three design skills installed alongside"],
  "examples": [
    {
      "title": "A landing page",
      "note": "from the skill",
      "input": "Use `$front-maxer` to create a\nlanding page for my photo studio.",
      "output": "The agent sets a direction, builds the page, then checks it at small and large sizes.",
      "image": "landing.png"
    }
  ],
  "related": ["code-maxer"]
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
| `contributor` | yes | Who created the skill (full name), shown as **Contributor**. Ask the author; never guess. |
| `why` | yes | "What it's for": 1–2 sentences. |
| `yes` | yes | "When to use it": about 3 short items. |
| `no` | yes | "Not really": about 2 short items. |
| `examples` | yes | List of `{title, input, output}` plus optional `note` (e.g. `illustrative`) and `image` (file name in `content/images/<id>/`). |
| `version` | if downloadable | `MAJOR.MINOR.PATCH`. Required when `content/downloads/<id>/` exists, forbidden otherwise. |
| `source` | no | `https://` link where to get the skill (GitHub repo…). |
| `contact` | no | A person's name, shown as "Ask <name>" when there is neither a download nor a `source`. |
| `glyph` | no | Big symbol on the cover. Defaults to the first letter of `name`. |
| `cover` | no | Two hex colors for the cover gradient. |
| `year` | no | Shown in the card's vertical caption. |
| `related` | no | Ids of other skills, shown as "See also". |

"Where to find it" shows, in order of priority: a **Download** button if `content/downloads/<id>/` exists, else the `source` link, else "Ask <contact>", else **Ask Basile**.

Text formatting (no HTML, everything is escaped):
- `why` and `output`: `**bold**`, `` `mono` ``, and lines starting with `- ` become a bullet list.
- `input`: what the user types; `` `text` `` is highlighted (use it for the command).
- `\n` in JSON strings is a line break.

## Downloadable skills and versions

Skills that are not on GitHub can be downloaded straight from their page (**Download vX.Y.Z** button). Their files are stored **unzipped** in `content/downloads/<id>/`, so every change to a `SKILL.md` is a readable diff in PRs. At build time each folder becomes `downloads/<id>-<version>.zip`, with entries under `<id>/` (the same layout as Claude's `.skill` export). The zip is identical from one build to the next.

```
content/downloads/front-maxer/
├── SKILL.md            required, at the root of the folder
├── agents/openai.yaml  any other file the skill needs, kept as is
└── references/…
```

### Add a downloadable skill

1. Unzip what you received. A `.skill` file is a zip with another extension: rename it or open it with any unzip tool.
2. Find the folder that directly contains `SKILL.md`, and copy **its content** to `content/downloads/<id>/` (folder name = skill id = JSON file name).
   - `.skill` export or skill zip: `<name>/SKILL.md` → copy the `<name>/` folder.
   - Claude plugin zip (`.claude-plugin/plugin.json` + `skills/<name>/SKILL.md`): copy only `skills/<name>/`. The plugin manifest is not needed.
3. In `content/skills/<id>.json`, set `"version": "1.0.0"` (or the version the author gave) and `"contributor"`.
4. `node scripts/build.js`, then check the button on the local page and open the zip once.

### Publish a new version

1. Edit or replace the files in `content/downloads/<id>/`.
2. Bump `version` in `content/skills/<id>.json`, using [semantic versioning](https://semver.org):

   | Change | Bump | Example |
   |---|---|---|
   | Typo, wording, small fix; same behavior | patch | `1.0.0` → `1.0.1` |
   | New ability or better results; same way to use it | minor | `1.0.1` → `1.1.0` |
   | Different usage: renamed command, removed ability, new required companion skill | major | `1.1.0` → `2.0.0` |

3. Update the page text if usage changed (`why`, `yes`, `no`, `examples`).
4. One PR per version, titled e.g. `front-maxer 1.1.0: …`, so `git log` reads like a changelog.

The download URL contains the version, so a new version never serves a cached old file. Links to an old zip stop working after the bump, which is why the site links to skill pages, not zips.

### Get an old version

Git is the history: `git log --oneline -- content/downloads/<id>/` lists the versions, and `git diff <old> <new> -- content/downloads/<id>/` shows what changed. To rebuild an old zip, check out that commit and run the build.

### What the build checks

It fails when a folder in `content/downloads/` has no matching skill JSON, has no `SKILL.md`, when `version` is missing for a downloadable skill, or when `version` is set without a folder. It does **not** detect a changed folder without a version bump: reviewers check that in the PR.

Never commit `.zip` or `.skill` files (they are git-ignored). The build makes them.

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
- `contributor` is the person who created the skill. It is required: ask, never guess.
- The skill's own files (`content/downloads/<id>/`) are the author's work and may be in any language. Only the site text must be English.
- No counters in parentheses like "(3)". The build rejects them.
- Nothing on the site should suggest a skill can be added from the page. Additions happen in this repository.

## Design rules

- **Colors**: only the CSS variables at the top of `assets/css/style.css` (`--paper`, `--ink`, `--muted`, `--line`, `--card`, `--accent`…). Never hard-code a color in a rule. Skill covers are the only per-skill colors (`cover`).
- **Dark mode**: each color variable is redefined for dark. It follows the OS, and the header button overrides it (stored in the browser). Any new color needs both a light and a dark value.
- **Fonts**: Archivo (text, titles) and IBM Plex Mono (commands, code). Titles are uppercase with tight letter-spacing. Small labels use the `.lbl` class (11px, uppercase).
- **Fixed sizes**: font sizes are fixed in px per breakpoint (`@media (min-width:900px)`). Never use `vw`, `clamp()` or `%` for font sizes.
- **Mobile**: test at 390px wide. No horizontal page scroll. Cards and examples swipe horizontally.
- Respect `prefers-reduced-motion` (the carousel stops, examples become a plain carousel).

## Workflow

`main` is protected: every change goes through a pull request, and the PR can only be merged when the `build` check passes.

1. Start from an up-to-date `main`: `git switch main && git pull`.
2. Create a branch per change: `git switch -c add/<id>`, `update/<id>-1.1.0`, `fix/…`.
3. Commit, push, open a PR. CI runs `node scripts/build.js`.
4. Merge when green. The site redeploys automatically within about a minute.
5. After a merge, never push to that branch again: new commits there will not reach `main`. Start a new branch from `main` instead.

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
- [ ] New skill: every question above was answered by the person adding it; nothing was guessed.
- [ ] Changed a file in `content/downloads/<id>/`? `version` was bumped, following the table above.
- [ ] Downloadable skill: the button works locally and the zip contains `<id>/SKILL.md`.
- [ ] Working on a fresh branch from `main`, not on an already-merged one.
- [ ] No file in `_site/` was edited or committed.
- [ ] If you renamed a skill file: you accept that old shared links break.
