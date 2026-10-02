"""Convert the supplied phase-one Word content and its embedded icons into site assets."""
import json
from pathlib import Path
import sys
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parents[1]
NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
      'svg': 'http://schemas.microsoft.com/office/drawing/2016/SVG/main'}
REL = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed'

with zipfile.ZipFile(sys.argv[1]) as archive:
    document = ET.fromstring(archive.read('word/document.xml'))
    relationships = {r.get('Id'): r.get('Target') for r in ET.fromstring(archive.read('word/_rels/document.xml.rels'))}
    def paragraph(p):
        text = ''.join(n.text or '' if n.tag.endswith('}t') else '\n' for n in p.iter() if n.tag in [f'{{{NS["w"]}}}t', f'{{{NS["w"]}}}br'])
        icons = []
        for icon in p.findall('.//svg:svgBlip', NS):
            target = relationships[icon.get(REL)]
            name = Path(target).name
            destination = ROOT / 'public/assets/phase-one' / name
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_bytes(archive.read('word/' + target))
            icons.append('/assets/phase-one/' + name)
        return {'text': text.strip(), 'list': p.find('w:pPr/w:numPr', NS) is not None, 'icons': icons}
    tables = [[[ [paragraph(p) for p in c.findall('w:p', NS)] for c in r.findall('w:tc', NS)] for r in t.findall('w:tr', NS)] for t in document.findall('w:body/w:tbl', NS)]
    headings = [paragraph(p)['text'] for p in document.findall('w:body/w:p', NS) if paragraph(p)['text']]
    content = {'headings': headings, 'objectives': tables[0][0], 'results': tables[1][0], 'comparison': tables[2]}
    (ROOT/'content/phase-one.json').write_text(json.dumps(content, ensure_ascii=False, indent=2) + '\n')
    print('Imported all three tables and embedded SVG icons.')
