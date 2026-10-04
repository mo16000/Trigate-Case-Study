"""Replace only the results table from the supplied DOCX, retaining merged cells."""
import json
from pathlib import Path
import sys
import zipfile
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
with zipfile.ZipFile(sys.argv[1]) as archive:
    document = ET.fromstring(archive.read('word/document.xml'))
    tables = document.findall('w:body/w:tbl', ns)
    assert len(tables) == 1, 'Expected one replacement results table'
    rows, spans = [], []
    for row in tables[0].findall('w:tr', ns):
        cells, widths = [], []
        for cell in row.findall('w:tc', ns):
            cells.append([''.join(p.itertext()) for p in cell.findall('w:p', ns)])
            span = cell.find('w:tcPr/w:gridSpan', ns)
            widths.append(int(span.get('{'+ns['w']+'}val')) if span is not None else 1)
        assert sum(widths) == 3
        rows.append(cells)
        spans.append(widths)
    content_path = root/'content/main-version.json'
    content = json.loads(content_path.read_text())
    content['r'][3] = {'table': rows, 'spans': spans}
    content_path.write_text(json.dumps(content, ensure_ascii=False, indent=2)+'\n')
    print(f'Imported {len(rows)} rows, preserving all merged cells.')
