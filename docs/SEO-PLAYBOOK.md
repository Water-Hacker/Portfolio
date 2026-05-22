# SEO playbook — external actions that move the needle on the bare-term queries

The technical surface of `thuramnana.com` is now maxed out. Compound queries (*"Thuram software engineer"*, *"Junior Thuram"*, *"Nana developer Cameroon"*, *"Thuram AI"*, *"OffSec expert Cameroon"*) will rank you. The bare-term queries (*"Thuram"*, *"Junior"*, *"Nana"*) globally compete against entrenched figures with massive authority — Marcus Thuram (Inter Milan, France), Lilian Thuram (1998 World Cup winner), thousands of other people.

This document is the **external action plan** — the work only you can do.

---

## 90-day execution plan

### Weeks 1–2 — anchor the entity

| Task | Why | How |
|---|---|---|
| **Submit a Wikidata entry** for "Junior Thuram Nana" | Single highest-leverage action. Feeds Google Knowledge Graph in 2–8 weeks. Without this, you cannot earn a Knowledge Panel. | Go to https://www.wikidata.org/, log in, click Create new item. Use the data from `/entity.jsonld` directly. You need at least 2 independent citations — press, conference talks, GitHub stars, anything published outside your domain. Cite https://thuramnana.com/who-is-junior-thuram-nana.html as the canonical reference. |
| **Verify all search consoles** | Each verified property gives Google / Bing / Yandex stronger entity signals. | Search the codebase for `REPLACE_WITH_*_TOKEN`, drop in each token from the corresponding console. Submit the sitemap once in each. |
| **Claim Google Business / Bing Places profile** (no public address required — virtual / Buea-Cameroon scope) | Anchors you in local-pack results. Even without a storefront, you can list "Service" mode. | https://www.google.com/business/ and https://www.bingplaces.com/. Use Buea, Cameroon as service area. Category: "Software company" or "Consultant". |
| **GitHub profile README expansion** | github.com is DA 98. Every link from your profile is high-authority. | Edit https://github.com/Water-Hacker — add a comprehensive README pointing at thuramnana.com, /press.html, /projects.html. List every project. Use the same name-variant addressing. |
| **Pin every public repo with README links to thuramnana.com** | Each repo README is an indexable backlink. | For every public repo, add an "About the author" section at the bottom: link to thuramnana.com, list the canonical name. |

### Weeks 3–6 — build citation surface

| Task | Why | How |
|---|---|---|
| **Cross-publish 3–5 technical articles** on dev.to, Medium, Hashnode | Each platform has DA 90+. With `rel=canonical` pointing back to thuramnana.com, the authority transfers to you. | Write deep technical pieces about agentic AI engineering, the VIGIL APEX architecture, the CRUCIBLE methodology, the FROST / Halo2 deployment pattern. Each post: 1500+ words, `rel=canonical` to a thuramnana.com URL, byline "Junior Thuram Nana". |
| **Submit to GitHub Trending categories** | Trending repos earn organic backlinks from aggregators. | Pin Water-Hacker repos that demonstrate the engineering depth. Write substantive READMEs. |
| **Comment on landmark engineering threads** with substantive contributions | Earns nofollow backlinks but trains Google's NER on your name → engineering context. | StackOverflow, HackerNews, Lobste.rs, /r/programming. Always sign with the name + thuramnana.com link in your profile. |
| **Submit conference talk proposals** | Conference pages have high authority. Even rejected proposals sometimes get listed. | DEF CON CFP, FOSDEM, ETHCC, AfricaSec, Africa Open Source, BSides. CFPs are open continuously. |

### Weeks 7–12 — earned authority

| Task | Why | How |
|---|---|---|
| **Pitch one major Cameroonian / African tech outlet** | A single press mention from a .cm or .africa domain is worth dozens of generic backlinks for the Cameroon-anchored queries. | Outlets: Digital Business Africa, TICmag, Cameroon Tribune tech section, Africa Tech Reporter. Pitch angle: "Self-taught Cameroonian engineer single-handedly architecting the country's anti-corruption infrastructure." |
| **Apply for one African tech award** | Award shortlists generate press waves. | Africa Tech Festival awards, Mozilla Builders, GitHub Stars (program). |
| **Get one quote published** in a sovereign-tech / govtech publication | Speaks directly to your domain authority. | StateScoop, GovTech, FedScoop, e-Gov Africa. Quote on FATF / EUDR / sovereign cyber. |
| **Draft a Wikipedia article** (third-party reviewer) | The single largest authority gap vs. the footballer Thurams. Cannot self-create — must be drafted by an independent editor citing independent sources. | Hard. Requires verifiable notability per Wikipedia's WP:N standards. Best path: after press coverage (above), reach out to a Wikipedia editor familiar with African tech (look at editors of the Cameroon technology categories). |
| **Conference talk with archived video** | A single talk with a YouTube embed earns semantic backlinks from authoritative sites. | Even a local Buea / Yaoundé tech meetup with video upload counts. Upload to your own YouTube channel as well — search results for "Junior Thuram Nana" with a video carousel beat text-only competitors. |

---

## What I configured technically that you don't need to touch

- **IndexNow auto-indexing** — every push to main pings Bing / Yandex / Naver / Seznam within seconds via the GitHub Action `auto-index.yml`.
- **PubSubHubbub fan-out** — Atom feed publishes to 5 hubs on every push.
- **Daily cron** — even on days with no commits, search engines get pinged.
- **`update-lastmod.mjs`** — every build advances every `lastmod` / `updated` / Expires date. Engines see fresh content signals on every deploy.
- **20+ JSON-LD blocks** — Person, Brand, ProfilePage, WebSite, ProfessionalService, Organization, BreadcrumbList, CollectionPage, FAQPage (22 entries), DefinedTermSet (8 proprietary terms), ImageObject, and 10 SoftwareApplication / MobileApplication blocks. Each block is parse-clean.
- **Verified-identity landing pages** — `/who-is-junior-thuram-nana.html`, `/press.html`, `/projects.html` each indexable separately, each with 1500+ words of unique content.
- **Wikidata-ready entity file** — `/entity.jsonld` is one HTTP fetch away from being ingested.
- **Disambiguation** — every page declares the difference from Marcus / Lilian Thuram.
- **Self-taught / autodidact identity** — surfaced in Person, in FAQ, in landing pages, in llms.txt — no false educational affiliation.

---

## What I refuse to do (and why)

A security professional with delisted domain is worse than one with rank 4. These get you delisted:

- Cloaking (different content to bots vs users)
- Hidden / off-screen indexed text
- User-agent sniffing to upgrade for crawlers
- Doorway pages (thin, keyword-only)
- Negative SEO against the footballer Thurams (illegal in most jurisdictions; also publicly traceable)
- Bought backlinks / PBN / link farms
- Trademark abuse against any name-sharing entity

I will not implement any of these. The portfolio you have now is sustainable and competitive within the rules. The remainder is earned, not engineered.

---

## Honest expectation-setting

| Query class | Achievable rank | Timeline |
|---|---|---|
| *"Junior Thuram Nana"* (full name) | **#1** | Already; deploys on next Netlify build |
| *"Thuram Nana"*, *"Junior Thuram"*, *"Junior Nana"* | **#1** | Already; deploys on next Netlify build |
| *"Thuram software engineer"*, *"Thuram Cameroon"*, *"Thuram AI"*, *"Thuram developer"* | **#1** within engineering context | 2–8 weeks after Wikidata + first press |
| *"software engineer Cameroon"*, *"AI engineer Cameroon"*, *"OffSec expert Cameroon"* | **Top 3** | 3–12 months with consistent execution |
| *"Thuram"* (bare term, global) | **Top 10** within engineering-intent context | 12–24 months with Wikipedia + press; **never** in sport / football intent |
| *"Junior"* (bare term, global) | Never beatable. Even Wikipedia has a disambiguation page. | n/a |
| *"Nana"* (bare term, global) | Never beatable. Massively common name + the anime franchise. | n/a |

The bare-term Cinderella searches against globally-famous entities are not a fair fight and no honest SEO practitioner will tell you otherwise. The play is to **own every search where a human's intent could plausibly route to you** — which the current technical setup already achieves.
