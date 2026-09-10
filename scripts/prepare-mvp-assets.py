"""Prepare the user-supplied September 9 MVP annotation assets, without changing source extraction."""
import json
import shutil
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent.parent / 'mvp icon'
DEST = ROOT / 'public/assets/mvp'
DEST.mkdir(parents=True, exist_ok=True)
for name in ['teacher.svg', 'Document Add.svg', 'calendar.svg', 'milk.svg', 'rocket-bold.svg']:
    shutil.copy2(SOURCE / name, DEST / name)
for name in ['profile-2user.svg', 'rocket-boldw.svg', 'bank.svg']:
    shutil.copy2(SOURCE / 'untitled folder' / name, DEST / name)

override_file = ROOT / 'content/media-overrides.json'
overrides = json.loads(override_file.read_text()) if override_file.exists() else {}
for key, name, stem in [('image15.emf', 'the mvp version.png', 'mvp-version'), ('image16.emf', 'mvp flows.png', 'mvp-flows')]:
    with Image.open(SOURCE / name) as im:
        im.save(DEST / f'{stem}.webp', 'WEBP', lossless=True, method=6)
        variants = []
        for width in [640, 1280]:
            if im.width > width:
                resized = im.resize((width, round(im.height * width / im.width)), Image.Resampling.LANCZOS)
                resized.save(DEST / f'{stem}-{width}.webp', 'WEBP', quality=92, method=6)
                variants.append({'src': f'/assets/mvp/{stem}-{width}.webp', 'width': width})
        overrides[key] = {'src': f'/assets/mvp/{stem}.webp', 'width': im.width, 'height': im.height, 'variants': variants}
(ROOT / 'content/media-overrides.json').write_text(json.dumps(overrides, indent=2) + '\n')
print('Prepared 8 SVG icons and 2 responsive, full-resolution replacement diagrams.')
