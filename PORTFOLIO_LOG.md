# Portfolio Log (Artifact 1: The Portfolio)

This is the project history for my portfolio site, [SudipKing/Sudip-Portfolio](https://github.com/SudipKing/Sudip-Portfolio) (live at <https://sudipking.github.io/Sudip-Portfolio/>). It is Artifact 1 for TCSS 490 (Generative AI & Software Development). It records what I set out to build, what I asked the agents for, what I decided, and what I dropped along the way.

**Sources.** I rebuilt this log from:

- the git history (every commit's diff, with dates),
- my own prompts saved in Claude Code session transcripts (Oct 23 to Oct 31),
- one GitHub Copilot session (Oct 8),
- the old `ARTIFACT_LOG.md` (renamed to this file on Oct 31 and folded in below).

Most of the early site (Oct 7 to Oct 9 and Oct 18) was built in a web chat with an agent connected to my GitHub. No transcript survives from those chats. For those phases I describe what changed from the diffs and don't quote prompts I can't recover.

**How to read the commit authors.** The history has three kinds of commits, and the metadata shows which is which:

| Commit author / committer | What it means |
|---|---|
| `Sudip Chaudhary` with my GitHub noreply email as committer, usually one file per commit, seconds apart | The web-chat agent pushed files to the repo through its GitHub connection. |
| `Sudip Chaudhary` with committer `GitHub` | I edited or uploaded files myself in GitHub's web editor. |
| `sudip` (local git) | Committed from my own computer: the theme script on Oct 9, then Claude Code on Oct 25 and Oct 31. |

---

## 1. The idea

I wanted one public place that explains who I am to recruiters and to the class: a UW Tacoma Computer Science student looking for internships and entry-level software roles, along with my work, my club, and my research. My reflection on the Artifacts page puts the starting point this way: *"I started with creating a txt document of who i am, what ive built, what im looking for, my skills and combined it with my resume."* That text document and my resume were the raw material. I handed them to an agent to turn into a site.

My goals:

- A static site (HTML, CSS, JS, no build step, no backend) that runs on GitHub Pages straight from the repo.
- Sections for About, Skills, Experience, Projects, Research (my cellular automaton work with Dr. Chris Marriott), Currently learning, and Contact.
- Something that looks personal rather than like a template.
- Later, for the class: a place to collect all five course artifacts behind one link I can submit on Canvas each time.

## 2. Brainstorm and first draft (Oct 7)

The first version went in as four commits two seconds apart (`c32de16`, `b127c8e`, `4d306f9`, `66ac974`, Oct 7 14:37): `index.html`, `css/style.css`, `js/main.js`, and `README.md`. It was a safe, conventional first pass:

- Dark navy palette with a blue accent and IBM Plex Sans, a sticky top nav, and a hero with a "Right now" card (school, work, club, research, what I'm looking for).
- Project cards for File System Watcher, Text Insight Studio, Smart Safety Risk Analyzer, GameRank, and LEAP. Each had a **"My part: [Add what you built]"** line.
- Anything I hadn't provided yet (email, LinkedIn, resume PDF, project links, org names) was marked with a `data-placeholder` attribute. The CSS showed these as amber dashed links, and `main.js` disabled clicks on them. The README told me how to fill each one in.

The draft was useful mostly as a list of what the agent still needed from me. Most of the next two days went into replacing those placeholders with real content.

## 3. Timeline of builds

### Phase 1: Mountain theme and horizontal scrolling (Oct 7, 14:50 to 14:52)

About 13 minutes after the first draft, I had the agent restyle the site into something with more personality (`d8820dc`, `a70fc3d`, `3dc077d`, `aee2ef5`, `a782b86`):

- **Custom "mountain" theme.** Deep teal and green palette, DM Sans plus Space Mono, a fixed `mountain-bg` with stars and two ridge layers, an "SC" monogram in the nav, and hover lift on buttons and cards.
- **Horizontal layout.** Every section became a full-screen `.panel` inside a `main.horizontal` flex row. New JS scrolled sideways between panels when you clicked a nav link.
- **Real links.** LinkedIn and GitHub replaced their placeholders. The hero buttons became "See what I've built →" and "Let's connect ↗". The resume button was removed for now because I had no PDF.
- The first theme commit (`a70fc3d`) deleted the whole original stylesheet, so `3dc077d` ("Restore styles and add mountain horizontal theme") put the base styles back and layered the theme on top.
- `1173667` added my real email, and `dd39a4a` adjusted the scroll behavior for mobile.

### Phase 2: Back to vertical scrolling, plus a resume page (Oct 7, 15:11)

The horizontal layout didn't last. Twenty minutes later the agent pushed three commits with "fluid" and "readable" in their titles (`2bae67a`, `589df1c`, `487dbb7`), and `a6f0853` added a resume page:

- `2bae67a`, "Make portfolio fluid, readable, and mobile friendly": rewrote the CSS so panels stack **vertically** with soft scroll-snap, a fixed translucent nav, and breakpoints at 900px and 560px.
- `487dbb7`, "Simplify navigation for fluid vertical scrolling": replaced the horizontal-scroll JS with a short smooth-scroll-to-section handler that respects `prefers-reduced-motion`.
- `589df1c`: simplified the nav (dropped the monogram) and added **Resume ↗**.
- `a6f0853`: added `resume.html`, a dedicated resume page with education, skills, experience, and projects, plus a **Print / Save as PDF** button. It replaced the missing `assets/resume.pdf` placeholder. I chose a printable HTML page over keeping a PDF in sync.

### Phase 3: Photo-based redesign and profile picture (Oct 7 15:41 to Oct 8 10:19)

Next I edited the site myself in GitHub's web editor (`6761d42`, `0413b53`):

- **New header.** My name as the logo on the left, centered nav links, and GitHub ↗ and Resume ↗ pill buttons on the right.
- **New hero.** A "Computer Science student" pill, the tagline, a "Looking for internships… Tools I use:" strip, and a **photo of me** with two floating chips (school and GPA; intern and club president). These replaced the old "Right now" card.
- **Contact** became a plain list of full links.
- **Theme v2.** In the CSS I swapped the teal mountain palette for one taken from my photo. The stylesheet comment says: *"palette from the photo (navy vest, sand shirt, gold watch, soft blue backdrop)"*. That meant a warm navy background, a gold accent, and an italic name in the hero. The `mountain-bg` element was removed from the page.

Getting the photo to show up took several tries (Oct 7 15:43 to Oct 8 10:19). I uploaded it through the web UI into a folder I'd misspelled as `assests/`, first as a placeholder file named `self` and then as `sudip.png`. I deleted both and re-uploaded it as `sudip.jpg`. Then I pointed `index.html` at `assests/sudip.jpg` (`1473a74`), changed it to `./assests/sudip.jpg` for GitHub Pages (`ed2dbed`), and added CSS so the image always renders (`78c5c9b`). I kept the `assests` spelling instead of renaming the folder, because the paths worked and renaming would have broken them again.

### Phase 4: Real content from my resume (Oct 8, 19:55)

`3e06deb`, `761f541`, and `d6426b7` replaced the rest of the placeholder content with my real history, drawn from two versions of my resume:

- **Experience & Leadership** now lists six roles with places and dates: Software Engineer Intern (UW), President of the Tech Startup Club, Retail Business Intern (Indian Bazaar), Social Justice Summer Intern (Food Is Free Tacoma), Legislative Intern (Mi Centro), and Social Media Coordinator (UW Tacoma).
- **Projects** became "Selected Projects" with a real description, tech tags, and a "Built:" line for each project: Smart Safety Risk Analyzer, Text Insight Studio, Digital Gallery Web Application, LEAP, and File System Watcher. **GameRank was dropped**, and all the "[Add what you built]" and dead-link placeholders were removed.
- **About me** was rewritten. It mentions the Business minor and covers web, APIs, AI integrations, and hardware.
- **Skills** were aligned with both resume versions: Python, Go, and TypeScript added to Languages, and WordPress and Vercel added to Tools.
- **resume.html** was expanded to the full experience and project list.

### Phase 5: The pixel parakeet (Oct 8, 20:19 to 23:18)

This is the feature that makes the site mine: a small bird that lives in the header.

- **First version (20:19 to 20:20, `bd75053`, `4cfff07`, `eaea24f`, `2711661`, `b0f82a0`).** A 16×19 pixel-art parakeet drawn on a `<canvas>`, sitting on a CSS branch next to my name. On desktop it **follows the mouse**. After a few seconds of idle it **flies back and perches** on the branch. On mobile it stays perched. (`2711661` is an empty duplicate commit from the agent's push.)
- **Tuning (20:27, `a0c95f2`).** "Slow parakeet movement and animate flapping wings": the bird got slower easing and a trailing offset so it doesn't snap to the cursor. It also got a two-frame wing flap, a tail that moves with each flap, and a small mid-flight flutter.
- **Flowers (20:27, `92b7e4a`).** Colorful pixel flowers along the branch.
- **Budgie rewrite (23:16 to 23:18, `bf45ba2`, `19cd5ea`, `c69a20c`, my own uploads through the web editor).** I replaced the pixel version with a more detailed bird. The CSS comment calls it a *"Budgie companion and flowering perch"*:
  - The branch is now an inline SVG with leaves and blossoms that sway gently (`blossom-sway`, turned off under reduced motion).
  - The bird is drawn at twice the display resolution "to keep the feather details crisp". It has a long blue-green tail ("a budgie's distinctive silhouette"), nape stripes, a violet cheek patch, and throat spots, and its wings are drawn at an angle.
  - The canvas grew from 64×64 to 240×200.
- `0885f41` renamed "Selected Projects" to just "Projects" and dropped the "links can be added later" note.

That night I also asked GitHub Copilot in VS Code, working in my local copy in `Downloads/Sudip-Portfolio`: *"commit all these files into my github repo. i made a couple changes so upadte and commit all"*. When it asked, I gave it the repo URL. It found that GitHub already had exactly the same files (identical git trees), so it pushed nothing.

### Phase 6: Light/dark theme toggle and skill cards (Oct 9, 11:56)

`b245199` ("Update HTML, CSS, and add theme.js") was committed from my laptop. It applied a patch script, `update_portfolio.py`, that an agent wrote for me. The script is in the repo, and its header says to run it "from your Sudip-Portfolio repository root". It makes these edits and refuses to run if it can't find the anchors it expects:

- A **☀ / ☾ theme toggle** button in the nav, plus `js/theme.js`, which flips `data-theme="light"` on `<html>` and remembers the choice in `localStorage` (`portfolio-theme`).
- An inline script in `<head>` that applies the saved theme before the stylesheet renders, so the page doesn't flash dark before switching to light.
- A full **light palette** (cream background, darker gold, slate blue) that overrides the hard-coded dark colors from the original design.
- **Skills as cards.** Each skill category became a card that lifts on hover, with hover states on the individual tags. The grid drops to two columns at ≤900px and one column at ≤560px.

### Phase 7: The Artifacts page (Oct 18, 22:30 to 23:23)

When the course started asking for a portfolio link that collects all five artifacts, I extended this site rather than start a new one. The original version of this log records the plan: *"Extend the existing portfolio with a dedicated Artifacts page that serves as a public record of five builds. Keep the current visual design and add an Artifacts link in the top navigation before GitHub."*

What I asked the agent for (from that log):

- Add a separate Artifacts page with five cards.
- Link Artifact 1 to this repository and the live site.
- Link Artifact 2 to The Biosphere Realm repository.
- Leave Artifacts 3 to 5 as clear placeholders.
- Explain that each repository should document the plan, agent prompts, decisions, changes, and abandoned ideas.

What it built (`284921c`, `3a9243a`, `9f1dc5d`, `131ff19`, `e6a34f2`):

- `artifacts.html`, a standalone page in the existing style. It has a "BUILD LOG · WEEK 1–10" eyebrow, five cards (1 The Portfolio, 2 The Biosphere Realm, 3 AI Inside It, 4 For Someone Else, 5 The Moonshot) with "Not built yet" tags on 3 to 5, and a "Build log" note at the bottom.
- An **Artifacts** pill in the nav, before GitHub, on both `index.html` and `resume.html`.
- Card grid styles: 3, then 2, then 1 column, with a light-mode variant.
- `ARTIFACT_LOG.md`, the first version of this log.

Then I edited the page myself in the GitHub web editor the same night:

- `50c26a9`: changed "Artifact 01" to "Artifact 1". I cut the agent's wordier intro and descriptions down to one line each, replaced the vague Biosphere text with a real description of the game, and **deleted the agent-written reflection and the "Build log" note**. I wanted the reflections in my own words.
- `342cf05`: added the Biosphere Realm live link.
- `e9c2fbf` and `a3a0833`: wrote my own reflections for Artifacts 1 and 2. I also added repo and live-link slots plus a `___` reflection for 3 to 5 so they were ready to fill in.
- `fd9a3ea`: changed my resume title to "President · UWT Tech Startup Company".

### Phase 8: Artifact 3 card, through a pull request (Oct 25)

After building Mind Map Canvas in Claude Code, I told Claude: *"add this repo as artifact 3 in my portfolio repo, do it as a pr and ill merge (make sure only my name stays on github, for this and future commits/push/merge, i will be the sole author)"*.

- Claude found my local copy was 10 commits behind GitHub and pulled it up to date. It checked that the app was live at `sudipking.github.io/Mind-Map-Canvas/mindmap.html` (the repo root has no `index.html`). Then it filled in the Artifact 3 card: title "AI Inside It: Mind Map Canvas", a one-line description including the multi-provider support, repo and "Live app" links, and the "Not built yet" tag removed.
- It pushed the branch `artifact-3-mind-map` (`dffc1ec`), but the GitHub CLI wasn't signed in, so I opened and merged **PR #1** myself (`90c698c`).
- It left the reflection as `___` because that's mine to write. I then wrote it in the web editor (`6e59a39`): Mind Map guides you without telling you what to make.

### Phase 9: Artifact 4 card (Oct 31)

I asked Claude Code: *"add the genome repo to artifact 4 on my portfolio"*, and then *"Commit and push"*.

- It filled in the "For Someone Else" card as **Genome Phase Transition**, a research tool I built for Dr. Chris Marriott that extends his hexagonal cellular automaton. It added repo and "Live simulation" links and checked that both return 200.
- The first push was rejected because GitHub had the PR merge and my reflection edit. Claude rebased onto `origin/main` and pushed `8701879` without overwriting either.

### Phase 10: This log (Oct 31)

I renamed `ARTIFACT_LOG.md` to `PORTFOLIO_LOG.md`, so the name says which artifact it belongs to, and expanded it from the short Oct 18 note into this full history.

## 4. Decisions

- **Static HTML/CSS/JS on GitHub Pages.** No framework and no build step, so the agent's output could be pushed and go live as-is.
- **Placeholders that look like placeholders.** In the first draft, missing info was visibly marked with dashed amber links instead of fake content, so I could see what the agent still needed from me.
- **Vertical, fluid scrolling over the horizontal panel layout.** It's more readable, it works on phones, and it's the normal way people browse a portfolio.
- **A palette drawn from my own photo** instead of the generic mountain theme, so the site matches the picture in the hero.
- **A printable `resume.html` instead of a PDF.** One HTML source of truth that can still be saved as a PDF.
- **Real content only.** I replaced every "[Add …]" line with real experience and project text and dropped projects (GameRank) I couldn't describe properly.
- **A personal touch.** The parakeet/budgie that follows the cursor and perches by my name. I iterated on it until it felt alive: slower movement, flapping, flowers, then a detailed budgie with a swaying SVG branch. It respects reduced motion and stays put on mobile.
- **Light/dark toggle saved in `localStorage`,** applied before the first paint to avoid a flash of the wrong theme.
- **Extend this site for the course** instead of building a separate artifacts site. The Artifacts page reuses the same stylesheet, nav, and theme script.
- **Reflections in my own words.** I deleted the agent's draft reflections and let the agent fill in only titles, descriptions, and links.
- **Sole authorship on GitHub.** From Oct 25 on, I told Claude that only my name goes on commits, pushes, PRs, and merges. No AI co-author lines.
- **Changes as a PR I merge myself** (Artifact 3), so I review each change to the live site before it goes up.

## 5. Abandoned ideas

- **The horizontal side-scrolling layout** (Oct 7, 14:50 to 15:11). Each section was a full-screen panel in a sideways row. It lasted about 20 minutes before I switched to vertical scrolling. The `class="horizontal"` on `<main>` is still there but no longer does anything.
- **The teal "mountain" theme** with stars and ridge silhouettes. It was replaced by the palette from my photo, and the `mountain-bg` markup was removed (some unused `.mountain-bg` and `.ridge` CSS is still in the stylesheet).
- **The "SC" monogram logo.** Dropped in favor of my full name.
- **The "Right now" at-a-glance card** in the hero. Replaced by my photo and two info chips.
- **A downloadable `assets/resume.pdf`.** Never added. `resume.html` with print-to-PDF replaced it.
- **The GameRank project card.** Removed when real project details went in.
- **The original 16×19 pixel-art parakeet and CSS pixel flowers.** Replaced the same night by the detailed canvas budgie and the SVG flowering branch. The idea stayed; the art style changed.
- **The "Selected Projects" title and the "links can be added later" note.** Shortened to "Projects".
- **Agent-written reflections and the "Build log" note on the Artifacts page.** Deleted in favor of my own reflections.
- **"Artifact 01" numbering.** Changed to "Artifact 1".

## 6. Where it stands / next

**Live now:** the home page (hero with photo, About, skill cards, six experience entries, five projects, Research, Currently learning, Contact), the light/dark toggle, the budgie in the header, `resume.html`, and `artifacts.html` with Artifacts 1 to 4 linked to repos and live sites.

**Still to do:**

- **Artifact 4 reflection.** Still `___`.
- **Artifact 5 ("The Moonshot").** Still a placeholder with `---` links and the "Not built yet" tag.
- **Stale README.** `README.md` still describes the Oct 7 placeholder workflow (`data-placeholder`, `assets/resume.pdf`), which no longer applies.
- **Leftover patch script.** `update_portfolio.py` is still in the repo. It could be removed now that its changes are applied.
- **Theme toggle on `resume.html`.** The resume page doesn't load `theme.js`, so it ignores the toggle.
- **Commit names.** Local commits show "sudip" instead of "Sudip Chaudhary". GitHub links both to my account, but I may set my full name in git config.
- **Leftover code from abandoned layouts.** The stylesheet still has unused mountain-theme rules (`.mountain-bg`, `.ridge`), and `<main>` still carries the `horizontal` class. Both could be cleaned up.
