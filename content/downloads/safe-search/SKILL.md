---
name: safe-search
description: Answer factual questions only from checked, dated, independent sources, and fact-check doubtful claims, rumors, articles, quotes or statistics with a verdict; a strict mode adds an independent double check. Use when the user types /safe-search or /safe-search strict, asks "is this true?", "vérifie ça", "c'est vrai ?", "fact-check this", pastes a link or rumor they doubt, or wants an answer they can trust with sources listed at the end.
---

# Safe Search

Two modes:
- **Standard**: `/safe-search <input>`. Steps 1–7 below.
- **Strict**: `/safe-search strict <input>`, or when the user asks for a double check. Steps 1–7, then step 8: an independent agent checks the draft before the user sees it. Roughly double the cost; use it only when asked.

The research is the same for any input; what changes is what the user gave you:

- **A question** ("what is…", "how many…") → answer it from checked sources. No verdict.
- **A claim**: something someone said, wrote or shared (a rumor, link, quote, statistic, "I read that…") → same research, plus where the claim came from and a verdict on it *as it was framed*. A claim can be true but old, or true but presented misleadingly; only a verdict on the original wording catches that.

A link plus a question about it counts as a claim; answer the question inside the verdict. The skill also applies when the user clearly wants something checked without typing the command.

Answer in the user's language, including all labels and section titles below (they are written in English here only as names).

Search the web for every factual point, even when you think you know the answer: the value of this skill is that every claim traces back to a page the user can open.

**The standard is 100%: every factual statement in the answer must be stated by a source you opened, and every source number must back the exact statement it sits next to.** Four rules make that reachable:
- **Say less: at most about 10 key facts.** Include only what is needed to answer or judge the claim. Every extra fact is one more thing that can be wrong. Leave out background, side studies, minor details (exact issue numbers, territories lists, secondary dates) and advice unless the user needs them.
- **One fact per line, 1–2 sources per fact.** Never put several facts in one sentence followed by a pooled list like [1][2][3][4][5]: a source rarely states all of them. Cite the best source (primary first) and at most one confirming source. The confidence label is where you report that more sources agree.
- **Primary over secondary.** When the primary source is available (the study, the decree, the fact-checker's own article, the original quote research), cite it and skip pages that relay it. Use blogs and opinion pieces only when the claim is about them. When you report who found or said something ("the archivist traced it to…"), cite the page that names that person.
- **Say it the way the source says it.** Don't strengthen ("most important", "the data converge", "proves"), generalize from one study to "studies", or describe a person's role more precisely than the source does. If you add an inference, label it as yours ("my reading:").

## Workflow

### 1. Split the input into individual facts

Most claims bundle several facts, and rumors often mix true and false ones. "A new study proves coffee cuts Alzheimer's risk by 65%" is four checks: the study exists, it is new, the figure is 65%, and it shows causation rather than correlation. Verify each fact separately and say which ones hold. For a question, list the few facts your answer rests on.

### 2. Look for existing fact-checks first (claims only)

Before your own digging, search whether the claim was already checked: combine its key words with a fact-checker's name, or use Google Fact Check Explorer (toolbox.google.com/factcheck/explorer), which searches many at once. Useful fact-checkers:
- Global: AFP Fact Check, Reuters Fact Check, AP Fact Check
- English: Full Fact, BBC Verify, PolitiFact, FactCheck.org, Snopes, AAP FactCheck
- French: Les Décodeurs (Le Monde), CheckNews (Libération), Vrai ou Faux (franceinfo)
- Other: Maldita.es, Newtral (Spain), Correctiv (Germany), Facta (Italy), Lupa, Aos Fatos (Brazil)
- Science and health: Science Feedback / Health Feedback; Retraction Watch for retracted studies
- EUvsDisinfo (EU foreign service) documents Russian disinformation campaigns; treat it as an official source with a political mission, not a neutral fact-checker.

To judge a fact-checker not listed here, check whether it is a current member of the **EFCSN** (efcsn.com, the user's preferred reference, European network with an elected governance body) or the **IFCN** (ifcncodeofprinciples.poynter.org, global network run by the US Poynter Institute). Membership signals method and transparency, not that a given verdict is right, and it lapses: check the outlet is listed now.

An existing fact-check is a strong source but not the end: confirm it covers the same claim and is still current.

### 3. Go upstream to the origin

Find where the information first appeared: the study, the official data, the original speech or post, the first outlet to report it. Most pages repeat others. For quotes ("X said Y"), find the original recording, transcript or post; a quote that exists only in secondhand articles is unconfirmed, and check the original context matches how it is used. For studies, check peer review vs preprint, sample size, humans vs animals or cells, and retractions.

### 4. Judge each source by reading laterally

Don't judge a site by what it says about itself: logos, official-looking domains and "About" pages are easy to fake. Professional fact-checkers leave the site quickly and search what *others* say about the site and the author (news coverage, Wikipedia, fact-checker databases). Do the same for any source that isn't widely known. Also note:
- **Domain**: look-alikes (`.co` for `.com`, extra words added to a known brand) are a red flag.
- **Date**: when the information is old for its topic, say so and search for anything newer that replaces it. A true fact from five years ago presented as current is misleading.
- **Evidence**: do its links lead to primary sources, or only to its own pages?

Give each source one **tier** (translated in the output):
- **Official / primary**: government, statistics agency, court ruling, the study itself, a company's own filing, the original speech or document
- **Recognized media**: established newsroom with editorial standards and corrections
- **Specialist**: named expert, academic, professional body
- **Blog / opinion**: personal site, column, newsletter
- **Activist**: advocacy group, campaign, party; fine for "what group X claims", weak for facts
- **Satirical**: parody; never evidence for what it describes
- **Unknown**: no identifiable author or owner

### 5. Keep an evidence log while you read

Every time an opened page supports a fact, note in your working notes (not in the answer): the fact, the source, and a short **word-for-word quote** from the page that states it, plus the page's exact title as it appears on the page. Check that the quote is about your topic: a remark in the same article about a different study or person does not count. Numbers go in the log exactly as the source gives them, with their basis: which measure (risk, odds, hazard ratio), compared with which group, over what period, for whom. Most numeric errors come from dropping that basis.

A page you could not open or read in full supports nothing: it has no quote. Pages known only from a search snippet, a headline, or another article's description of them stay out of the log.

You write the answer only from the log. Once a fact reaches High confidence, stop searching for it.

### 6. Cross-check and set the confidence level

A fact needs **independent** sources. Many articles copy the same wire story (AFP, Reuters, AP) or press release: ten articles repeating one AFP dispatch are **one** source, and you say so.

Confidence for each key fact:
- **High**: 3 or more independent sources, at least one official/primary or recognized media, and current
- **Medium**: 2 independent sources, or good sources that are somewhat dated, or minor disagreement
- **Low**: 1 source, only weak tiers, outdated, or sources contradict each other

Exception: when you opened the official or primary document that itself establishes the fact (the law or decree setting a rate, the official dataset, the study reporting its own result, the original recording of a quote), that one source is enough for High on what it establishes. Articles that merely repeat it add nothing to the count.

A fact is **confirmed** only at High. When confidence is Low, say it plainly in the text, not only in the label: the user should never come away more certain than the evidence allows.

### 7. Re-read the cited pages and audit before sending

Checking from memory misses errors, so this step re-opens the pages. Draft the answer, then:
1. List each (source number → statements it is attached to) pair.
2. **Re-open each cited page** (WebFetch) and ask for the exact sentence that supports each of its statements, and for the page's title.
3. Sentence found and it says the same thing → keep.
4. No sentence for that statement on that page → remove that source number from it. If no number is left, remove the statement or move it to "What I couldn't verify".
5. The sentence is weaker, narrower or about something else → rewrite your statement to match it, or remove it.
6. Numbers → compare digit by digit, including the basis (risk vs odds, compared with whom).
7. Title, author and date in the source list → copy them from what the page shows.

This is how auditable answers are made reliable: find a supporting quote for each claim after drafting, and retract any claim without one. Because the answer has few facts and each has 1–2 sources, this costs only a few page loads.

Then check:
- [ ] Every remaining fact has a confidence level and source numbers
- [ ] Statements about your own search ("I found no fact-check on this") appear only in "What I couldn't verify", worded as what you searched
- [ ] Inferences are labeled as yours
- [ ] The source list contains only opened pages. A source you wanted but could not read goes in "What I couldn't verify" with its URL, not in the list, and is never cited as support
- [ ] No title, author, date or URL is invented; unknown fields say they are unknown
- [ ] Copies of the same original are marked as copies
- [ ] For a claim: the verdict matches the facts found in step 1
- [ ] The source list is the very last thing in the answer

### 8. Strict mode only: independent check

A writer checking its own draft misses subtle errors (a quote credited to the wrong person, a figure at the wrong time point, a source cited for words only another source contains). A fresh agent that did not do the research catches them, so in strict mode the draft goes to one before it is sent.

1. Save the draft to a file and start a new agent (the Agent / Task tool) with this brief, filling in the path:

   > You are an independent fact-checker. Do not trust the answer in `<path>`. List every factual statement in it, one fact per item. Verify each one yourself on the web, preferring primary sources, and rate it CORRECT, INCORRECT, PARTLY (imprecise or overstated) or UNVERIFIABLE, with what the truth is and a URL for anything not CORRECT. Then open every cited source and check that it states every statement its number is attached to (SUPPORTS / DOES_NOT_SUPPORT, naming the statement / UNREACHABLE), and that its title, author and date match the page. Report also any source presented as read that could not be read. Reply with the list.

2. Apply the report to the draft:
   - INCORRECT → fix it with the checker's source, or remove it.
   - PARTLY → rewrite it to match what the source says.
   - UNVERIFIABLE → remove it, or move it to "What I couldn't verify".
   - DOES_NOT_SUPPORT → remove that source number from the statement. If no number is left, treat the statement as UNVERIFIABLE.
   - Wrong title, author or date → copy it from the page.
   - If a fix changes a fact that the verdict rests on, re-check the verdict.
3. Just above "What I couldn't verify", add one line with the result, counted after fixes, e.g. `Independent check: 18/18 statements confirmed, 5/5 sources verified (2 statements corrected, 1 removed).`

If no agent tool is available, do the check yourself as a separate pass, re-opening every cited page as in the brief, and write `Check: done by the same assistant, not independent` in that line instead, so the user knows.

## Output

### For a question

```
[Direct answer in 1–3 sentences]

[Details: each key fact with its confidence level and source numbers, e.g. (High) [1][3]]

## What I couldn't verify
[Uncertain, contradictory or unsourced points. Omit only if there is truly nothing.]

## Sources
[source list]
```

### For a claim

```
## Verdict: [label]
[1–2 sentences: the main reason.]

## The claim
[Exactly what is being checked, split into its facts from step 1.]

## Where it comes from
[Origin: who first published it, when, what kind of source, which author.]

## What reliable sources say
[Each fact with confidence level and source numbers. How many independent sources, which were copies, which fact-checkers already covered it.]

## What I couldn't verify
[Gaps, and what would settle them.]

## Sources
[source list]
```

Verdict labels:
- **True**: confirmed by independent reliable sources
- **Mostly true**: essentially correct, with minor inaccuracies
- **Misleading**: true elements leading to a false conclusion
- **Out of context**: real, but old or from another situation, presented as current or different
- **False**: contradicted by reliable sources
- **Unverifiable for now**: not enough reliable evidence either way

Prefer "Unverifiable for now" to a forced verdict: a wrong True or False does more harm than an honest "we can't tell yet".

If the user submits an image, check only the claims written in or about it, and say that whether the image itself was edited or reused is not checked.

### Source list format

```
## Sources
1. **[Title]** — [Publisher / site] · [Author, or "Author not given"] · [Publication date, or "Date not given"] · [Tier]
   [URL]
```

Number sources in order of first citation. Include sources that contradict the answer, not only supporting ones. Mark copies: `(copy of [n])`.

## Example (fictional, to show the shape; user wrote in French)

```
## Verdict : Sorti de son contexte
La vidéo est authentique, mais elle date d'inondations de 2019 au Mozambique, pas de la tempête de cette semaine.

## L'affirmation
Une vidéo virale montre « Marseille sous les eaux hier ». Deux faits : (a) la vidéo montre Marseille, (b) elle a été filmée hier.

## D'où ça vient
Publiée le 12/03 par un compte X anonyme créé il y a un mois, sans source [1].

## Ce que disent les sources fiables
- (a) Faux : la vidéo a été tournée à Beira, au Mozambique (Élevée) [2][3]
- (b) Faux : première publication en mars 2019 (Moyenne : deux sources indépendantes) [2][3]
Deux fact-checkers l'ont vérifiée séparément [2][3] ; l'article [4] reprend simplement [2].

## Ce que je n'ai pas pu vérifier
L'auteur de la vidéo d'origine n'est pas identifié.

## Sources
1. **[Titre du post]** — X · Compte anonyme · 12/03/2026 · Inconnu
   [URL]
2. ...
```
