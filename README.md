# Şehrim

Tek kişilik, SimCity tarzı 3D şehir kurma oyunu. Tarayıcıda three.js (r128) ile çalışır; Mac için Electron uygulaması olarak da paketlenir.

## Derleme

```bash
cd src
# çevrimdışı tek dosya (modeller ve kütüphaneler gömülü)
python3 ../build.py game.html:../dist/sehrim.html:inline
# CDN'den three.js yükleyen sürüm
python3 ../build.py game.html:../dist/game_artifact.html:cdn
```

Çıkan `dist/sehrim.html` dosyası tarayıcıda doğrudan açılır.

## Mac uygulaması

`mac/` klasörü Electron kaynağıdır. Uygulama şu sırayla en yeni `sehrim.html` dosyasını açar:
`~/Documents/Sehrim/`, `~/Downloads/Sehrim/`, uygulamanın içindeki kopya. Güncellemek için yeni `sehrim.html` dosyasını bu klasörlerden birine koyup ⌘R yapmak yeterli.

Paketleme ve diğer teknik ayrıntılar için `PROJE_NOTLARI.md`.

## Klasörler

- `src/game.html` — oyunun tüm kodu
- `models/` — temel modeller (GLB)
- `models_ext/` — ek paketler (Kenney Car Kit, Train Kit); derlemeye gömülür
- `models_pending/` — henüz kullanılmayan paketler (Kenney Industrial, Watercraft)
- `vendor/` — three.js r128 ve GLTFLoader
- `build.py` — derleme betiği

## Lisanslar

3D modellerin bir kısmı [Kenney](https://kenney.nl) paketlerindendir (CC0). Ayrıntılar paket klasörlerindeki `License.txt` dosyalarında.
