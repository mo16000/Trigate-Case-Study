"""Check source coverage, final copy, routes, anchors and placed media in rendered HTML."""
import json, re
from pathlib import Path
from urllib.request import urlopen
from lxml import html

ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'content/document.json').read_text())
media=json.loads((ROOT/'content/media.json').read_text())
chapters=[('where-it-started',29,74),('the-main-version',77,121),('removing-the-drop-off',124,153),('coaching-report-workflow',155,218),('co-founder-matching',223,251)]
def norm(t): return re.sub(r'\s+','',t.replace('\uf0b7','•'))
errors=[]; reports=[]
for route,start,end in chapters:
    dom=html.fromstring(urlopen('http://localhost:3000/'+route).read())
    article=dom.xpath('//*[@class="chapter-content"]')[0]
    for decorative in article.xpath('.//figcaption | .//*[@class="step-index"] | .//*[@class="image-expand"]'):
        decorative.drop_tree()
    text=norm(''.join(article.itertext()))
    source_blocks=[b for b in data['blocks'] if start<b['id']<=end]
    visible_ids=[]
    for el in article.xpath('.//*[@data-source-id or @data-source-ids]'):
        visible_ids+=list(map(int,(el.get('data-source-id') or el.get('data-source-ids')).split(',')))
    missing=[b['id'] for b in source_blocks if b['id'] not in visible_ids]
    errors += [f'{route}: missing source blocks {missing}'] if missing else []
    refs=[]
    for b in source_blocks:
        paragraphs=[b] if b['type']=='paragraph' else [p for r in b['rows'] for c in r for p in c['paragraphs']]
        for p in paragraphs:
            refs+=p['images']
            # Flow arrows / steps are web presentation; preserve their text, excluding separators.
            fragments=p['text'].split('\n')
            for fragment in fragments:
                for part in fragment.split('→'):
                    part=part.strip()
                    if part.startswith('Original Flow:'): part=part[len('Original Flow:'):].strip()
                    if part and norm(part) not in text: errors.append(f'{route}: text missing in block {b["id"]}: {part[:110]}')
    imgs=article.xpath('.//img/@src')
    missing_media=[n for n in set(refs) if media[n]['src'] not in imgs]
    if missing_media: errors.append(f'{route}: missing media {missing_media}')
    for anchor in dom.xpath('//a[starts-with(@href,"#")]/@href'):
        if not dom.xpath('//*[@id=$id]',id=anchor[1:]):errors.append(f'{route}: broken anchor {anchor}')
    assert len(dom.xpath('//h1'))==1
    assert dom.xpath('//title/text()')
    reports.append({'route':route,'source_blocks':len(source_blocks),'placed_visuals':len(refs),'unique_visuals':len(set(refs)),'h1_count':1})
print(json.dumps({'chapters':reports,'errors':errors},indent=2))
if errors: raise SystemExit(1)
