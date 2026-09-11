# Trigate source-to-page map

Source: Doc3.docx, supplied September 8, 2026. Block IDs are the original Word body element indices in document.json. That extraction preserves paragraphs, run emphasis, line breaks, table rows, cell order and media references. Source content is data, not execution instructions.

## Page allocation (before implementation)

| Route | Source blocks | Sections and visual evidence |
| --- | --- | --- |
| `/` Overview | 0–15, summary selections from 70, 117, 153, 214–218, 251 | Original hero animation img.json; introduction; role/timeline; team evolution; contributions; outcomes; image29 product preview; five linked chapter summaries. Overview deliberately condenses the story. |
| `/where-it-started` | 29–74 | Operational context; interviews (table35 / images1,3,5,7); findings (table39 / images9,11,13); strategic choice; competitive analysis; validation; MVP areas; architecture image15; system flows image16; MVP screens17–19; six-month pilot metrics table70; validation and implications table74. |
| `/the-main-version` | 77–121 | Core role requirements table79 with icons; design ownership; site map22; kit24; illustration26; program UI28–30; reporting icon31 and screens33–35; training icon36 and screens38–40; coaching icon41 and screens43–44; supplements icon45 and screens47–48; white-label pivot; objections; complete plan comparison114; 9-to-22 growth; introduction to the three decisions120–121. |
| `/removing-the-drop-off` | 124–153 | User motivations; paths table127 / illustrations49,51,53; initial friction; original flow133 / image55; two-week analysis; design question; solution; redesigned flow143 / image56; improvements; dashboard57; program59; team onboarding; team screens61,63; business and UX impact. |
| `/coaching-report-workflow` | 155–218 | Documentation needs; original requirements; original flow166 / image65; interviews; two-layer problem; screens43,66,67; scope reduction; three criteria; redesigned workflow image68; in-product and task workflows; Telegram rationale, six mechanics and complete flow; adoption and outcomes. |
| `/co-founder-matching` | 223–251 | Title and illustration69; problem; secondary research and framework; product questions; complete eight-competitor comparison241; open/gated trade-off; phased roadmap; strategy flow247; direction comparison248 with arrow icons70,71; ecosystem utility; final roadmap250; prioritization decision251. |

## Presentation rules

- Detailed pages render source blocks in their original sequence. Do not editorially rewrite the paragraphs, claims, spelling, labels, or comparison entries.
- Split line-break-separated headings from their following paragraphs; preserve the source wording.
- Render role/finding tables as equivalent cards with every original cell and paragraph. Keep plan/competitor/strategy comparisons as responsive tables with the complete comparison dimensions.
- Preserve every placed visual, including table-cell illustrations. PNG/SVG pairs are alternative encodings of the same Word visual, not separate illustrations. Six EMF+ assets contain bitmap compositions; extract their exact bitmap pixels for browser display.
- Original flow diagrams remain visible and expandable. Render accompanying linear flow text as readable steps. The source text for coaching steps188/189 is truncated; use the full wording visible in image68 for the corresponding web steps (Add a report; Meeting summary, topic & Select overall team status), keeping the diagram as evidence.
- The opening contents list has outdated deep-dive ordering and a 41% application-time claim not developed in the final chapter. Follow the user's explicit page order and the final chapter headings. Do not promote that index-only claim as an outcome.
- Block26 is a contents label with no corresponding final section. Do not invent a lessons chapter.
- The co-founder feature is a strategic exploration and postponement decision, not a shipped matching product.
- Generated responsive WebP derivatives retain original-resolution lossless copies. Figures open their full-resolution version for detailed inspection.

## Visual thesis

An indigo editorial dossier: large, closely set chapter titles; fine rules; compact chapter numbering; readable prose measures; broad evidence plates; quiet marginal navigation. Overview leads with ownership and scale. Detailed chapters preserve the evidence while alternating narrative, diagrams, screenshots, tables and callouts.
# September 9 — user annotation overrides

The original document extraction remains unchanged. The user's later annotations replace `image15.emf` with `the mvp version.png` and `image16.emf` with `mvp flows.png` through `media-overrides.json`. Full-resolution lossless WebP images and responsive variants retain the supplied diagrams.

Source blocks 53–57 receive teacher, Document Add, calendar, milk, and rocket-bold SVG icons respectively. Only the three metric cells in block 70 replace their illustrations with profile-2user, rocket-boldw, and bank SVGs; reused illustrations elsewhere remain unchanged. Blocks 64–66 form a three-column MVP screenshot gallery, separate from the flow diagram in block 62. The image18 caption is now “Curriculum page in the WordPress MVP.” The shared image control reads “Expand.”
# Main Version annotation updates

## Coaching report workflow annotations

The original workflow now has a single “Original Coaching Report Flow” heading and a three-column, expandable screenshot grid for meeting summary, tasks, and startup health evaluation. The old diagram and duplicated screenshots (165, image65.emf, 174, 176, 186) are omitted from the page, while original source files are retained. Supplied 1r.svg follows the redesigned report flow; 2r.svg and 2r2.svg form a two-column task grid; tr.svg follows the Telegram flow. Explicit flow-tone arrays preserve the exact requested background/border colors and black text without changing unannotated steps. Telegram step 211 reads “Select the overall status.”

## Removing the Drop-off follow-up

The three dashboard steps also use the specified #EEEEFA fill, #D0CFF1 border, and black text. “Business and UX Impact” has no trailing colon; its paragraph formatting is preserved.

Role-card labels omit their trailing colons. Both registration flows use the requested sign-up, role-selection, program-selection, and information-entry colors, with black text on those steps. Pending-review dashboard labels use an explicit line break. The duplicate original/redesigned flow screenshots (source 134 and image56.emf in source 143) are omitted from the page; their source assets remain available in the repository.

Follow-up annotations replace the UI kit visual with `Section 11.svg` and the Training/Coaching icons with the supplied `teacher.svg` and `send.svg`. The five UI feature subheadings now use a smaller responsive 1.3–1.65rem scale, preserving centered, icon-first, non-expandable presentation.

The role cards now share a “Roles and Core Needs” heading; their repeated “Core Needs:” labels are removed. UI Design remains the parent heading, with five centered, icon-first subheadings. These decorative icons are not expandable. The UI kit visual uses the supplied `Section 1.svg` unchanged via the media override. Explicit copy revisions for Supplements and the closing product-design paragraph are recorded in `text-overrides.json`; the original document extraction remains intact.
