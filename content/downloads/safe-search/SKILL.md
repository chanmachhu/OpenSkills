---
name: safe-search
description: Answer factual questions only from checked, dated, independent sources, and fact-check doubtful claims, rumors, articles, quotes or statistics with a verdict. Use when the user types /safe-search, asks "is this true?", "vérifie ça", "c'est vrai ?", "fact-check this", pastes a link or rumor they doubt, or wants an answer they can trust with sources listed at the end.
---

# Safe Search

One command, `/safe-search <input>`. The research is always the same; what changes is what the user gave you:

- **A question** ("what is…", "how many…", "when did…") → answer it from checked sources. There is no claim to judge, so no verdict.
- **A claim** — something someone said, wrote or shared ("I read that…", "is it true that…", a pasted link, rumor, quote or statistic) → do the same research, and also trace where the claim came from and give a verdict on it *as it was framed*. A claim can be true but old, or true but presented misleadingly, and only a verdict on the original wording catches that.

If the input mixes both (a link plus a question about it), treat it as a claim and answer the question inside the verdict section. If the user doesn't type the command but clearly wants something checked, the skill still applies.

Always answer in the language the user writes in, including the verdict labels and section titles.

Use web search for every factual point, even when you think you know the answer. The whole value of this skill is that each claim traces back to a source the user can open, and memory can't be checked that way.

## The checks (always)

Run these on every source before relying on it. They come from the user's own method, so apply all three steps.

### 1. Source and author

- **Domain**: read the exact URL. Look-alike domains (`.co` instead of `.com`, extra words added to a known brand) are a red flag.
- **Who runs the site**: check the "About" / "Qui sommes-nous" / legal notice page when the site isn't widely known.
- **Author**: is there a named author? Are they a recognized journalist, a domain expert, or anonymous?
- **Nature of the site**: rate it with one of the tiers below. Satirical sites are never used as evidence for the facts they describe.

**Source tiers** (show the tier in the source list):
- **Officiel / primaire** — government, statistics agency, court ruling, the study itself, the company's own filing, the original speech or video
- **Média reconnu** — established news organization with editorial standards and corrections
- **Expert spécialisé** — named specialist, academic, professional body
- **Blog / opinion** — personal site, opinion column, newsletter
- **Militant** — advocacy group, campaign, party (fine for "what group X claims", weak for facts)
- **Satirique** — parody site; flag it and never use as evidence
- **Anonyme / inconnu** — no identifiable author or owner

Translate tier names into the user's language.

### 2. The content itself

- **Date**: find the publication date of every source. If the information is old for its topic, say so and search whether something newer replaced it. Rough guide: breaking news or prices go stale in days to weeks; politics and policy in months; science in a few years; history rarely. A true fact from five years ago presented as current is misleading.
- **Evidence**: does the article cite sources? Follow its links. Do they lead to official data, studies or experts, or only to other pages of the same site?
- **Tone**: sensational headlines, lots of exclamation marks, very emotional or aggressive language lower trust. Reliable information is usually neutral.
- **Science and health**: go to the original study rather than articles about it. Check whether it is peer-reviewed or a preprint, the sample size, whether it was done on humans or animals/cells, and whether it has been retracted or corrected.

### 3. Cross-check

- **Three independent sources**: a fact is confirmed only when at least two or three *independent* sources report it.
- **Independence is real, not counted**: many sites copy the same wire story (AFP, Reuters, AP) or press release. Trace each article back to where its information came from. Ten articles repeating one AFP dispatch are **one** source. Say so when that's the case.
- **Fact-checkers**: for anything doubtful or viral, search the international fact-checking sites listed in `references/fact-checkers.md` to see whether it has already been checked.
- **Quotes** ("X said Y"): find the original — the speech, interview, video, official transcript or the person's own post. A quote that only exists in secondhand articles is unconfirmed. Check that the context of the original matches how the quote is being used.

## Confidence level

Give each key claim a confidence level, and explain it in a few words:

- **Élevée / High** — confirmed by 3+ independent sources, including at least one official/primary or recognized-media source, and current
- **Moyenne / Medium** — 2 independent sources, or good sources that are somewhat dated, or minor disagreements between sources
- **Faible / Low** — a single source, weak tiers only, outdated, or sources contradict each other

When confidence is low, say it plainly in the answer, not only in a label. The user should never come away more certain than the evidence allows.

## Output for a question

Answer the question directly first, then support it. Mark each key claim with its confidence level and cite its sources by number (e.g. `[1][3]`).

Structure:

```
[Direct answer in 1–3 sentences]

[Details, each key claim followed by its confidence level and source numbers]

## What I couldn't verify
[Points that remain uncertain, contradictory or unsourced. Omit the section only if there is truly nothing.]

## Sources
[the source list — see format below]
```

## Output for a claim

Structure:

```
## Verdict: [label]
[One or two sentences saying why — the single most important reason.]

## The claim
[Restate exactly what is being checked, so there is no ambiguity.]

## Where it comes from
[The original source of the claim if you can find it: who first published it, when, on what kind of site, with what author. Apply checks 1 and 2 here.]

## What reliable sources say
[Cross-check results. Each key point with its confidence level and source numbers. Say how many independent sources you found and whether some were copies of one another. Mention any fact-checker that already covered it.]

## What I couldn't verify
[Gaps, and what would settle them.]

## Sources
[the source list]
```

**Verdict labels** (translate into the user's language):
- **Vrai / True** — confirmed by independent reliable sources
- **Plutôt vrai / Mostly true** — essentially correct, with minor inaccuracies
- **Trompeur / Misleading** — contains true elements but leads to a false conclusion
- **Sorti de son contexte / Out of context** — real, but old or from another situation and presented as current or different
- **Faux / False** — contradicted by reliable sources
- **Invérifiable en l'état / Unverifiable for now** — not enough reliable evidence either way

Choose "Invérifiable" rather than forcing a verdict. A wrong "Vrai" or "Faux" does more harm than an honest "we can't tell yet".

If the user submits an image, check the claims written in or about it as text, and say that the image itself (whether it was edited or reused) is outside what this skill checks.

## Source list format

End every answer with this list, exactly in this format. It is the last thing in the response, so the user always knows where to find it.

```
## Sources
1. **[Title]** — [Publisher / site] · [Author, or "Auteur non indiqué"] · [Publication date, or "Date non indiquée"] · [Tier]
   [URL]
2. ...
```

Rules:
- Number sources in the order they are first cited in the text.
- List only sources you actually opened or that appeared in your search results and supported a claim. Never invent a title, author, date or URL. If a field is unknown, write that it is unknown.
- Include sources that contradict the answer too, not just supporting ones.
- If two sources are copies of the same original, note it on the copy: `(reprend [n])` / `(copy of [n])`.
