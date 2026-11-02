import base64, glob, os, sys
root = os.path.dirname(os.path.abspath(__file__))
def models_js():
    parts = []
    for f in sorted(glob.glob(os.path.join(root, 'models', '*.glb'))):
        name = os.path.basename(f)[:-4]
        parts.append('"%s":"%s"' % (name, base64.b64encode(open(f, 'rb').read()).decode()))
    # Ek Kenney paketleri (Car Kit, Train Kit): ad "paket:model", her paketin kendi colormap dokusu
    cms = []
    for pack in sorted(os.listdir(os.path.join(root, 'models_ext'))) if os.path.isdir(os.path.join(root, 'models_ext')) else []:
        d = os.path.join(root, 'models_ext', pack)
        for f in sorted(glob.glob(os.path.join(d, '*.glb'))):
            name = pack + ':' + os.path.basename(f)[:-4]
            parts.append('"%s":"%s"' % (name, base64.b64encode(open(f, 'rb').read()).decode()))
        cms.append('"%s":"data:image/png;base64,%s"' % (pack, base64.b64encode(open(os.path.join(d, 'colormap.png'), 'rb').read()).decode()))
    cm = base64.b64encode(open(os.path.join(root, 'models', 'colormap.png'), 'rb').read()).decode()
    return 'window.MODELS={' + ','.join(parts) + '};window.COLORMAP="data:image/png;base64,' + cm + '";window.COLORMAPS={' + ','.join(cms) + '};'
def build(src, out, mode):
    html = open(os.path.join(root, 'src', src), encoding='utf-8').read()
    if mode == 'cdn':
        three = ('<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"></script>\n'
                 '<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>')
    elif mode == 'inline':
        three = ('<script>' + open(os.path.join(root, 'vendor', 'three.min.js'), encoding='utf-8').read() + '</script>\n'
                 '<script>' + open(os.path.join(root, 'vendor', 'GLTFLoader.js'), encoding='utf-8').read() + '</script>')
    else:
        three = ('<script src="file://%s/vendor/three.min.js"></script>\n'
                 '<script src="file://%s/vendor/GLTFLoader.js"></script>' % (root, root))
    html = html.replace('<!--THREE-->', three).replace('<!--MODELS-->', '<script>' + models_js() + '</script>')
    if mode != 'cdn':
        html = '<!doctype html>\n<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n' + html + '\n</html>'
    os.makedirs(os.path.join(root, 'dist'), exist_ok=True)
    open(os.path.join(root, 'dist', out), 'w', encoding='utf-8').write(html)
    print(out, len(html) // 1024, 'KB')
if __name__ == '__main__':
    for a in sys.argv[1:]:
        src, out, cdn = a.split(':')
        build(src, out, cdn)
