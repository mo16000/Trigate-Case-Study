"""Check source coverage, final copy, routes, anchors and placed media in rendered HTML."""
import json, re, sys
from pathlib import Path
from urllib.request import urlopen
from lxml import html

ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'content/document.json').read_text())
media=json.loads((ROOT/'content/media.json').read_text())
media.update(json.loads((ROOT/'content/media-overrides.json').read_text()))
text_overrides=json.loads((ROOT/'content/text-overrides.json').read_text())
metric_icons={'image20.png':'profile-2user.svg','image5.png':'rocket-boldw.svg','image1.png':'bank.svg'}
chapters=[('where-it-started',29,74),('the-main-version',77,121),('removing-the-drop-off',124,153),('coaching-report-workflow',155,218),('co-founder-matching',223,251)]
def norm(t): return re.sub(r'\s+','',t.replace('\uf0b7','•'))
errors=[]; reports=[]
for route,start,end in chapters:
    if '--pages' in sys.argv:
        dom=html.fromstring((ROOT/'out'/route/'index.html').read_bytes())
        # Compare the static export to the same source assertions, ignoring only its mount prefix.
        for image in dom.xpath('//img[@src]'):
            image.set('src',image.get('src').removeprefix('/Trigate-Case-Study'))
    else:
        dom=html.fromstring(urlopen('http://localhost:3000/'+route).read())
    article=dom.xpath('//*[@class="chapter-content"]')[0]
    if route=='co-founder-matching':
        founder=article.xpath('.//figure[.//img[@src=$src]]',src=media['image69.png']['src'])
        assert len(founder)==1 and not founder[0].xpath('.//button | .//figcaption')
    for decorative in article.xpath('.//figcaption | .//*[@class="step-index"] | .//*[@class="image-expand"]'):
        decorative.drop_tree()
    text=norm(''.join(article.itertext()))
    source_blocks=[b for b in data['blocks'] if start<b['id']<=end and b['id'] not in [134,165,174,176,186]]
    visible_ids=[]
    for el in article.xpath('.//*[@data-source-id or @data-source-ids]'):
        visible_ids+=list(map(int,(el.get('data-source-id') or el.get('data-source-ids')).split(',')))
    missing=[b['id'] for b in source_blocks if b['id'] not in visible_ids]
    errors += [f'{route}: missing source blocks {missing}'] if missing else []
    refs=[]; expected_media=[]
    for b in source_blocks:
        paragraphs=[b] if b['type']=='paragraph' else [p for r in b['rows'] for c in r for p in c['paragraphs']]
        for p in paragraphs:
            retained_images=['coaching-summary.png','coaching-tasks-original.png','coaching-health.png'] if b['id']==167 else [] if b['id']==143 else p['images']
            refs+=retained_images
            expected_media += [f'/assets/mvp/{metric_icons[n]}' if b['id']==70 and n in metric_icons else media[n]['src'] for n in retained_images]
            # Flow arrows / steps are web presentation; preserve their text, excluding separators.
            expected_text=text_overrides.get(str(b['id']),p['text'])
            if b['id']==248 and expected_text.strip() in ['up','down']: expected_text=''
            if b['id']==79: expected_text=expected_text.replace('Core Needs:','')
            if b['id']==153: expected_text=expected_text.replace('Business and UX Impact:','Business and UX Impact')
            if b['id']==127: expected_text=re.sub(r'^(Viewer|Founder|Team member):',r'\1',expected_text)
            fragments=expected_text.split('\n')
            for fragment in fragments:
                for part in fragment.split('→'):
                    part=part.strip()
                    if part.startswith('Original Flow:'): part=part[len('Original Flow:'):].strip()
                    if part and norm(part) not in text: errors.append(f'{route}: text missing in block {b["id"]}: {part[:110]}')
    imgs=article.xpath('.//img/@src')
    missing_media=[src for src in set(expected_media) if src not in imgs]
    if missing_media: errors.append(f'{route}: missing media {missing_media}')
    if route=='co-founder-matching':
        table=article.xpath('.//*[@data-source-id="248"]')[0]
        assert len(table.xpath('.//img'))==9
        assert all(i.get('alt') in ['Increases','Decreases'] for i in table.xpath('.//img'))
        assert not table.xpath('.//p[normalize-space(.)="up" or normalize-space(.)="down"]')
        assert dom.xpath('//a[contains(@class,"next-chapter")]/strong/text()')==['TRIGATE: An Innovation Management Platform']
    if route=='coaching-report-workflow':
        assert not article.xpath('.//*[@id="section-165"]')
        assert article.xpath('.//*[@data-source-id="166"]/h3/text()')==['Original Coaching Report Flow']
        assert all(media[n]['src'] not in imgs for n in ['image65.emf','image68.emf','image43.png','image66.png','image67.png'])
        original=article.xpath('.//*[@data-source-id="167"]/*[contains(@class,"gallery-three")]/figure')
        assert len(original)==3
        flows=[('166',['dashboard','role','program','info','info','info','program'],[]),('187,188,189,190',['dashboard','program','info','program'],['1r.svg']),('193,194,195,196,197',['dashboard','dashboard','program','info','program'],['2r.svg','2r2.svg']),('208,209,210,211,212,213',[None,'info','info','info','program',None],['tr.png'])]
        for ids,tones,files in flows:
            wrapper=article.xpath('.//*[@data-source-id=$ids or @data-source-ids=$ids]',ids=ids)[0]
            assert [s.get('data-flow-tone') for s in wrapper.xpath('./ol/li')]==tones
            if files:
                assert wrapper.xpath('./ol/following-sibling::div//img/@src')==[f'/assets/coaching/{f}' for f in files]
        assert 'Select the overall status' in ''.join(article.itertext())
    if route=='removing-the-drop-off':
        assert all(media[n]['src'] not in imgs for n in ['image55.emf','image56.emf'])
        assert article.xpath('.//*[@data-source-id="127"]//strong/text()')==['Viewer','Founder','Team member']
        assert article.xpath('.//h2[@id="section-153"]/text()')==['Business and UX Impact']
        for block_id,tones in [(133,['signup','role','program','info','info','info','info','dashboard']),(143,['signup','dashboard','program','info','info','info','dashboard'])]:
            steps=article.xpath('.//*[@data-source-id=$id]/ol/li',id=str(block_id))
            assert [s.get('data-flow-tone') for s in steps]==tones
            assert steps[-1].xpath('./span/br')
    if route=='the-main-version':
        assert article.xpath('.//h2[@id="section-79" and text()="Roles and Core Needs"]')
        assert article.xpath('.//h2[@id="section-88" and text()="UI Design"]')
        assert 'Core Needs:' not in ''.join(article.itertext())
        for section_id in [90,94,97,100,104]:
            heading=article.xpath('.//h3[@id=$id]',id=f'section-{section_id}')
            assert len(heading)==1
            header=heading[0].getparent()
            assert 'ui-feature-header' in header.get('class','')
            assert header[0].xpath('.//img') and header[1] is heading[0]
            assert not header.xpath('.//button')
    if route=='where-it-started':
        for icon in ['teacher.svg','Document Add.svg','calendar.svg','milk.svg','rocket-bold.svg']:
            if f'/assets/mvp/{icon}' not in imgs: errors.append(f'Missing MVP feature icon: {icon}')
        gallery=article.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," gallery-mvp ")]')
        if len(gallery)!=1 or len(gallery[0].xpath('./figure'))!=3: errors.append('MVP screenshot grid must contain exactly three figures')
    for anchor in dom.xpath('//a[starts-with(@href,"#")]/@href'):
        if not dom.xpath('//*[@id=$id]',id=anchor[1:]):errors.append(f'{route}: broken anchor {anchor}')
    assert len(dom.xpath('//h1'))==1
    assert dom.xpath('//title/text()')
    reports.append({'route':route,'source_blocks':len(source_blocks),'placed_visuals':len(refs),'unique_visuals':len(set(refs)),'h1_count':1})
print(json.dumps({'chapters':reports,'errors':errors},indent=2))
if errors: raise SystemExit(1)
