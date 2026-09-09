"""Convert embedded EMF+ bitmap records and create responsive, lossless assets."""
import json, struct
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / 'content/source-media'
PUBLIC = ROOT / 'public/assets/source'
PUBLIC.mkdir(parents=True, exist_ok=True)
manifest = {}
for file in MEDIA.glob('*.emf'):
    data = file.read_bytes()
    pos = 0
    while pos + 8 <= len(data):
        kind, size = struct.unpack_from('<II', data, pos)
        if size < 8: break
        if kind == 70 and data[pos+12:pos+16] == b'EMF+':
            q = pos + 16
            while q+12 < pos+size:
                typ, flags, length, count = struct.unpack_from('<HHII', data, q)
                if length < 12: break
                if typ == 0x4008 and (flags >> 8) & 127 == 5:
                    version, image_type, width, height, stride, pixel_format, bitmap_type = struct.unpack_from('<7I', data, q+12)
                    if image_type == 1 and bitmap_type == 0:
                        raw = data[q+40:q+length]
                        im = Image.frombytes('RGBA', (width,height), raw, 'raw', 'BGRA', stride, 1)
                        im.save(file.with_suffix('.png'))
                        print(file.name, width, height)
                q += length
        pos += size

for file in MEDIA.glob('*.png'):
    im = Image.open(file)
    # Retain original-resolution pixels for reading detailed UI screens.
    full = PUBLIC / (file.stem + '.webp')
    im.save(full, 'WEBP', lossless=True, method=6)
    variants = []
    for width in [640, 1280]:
        if im.width > width:
            resized = im.resize((width, round(im.height*width/im.width)), Image.Resampling.LANCZOS)
            dest = PUBLIC / f'{file.stem}-{width}.webp'
            resized.save(dest, 'WEBP', quality=90, method=6)
            variants.append({'src': '/assets/source/'+dest.name, 'width':width})
    manifest[file.name] = {'src': '/assets/source/'+full.name, 'width':im.width, 'height':im.height, 'variants':variants}
    if file.with_suffix('.emf').exists(): manifest[file.with_suffix('.emf').name] = manifest[file.name]
(ROOT/'content/media.json').write_text(json.dumps(manifest, indent=2))
