"""Import the three user-supplied replacement documents without executing their content."""
import json
from pathlib import Path
import sys
import zipfile
import xml.etree.ElementTree as ET
from PIL import Image
from io import BytesIO

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(sys.argv[1])
NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main', 'a': 'http://schemas.openxmlformats.org/drawingml/2006/main', 'svg': 'http://schemas.microsoft.com/office/drawing/2016/SVG/main'}
EMBED = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed'
media = json.loads((ROOT/'content/media-overrides.json').read_text())
content = {}
for doc in ['p', 'c', 'r']:
    with zipfile.ZipFile(SOURCE/f'{doc}.docx') as archive:
        relationships = {r.get('Id'): r.get('Target') for r in ET.fromstring(archive.read('word/_rels/document.xml.rels'))}
        def paragraph(p):
            runs = []
            for r in p.findall('w:r', NS):
                text = ''.join(n.text or '' if n.tag.endswith('}t') else '\n' for n in r.iter() if n.tag in [f'{{{NS["w"]}}}t', f'{{{NS["w"]}}}br'])
                if text: runs.append({'text': text, 'bold': r.find('w:rPr/w:b', NS) is not None, 'italic': r.find('w:rPr/w:i', NS) is not None})
            images = []
            for drawing in p.findall('.//w:drawing', NS):
                blip = drawing.find('.//svg:svgBlip', NS)
                if blip is None: blip = drawing.find('.//a:blip', NS)
                if blip is None: continue
                target = relationships[blip.get(EMBED)]
                name = f'{doc}-{Path(target).name}'
                raw = archive.read('word/'+target)
                if name.endswith('.svg'):
                    svg = ET.fromstring(raw)
                    width, height = [float(v) for v in svg.get('viewBox').split()[2:]]
                else:
                    im = Image.open(BytesIO(raw))
                    width, height = im.size
                    if doc == 'r':
                        name = str(Path(name).with_suffix('.webp'))
                        buf = BytesIO()
                        im.save(buf, format='WEBP', quality=90)
                        raw = buf.getvalue()
                dest = ROOT/'public/assets/main-version'/name
                dest.write_bytes(raw)
                media[name] = {'src': '/assets/main-version/'+name, 'width': width, 'height': height, 'variants': []}
                images.append(name)
            return {'text': ''.join(r['text'] for r in runs).strip(), 'runs': runs, 'images': images}
        blocks = []
        body = ET.fromstring(archive.read('word/document.xml')).find('w:body', NS)
        for element in body:
            if element.tag.endswith('}p'):
                p = paragraph(element)
                if p['text'] or p['images']: blocks.append(p)
            elif element.tag.endswith('}tbl'):
                blocks.append({'table': [[[''.join(p.itertext()) for p in c.findall('w:p', NS)] for c in row.findall('w:tc', NS)] for row in element.findall('w:tr', NS)]})
        content[doc] = blocks
svg = SOURCE/'untitled folder/sitemap.svg'
raw = svg.read_bytes()
root = ET.fromstring(raw)
w, h = [float(v) for v in root.get('viewBox').split()[2:]]
(ROOT/'public/assets/main-version/sitemap.svg').write_bytes(raw)
media['image22.png'] = {'src': '/assets/main-version/sitemap.svg', 'width': w, 'height': h, 'variants': []}
media['image26.png'] = media[content['p'][0]['images'][0]]
media['image41.png'] = media[content['c'][0]['images'][0]]
(ROOT/'content/main-version.json').write_text(json.dumps(content, ensure_ascii=False, indent=2)+'\n')
(ROOT/'content/media-overrides.json').write_text(json.dumps(media, ensure_ascii=False, indent=2)+'\n')
print('Imported program, coaching, outcome content and supplied sitemap.')
