# TEAZ TIME lookalikes (2026) — 2026-10-21

Report only. All times MT.

**Anchor:** TEAZ TIME blueprint, Drive createdTime 2026-05-03 15:57:39 MDT.

**The four features checked:**
- **C:** credibility or reputation score
- **V:** AI voice modes or tones
- **S:** sentiment or emotion analysis
- **P:** polls or raffles

**Days:** theirs minus Jeff's, so a positive number means after Jeff (Jeff first).

**Colours:** purple if within 7 days either way; grey if only a date is known; green if Jeff was first; amber if they were first by 30 days or less; red if they were first by more than 30 days.

**Already logged (not repeated here):** answe.rs and Splitted (polls); Proof of Human and Vertrauen/Moontask (credibility); the voice giants in VOICE-AI-CENSUS. Those are in TEAZ-TIME-COMPONENTS-SIDE-BY-SIDE and PROOF-TIMELINE. None of them combines 3 of the 4 features.

**App Store dates:** iTunes `releaseDate` is a day boundary (07:00Z, which is 01:00 MDT), so treat those times as date-level.

## Honest answer: nothing found combines all four
No 2026 product found has **all four** features. In particular, no credibility or poll app also has AI voice *tones*. Two apps reach 3 of 4 only under a loose reading of one feature. Three more are partial (2 of 4).

| Name / maker | What it does | Features | First-public link (curl) | Date (MT) | Label | Days after Day One | Colour |
|---|---|---|---|---|---|---|---|
| **FLIC Rate the News** / FLIC LLC | Crowdsourced news rating: users vote bias and credibility. An AI engine scans articles for "loaded language, emotional manipulation" and gives a Credibility Score out of 10. | **C** yes; **S** yes (emotional-manipulation analysis); **P** loose (rating votes, not polls); **V** no ("your voice" is a figure of speech) | https://apps.apple.com/us/app/flic-rate-the-news/id6759640119 (200); releaseDate 2026-05-03T07:00:00Z | 2026-05-03 01:00 MDT (date-level) | VERIFIED (iTunes lookup) | **−0.6** (theirs first, same day) | **purple** |
| **TellTru Social** / TellTru, Inc | Trust-based social network: trust scores, peer vouching, "trust-circle polls", and multi-agent AI that analyses every post for toxicity and misinformation. | **C** yes; **P** yes; **S** loose (toxicity moderation, not sentiment reading); **V** no | https://apps.apple.com/us/app/telltru-social/id6759533655 (200); releaseDate 2026-08-13T07:00:00Z | 2026-08-13 01:00 MDT (date-level) | VERIFIED | +101.4 | green |
| Credail / Credail Inc. | Messaging app with an AI-driven "Credail Score" built on four pillars (Reliability, Communication, Character, Speech Purity), plus group polls. | **C** yes; **P** yes; **S** loose (AI scoring of speech); **V** no (voice notes only) | https://apps.apple.com/us/app/credail/id6777994889 (200); releaseDate 2026-06-18T07:00:00Z | 2026-06-18 01:00 MDT (date-level) | VERIFIED | +45.4 | green |
| PingPolls v1.0 / PingPolls (Azvya) | Chat-style forms and polls with AI voice-note input, "Certiscore" preference scoring, and "Ask AI" over results. | **P** yes; **V** loose (voice *input*, not voice tones); **C** no (Certiscore measures answer certainty, not reputation); **S** no | https://hunted.space/dashboard/pingpolls/launches/pingpolls-v1-0 (200) | 2026-01-26 (date only) | SECONDARY (Product Hunt tracker) | −97.2 | grey |
| Flare / Joan Mateo Duarte and Franco Quattroqui (Rosario, Argentina; backed by an ElevenLabs grant) | Voice-first social app: AI agents turn friends' moments and mood entries into roughly 90-second voice briefings. | **V** yes; **S** yes (mood); **C** no; **P** no | https://makerstack.co/reviews/flare-review/ (202 to box curl; read via search) | 2026-05-08 (date only; Product Hunt #3) | SECONDARY (review site; Product Hunt page not curl-checked) | +4.8 | purple |

## Notes
- **FLIC** is the closest match in name and in time. It went live on the App Store the same calendar day as TEAZ TIME, about 15 hours before Jeff's 15:57 file, at date-level precision. It covers credibility and emotion analysis but has no voice and no polls. **Timing is not causation**, and the two are different products: a news-rating app versus a social app.
- **Voice tones plus credibility** do not appear together in any 2026 app found. Voice tones remain a feature of the big assistants already logged in VOICE-AI-CENSUS.
- **Coverage:**
  - iTunes Search API: 8 queries of up to 100 results each, filtered to `releaseDate` ≥ 2026 and keyword-scored on descriptions.
  - HN Algolia: 0 hits for credibility, polls and voice together since 2026-01-01.
  - Google Play: the search page loads (200), but it has no release-date API, so it was not mined. Play-only apps may be missed.
  - Web search: PingPolls and Flare.
- **Not checked:** maker identities beyond the store "seller" names.

## Spoken summary (~80 words)
"Nothing in 2026 combines all four TEAZ TIME features. No credibility or poll app also has AI voice tones. The closest is FLIC Rate the News: a credibility score, AI emotional-manipulation analysis and crowd rating votes. It hit the App Store the same day as Jeff's blueprint, a few hours earlier. That's purple, and it's coincidence, not proof. TellTru and Credail add trust scores with polls months later, both green. PingPolls and Flare each match only two features."
