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
