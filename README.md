# The People's Pulse

One question for the world each day — an installable PWA.
**W³ / What Matters³ by Jeff SHNaZLab** · Live: https://shnazlab2-alt.github.io/peoples-pulse/

Grown (add-only) from the Daily Global Humanity Pulse (`what-matters/daily-pulse/`, commit 099d0d7).

## Features
Kept from Daily Pulse: 30-question bank (20 by Jeff SHNaZLab + 10 marked "asked by SI/AI"); 5-option, custom-choice and 1–10 voting; open answers; story, counter-argument and suggestion boxes; anonymous toggle; media uploads in IndexedDB fingerprinted as SHA-256 Bank coins (shared/bank.js hash chain) with Verify; copyable daily summary (never auto-posted); Weekly Highlight, Community Vote, Monthly Impact (printable).

New: PWA (manifest.json, offline service worker, gold-Q icons, Add to Home Screen incl. iOS hint); 🌍 World tab with shared global tallies via `pulse-sync.js`; Dark / Light / Neon / Calm theme chips; polished header; wheel legend, ✎ highlight-correct and ❓ Q-Wheel via shared shnaz.css / shnaz-nav.js.

## What is global vs on-device
- **Global:** only anonymous +1 counters per day/question/choice (first save per device per day), via the free no-account Abacus counter API. Counts only go up and could be gamed — a pulse, not an official poll.
- **On-device:** answers, stories, counter-arguments, media, suggestions, Community Vote up-votes, Bank coins, analytics views. Offline votes are queued and sent later.
- `pulse-sync.js` also has ready Supabase and Firebase adapters: `PulseSync.configure({backend:"supabase",url,anonKey})`.

Concept and direction: Jeff SHNaZLab; AI-assisted build.
