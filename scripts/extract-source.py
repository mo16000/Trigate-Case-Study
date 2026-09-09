"""Extract the supplied case study in document order, retaining copy and media."""
import json
from pathlib import Path
from zipfile import ZipFile
from lxml import etree
from PIL import Image, ImageOps, ImageDraw
import io

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parents[2] / 'Doc3.docx'
NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
      'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
      'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
      'wp': 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing'}

def text(el):
    return ''.join(el.xpath('.//w:t/text() | .//w:tab/text()', namespaces=NS))

with ZipFile(SOURCE) as archive:
    tree = etree.fromstring(archive.read('word/document.xml'))
    rels = {el.get('Id'): el.get('Target') for el in etree.fromstring(archive.read('word/_rels/document.xml.rels'))}
    def paragraph(el):
        runs = []
        for run in el.xpath('.//w:r[not(ancestor::w:del)]', namespaces=NS):
            t = ''.join((node.text or '') if etree.QName(node).localname == 't' else ('\n' if node.get('{'+NS['w']+'}type') != 'page' else '') for node in run.xpath('.//w:t | .//w:br | .//w:tab', namespaces=NS))
            if t:
                runs.append({'text': t, 'bold': bool(run.xpath('./w:rPr/w:b[not(@w:val="0")] | ./w:rPr/w:rStyle[@w:val="Strong"]', namespaces=NS)), 'italic': bool(run.xpath('./w:rPr/w:i', namespaces=NS))})
        images = []
        for blip in el.xpath('.//a:blip', namespaces=NS):
            rid = blip.get('{'+NS['r']+'}embed')
            if rid in rels:
                images.append(Path(rels[rid]).name)
        style = el.xpath('./w:pPr/w:pStyle/@w:val', namespaces=NS)
        nums = el.xpath('./w:pPr/w:numPr/w:numId/@w:val', namespaces=NS)
        level = el.xpath('./w:pPr/w:numPr/w:ilvl/@w:val', namespaces=NS)
        return {'type': 'paragraph', 'text': ''.join(r['text'] for r in runs), 'runs': runs, 'style': style[0] if style else '', 'list': nums[0] if nums else None, 'level': int(level[0]) if level else 0, 'images': images}
    blocks = []
    for i, el in enumerate(tree.find('w:body', NS)):
        tag = etree.QName(el).localname
        if tag == 'p':
            b = paragraph(el)
            if not b['text'] and not b['images']: continue
        elif tag == 'tbl':
            b = {'type': 'table', 'rows': [[{'paragraphs': [paragraph(p) for p in cell.findall('w:p', NS)], 'span': cell.xpath('./w:tcPr/w:gridSpan/@w:val', namespaces=NS)} for cell in row.findall('w:tc', NS)] for row in el.findall('w:tr', NS)]}
        else: continue
        b['id'] = i
        blocks.append(b)
    out = ROOT / 'content'
    out.mkdir(exist_ok=True)
    media = ROOT / 'content/source-media'
    media.mkdir(exist_ok=True)
    assets = {}
    thumbs = []
    for name in archive.namelist():
        if not name.startswith('word/media/'): continue
        data = archive.read(name)
        fname = Path(name).name
        (media / fname).write_bytes(data)
        try:
            im = Image.open(io.BytesIO(data)).convert('RGB')
            assets[fname] = {'width': im.width, 'height': im.height, 'bytes': len(data)}
            thumb = Image.new('RGB', (300, 240), '#eeeeee')
            im.thumbnail((280, 195))
            thumb.paste(im, ((300-im.width)//2, 25+(195-im.height)//2))
            ImageDraw.Draw(thumb).text((10, 6), f'{fname}  {assets[fname]["width"]} x {assets[fname]["height"]}', fill='black')
            thumbs.append(thumb)
        except Exception:
            assets[fname] = {'bytes': len(data)}
    (out / 'document.json').write_text(json.dumps({'blocks': blocks, 'assets': assets}, ensure_ascii=False, indent=2))
    lines = []
    for b in blocks:
        if b['type'] == 'paragraph':
            lines.append(f'[{b["id"]}] ({b["style"]}, list={b["list"]}) {b["text"]}' + (f'  IMAGES: {b["images"]}' if b['images'] else ''))
        else:
            lines.append(f'[{b["id"]}] TABLE')
            lines.extend(' | '.join(' / '.join(p['text'] for p in c['paragraphs']) for c in row) for row in b['rows'])
    (out / 'document.txt').write_text('\n'.join(lines))
    for start in range(0, len(thumbs), 20):
        batch = thumbs[start:start+20]
        sheet = Image.new('RGB', (1200, 240*((len(batch)+3)//4)), 'white')
        for j, thumb in enumerate(batch): sheet.paste(thumb, ((j%4)*300, (j//4)*240))
        sheet.save(out / f'contact-{start//20+1}.jpg')
    print(f'{len(blocks)} blocks, {len(assets)} media assets extracted to {out}')
