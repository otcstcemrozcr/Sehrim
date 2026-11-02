# Şehrim - Proje Notları

Oyunun adı: **Şehrim** (eski çalışma adı: Şehir Kurucu).

Tek kişilik, Sim City tarzı 3D şehir kurma oyunu. Three.js (r128) ile tarayıcıda çalışır. Sonra Electron ile Mac ve Windows uygulamasına paketlenir.
Oyun yalnızca kişisel kullanım içindir, satılmayacak.

## Durum

- [x] **1. aşama bitti:** 64x64 3D harita, kamera, boş arazide başlangıç, yol (otomatik birleşen), kaldırım, 5 bina, çeşme, ağaç, buldozer, para düşme, kayıt/yükleme, gündüz-gece ışığı.
- [x] **2. aşama bitti:** yürüyen insanlar ve arabalar (trafik). Arabalar sağ şeritten gider, yayalar kaldırımda yürür, öndeki arabaya göre yavaşlar. `T` tuşu veya "Trafik" düğmesi açar/kapar. Üst çubukta Araç ve Yaya sayacı var.
- [x] **3. aşama bitti:** nüfus, vergi ve bütçe. Binalar yola bağlıysa nüfus/iş sağlar. `B` tuşu veya "Bütçe" düğmesi paneli açar, vergi oranı kaydırıcıyla ayarlanır. Ayrı bölge boyama yok: bina türü seçmek bölgeleme işini görür (Müstakil/Apartman/Yüksek = konut, Dükkan/Garaj = iş).
- [x] **4. aşama bitti:** elektrik. Rüzgâr türbini (Z), güneş paneli (C), termik santral (F), havai hat (L) ve yer altı kablosu (K). Santralden binalara hat çekilir, bağlı binalar online olur, almayanın üstünde sarı şimşek çıkar. Elektriksiz bina nüfus, iş ve vergi vermez.
- [x] **5. aşama bitti:** su, atık, kirlilik. Deniz (harita türüne göre) ve su boyama aracı (M). Baraj (J, suyun üstüne, su 150 + elektrik 40), su pompası (U, 50; kıyıda 90), su kulesi (I, 30), su borusu (P, yer altı, her karenin altından geçer). Çöp tesisi (N, günde 60, yola bitişik olmalı). Kirlilik haritası (O). Susuz bina yarı kapasiteyle çalışır, üstünde mavi damla çıkar.
- [x] **Köprü:** Altyapı bölümünde ayrı Köprü aracı (Y) var; yol aracıyla suyun üstüne çizmek de köprü yapar (kare başı 80, karada 10). Korkuluk, beton döşeme ve ayak çizilir. Arabalar ve yayalar geçer. Buldozer köprüyü kaldırınca su kalır.
- [x] **6. aşama bitti:** hizmet binaları. Polis (8 kare), itfaiye (8), hastane (10), okul (8). Elektrik ve yol bağlantısı gerekir. Araç seçilince etki alanları renkli daire olarak görünür. Kapsanmayan konutlar nüfus büyüdükçe mutsuz olur (suç %20, yangın %10, sağlık %15, eğitim %10'a kadar). Okul kapsadığı nüfustan %10 fazla vergi getirir. Bu araçların kısayol tuşu yok (harfler doldu).
- [x] **Ek binalar:** Hizmetlerde Küçük/Orta/Büyük seçici (büyük 2x2, alan polis/itfaiye/okul 5/8/13, hastane 6/10/16). Hastane işareti H (çatıda ve cephede). Konut: Villa (6), Site 2x2 (60). Ticaret: Fırın (5 iş), Market (10), Kafe (4), Ofis (20). Eğlence: Top sahası (6), Kapalı havuz (8), Sinema (9), Tiyatro (9), Stadyum 2x2 (16). Kenney evlerine karo başı hafif renk tonu (çeşitlilik).
- [x] **Kenney arabaları ve trenler:** Car Kit modelleri (sedan, SUV, taksi, minibüs, kamyonet, kamyon; polis/ambulans/itfaiye/çöp kamyonu yalnızca ilgili bina varsa). Ulaşım bölümü: Ray (otomatik köşe) ve Tren istasyonu (düz ray üstüne). Trenler ray ağında gider, istasyonda 2,5 sn durur, çıkmazda ters yönde devam eder. İstasyon yakınındaki evler %12 daha cazip.
- [x] **Lunapark:** Eğlence bölümünde 2x2 Lunapark (12.000, alan 14, bakım 90). Dönme dolap döner (`lunaList`, `plantFx.ferris`), atlıkarınca, küçük hız treni, gişe, bayraklar.
- [x] **Ses:** Web Audio ile üretilen efektler (bina, çizgi araçları, buldozer, su, hata, para, online, su geldi, tren kornası) ve ortam sesi (trafik uğultusu, gündüz kuş, gece cırcır böceği). Alttaki Ses düğmesi ve seviye kaydırıcısı; tercih `sehir3d:v1:sound` anahtarında.
- [x] **Trafik lambası:** T ve dörtlü kavşaklarda (`isJunction`) otomatik. Döngü 10 sn: kuzey-güney yeşil 0-4, sarı 4-4,8; doğu-batı yeşil 5-9, sarı 9-9,8 (kavşağa göre kaydırılmış). Arabalar kavşaktan önceki karede kırmızı/sarıda durur (`lightState`).
- [x] **Canlı detaylar:** ağaçlar rüzgârda sallanır (`setupTreeSway`, köşe gölgelendiricisi, `windU`), bulut gölgeleri gündüz kayar, kuş sürüleri V düzeninde döner (gündüz), deniz ve göl kıyısında dalga köpüğü (`rebuildFoam`, `updateLive`).
- [x] **Gerçekçi yayalar:** gövde, omuz, boyun, kafa, saç, iki bacak (ayakkabılı), iki kol (elli); bacaklar kalçadan, kollar omuzdan ters yönde sallanır. Ten, saç, gömlek, pantolon ve ayakkabı rengi kişiye göre (`people`, `e.look`). Palet sRGB → doğrusal çevrilir.
- [x] **Daha fazla dükkan:** Ticaret bölümüne Butik (800, 4 iş), Eczane (900, 4), Restoran (1.600, 8), Fast food (1.100, 6), AVM 2x2 (20.000, 60 iş, eğlence hizmeti alan 8, bakım 60) ve Kapalı otopark (2.500) eklendi. Otopark çevresindeki 6 kare içindeki dükkanlar %25 fazla ticaret geliri getirir (`parkList`, `nearParking`, `PARK_R`). Tür numaraları: RESTAURANT 46, FASTFOOD 47, MALL 48, PARKING 49, PHARMACY 50, BOUTIQUE 51.
- [x] **Öneri paneli:** araç panelinin solunda "Öneriler" kutusu, en fazla 5 madde: "şunu yaparsan → şöyle olur" (elektrik, su, çöp, eksik hizmet ve kaç kişi geleceği, vergi, iş oranı, otopark, istasyon, kıyıda pompa, şehir dolu, bütçe açığı). Maddeye tıklayınca ilgili araç seçilir (vergi maddesi Bütçe'yi açar). "gizle" ile küçülür (`sehir3d:v1:advmin`). Kod: `adviceList`, `renderAdvice` (econCompute sonunda).
- [x] **Harita seçimi:** "Yeni" penceresi 6 boş harita türü gösterir (küçük önizleme): Orta deniz, Kıyı şehri, Nehir, Körfez, Ada, İç ova. "Başka haritalar" yeni rastgele örnekler üretir; seçilen tür ve tohum `newCity(kind, seed)` ile kurulur (`MAP_KINDS`, `genMap`, `drawMapThumb`). İlk açılışta varsayılan Orta deniz.
- [ ] Bekleyen: Kenney City Kit Industrial (rüzgâr, güneş, su kulesi, termik santral, sanayi binaları) ve Watercraft (tekneler). Modeller `models_pending/ind` ve `models_pending/boat` içinde hazır; kullanılmaya başlanınca `models_ext/` altına taşınacak (build.py `models_ext` içindeki her şeyi gömer).
- [ ] 7. aşama: afetler, grafikler, denge ayarı
- [x] **Mac uygulaması (Electron 33.4.11, Apple Silicon arm64):** `mac/` klasörü. `Sehrim.app` (iç ad ASCII: ilk sürüm `Şehrim.app` Mac'te açılışta çöktü; Linux'ta paketlenen Unicode adlar Mac'teki yardımcı uygulama adlarıyla eşleşmiyor) oyunu şu sırayla arar ve en yeni olanı açar: `~/Documents/Sehrim/sehrim.html`, `~/Downloads/Sehrim/sehrim.html`, uygulamanın içindeki kopya. Güncelleme = yeni `sehrim.html` dosyasını bu klasörlerden birine koymak. Kayıt indirme varsayılanı `~/Documents/Sehrim/kayitlar`. webSecurity kapalı (TCMB kuru CORS'a takılmaz). Menü: Oyun > Yeniden Yükle (Cmd+R), Oyun Klasörünü Aç, Tam Ekran.
  - Paketleme (Linux'ta): `cd mac && npx @electron/packager . "Sehrim" --executable-name=Sehrim --platform=darwin --arch=arm64 --electron-version=33.4.11 --icon=icon.icns --out=out --overwrite ...`, sonra rcodesign ile ad-hoc imza (`rcodesign sign Sehrim.app`), sonra `zip -qry` (sembolik bağlar korunmalı).
  - İmzasız (notarize edilmemiş) olduğu için ilk açılışta macOS uyarır: sağ tık > Aç ya da Sistem Ayarları > Gizlilik ve Güvenlik > Yine de Aç. Gerekirse `xattr -cr /Applications/Sehrim.app && codesign --force --deep -s - /Applications/Sehrim.app`.
- [ ] Windows `.exe` paketleme (aynı yöntem, `--platform=win32`). Kullanıcı oyunu bir Windows bilgisayara da kuracak (2 Kasım 2026'da söyledi), sıradaki büyük iş bu.
  - Not: bu oturum türünden GitHub Release ve etiket (tag) oluşturulamıyor (403). Release'i kullanıcı GitHub sitesinden elle açar, zip dosyalarını sürükleyip bırakır.
- [x] **GitHub:** https://github.com/otcstcemrozcr/Sehrim (gizli depo, dal `main`). Çalışma kopyası `/home/claude/citygame`, depo kopyası `/home/claude/sehrim`. Her güncellemede `src models models_ext models_pending vendor build.py PROJE_NOTLARI.md` ve `mac/` kaynakları depoya kopyalanıp gönderilir. `dist/` ve `test/` depoya girmez (.gitignore). Derlenmiş Mac zip'i istenirse Releases'e eklenir.

Şehir oyuncu tarafından sıfırdan kurulur, hazır şehir yoktur. Yeni oyunda oyuncu 6 boş harita türünden birini seçer; ortası açık, çevresi ağaçlık.

## Dosyalar

- `sehrim.html`: Oynanabilir tek dosya, internet gerekmez. Çift tıklayınca tarayıcıda açılır.
- `src/game.html`: Oyunun kaynak kodu (bütün oyun mantığı burada).
- `build.py`: Kaynaktan oynanabilir dosyaları üretir. Örnek: `python3 build.py game.html:sehrim.html:inline`
- `models/`: Kenney'nin CC0 modelleri (`.glb`) ve `colormap.png` dokusu.
- `vendor/`: three.min.js ve GLTFLoader.js (r128).

## Kontroller

| Girdi | İş |
|---|---|
| Sol tık / sürükle | Seçili aracı uygula (yol ve kaldırımı sürükleyerek çiz) |
| Sağ tık sürükle | Kamerayı döndür ve eğ |
| Tekerlek | Yakınlaş / uzaklaş |
| W A S D, oklar | Haritada gez (Shift: hızlı) |
| Fareyi ekran kenarına götür | Harita o yöne kayar (her araçta, yol çizerken de) |
| Q / E | Kamerayı çevir |
| R | Binayı döndür (yanında yol varsa bina otomatik yola bakar) |
| V, X | Seç/kaydır, buldozer |
| 1 - 0 | Yol, kaldırım, 5 bina, çeşme, ağaç, çam |
| G | Izgara |
| O | Kirlilik haritası |
| P U I J N | Boru, pompa, su kulesi, baraj, çöp tesisi |
| M | Deniz / göl boya |
| Y | Köprü |
| L K | Havai hat, yer altı kablosu |
| Z C F | Rüzgâr, güneş, termik santral |
| B | Bütçe paneli |
| T | Trafik (araba ve yaya) aç/kapa |
| H | Yardım |
| Ctrl/⌘ + S | Kaydet |

## Kayıt sistemi

- Oyun kendiliğinden tarayıcıya kaydeder (`localStorage`, anahtar `sehir3d:v1:save`). Aynı dosyayı aynı tarayıcıda açınca kaldığın yerden devam edilir.
- "Kayıt" düğmesi: metni kopyala, dosya olarak indir (çevrimdışı dosyada), dosyadan yükle, metinden yükle.
- Kayıt şunları içerir: harita (bina, yol, ağaç), para, gün, saat, ışık ayarı, kamera, şehir adı.
- Tarayıcı verisi silinirse kayıt gider. Önemli şehirleri "Kayıt" menüsünden dosya olarak yedekle.
- Mac/Windows uygulamasında kayıt gerçek dosyaya (örneğin `Belgelerim/Sehirler/sehir1.json`) yazılacak. Bu 8. aşamada eklenecek.

## Teknik notlar (devam ederken lazım)

- Harita 64x64, her karo 1x1 birim. `cells[]` tür, `rots[]` dönüş (0-3).
- Her model türü için bir `InstancedMesh` var, böylece binlerce karo hızlı çizilir.
- Yol parçaları komşulara göre otomatik seçilir: düz (kuzey-güney), köşe (batı+güney), T (batı+doğu+güney), dört yol. Döndürme `roadShape()` içinde.
- Binaların kapısı varsayılan olarak +Z (güney) yönüne bakar.
- Modeller dokuyu ayrı `Textures/colormap.png` dosyasından okur. Oyunda `LoadingManager.setURLModifier` ile gömülü veriye yönlendirilir. `createImageBitmap` geçici kapatılır, çünkü yayınlanan sayfada blob/fetch engellidir.
- Gölge haritası yalnızca şehir, ışık ya da kamera belirgin değişince yenilenir (performans).
- Bağlantı sürümü Three.js'i jsDelivr'den yükler (`three@0.128.0`), çevrimdışı sürüm kendi içinde taşır.
- Trafik: araçlar karo karo yol ağında ilerler; her karoda giriş kenarından çıkış kenarına eğri çizilir, sağ şerit kaydırması vardır (araba 0.15, yaya 0.455). Çıkış seçimi: %60 düz devam, çıkmaz sokakta geri dönüş. Hedef sayılar: araç = min(70, yol*0.45, bina*2), yaya = min(120, kaldırım*0.8, bina*3). Gerçek yol bulma, hedefli yolculuk ve trafik ışığı henüz yok (cross trafik birbirini yok sayar).
- Arabalar ve insanlar koddan üretilen düşük poligonlu modellerdir (InstancedMesh, renk çeşitliliği instanceColor ile). Dinamik nesneler gerçek gölge atmaz, altlarında yuvarlak gölge lekesi vardır.
- Ekonomi (`econCompute`, `econStep`): oyun gününde 8 adım (her 3 oyun saati, yaklaşık 60 sn) çalışır. Konut kapasitesi: müstakil 4, apartman 12, yüksek 30. İş: dükkan 6, garaj 2. Hedef nüfus = kapasite × cazibe (iş oranı ve vergi). Vergi %9 dengeli, yüksek vergi nüfusu hızla düşürür. Gelir: nüfus × vergi × 2 + dükkan × vergi × 6. Gider: yol 0,6 + bina 4 + çeşme 10 (günlük). Para 0'ın altına inmez. Kayıtta `pop` ve `tax` alanları var (eski kayıtlar varsayılanla açılır).
- Elektrik (`econCompute` içinde): yollar artık elektrik taşımaz. Oyuncu iki tür hat çizer (`pw[]` katmanı, kayıtta `pw`): 1 = havai hat (L, direkli, kare başı 20, çim/ağaç/kaldırım karelerine konur, bakım 0,5/gün), 2 = yer altı kablosu (K, kare başı 60, bakım 1/gün; yol, bina, santral ve çeşme dahil her karenin altından geçer; üstüne yapı konunca kablo korunur, yapının altındaki kablo çizilmez). Buldozer önce yapıyı yıkar, kablo kalır; boş karede ikinci vuruş hattı/kabloyu siler. İkisi birbirine bitişikse bağlanır. Hat kareleri, santraller ve binalar iletkendir, bitişik iletkenler aynı şebekeyi oluşturur (`labelPower`). Her şebekede üretim ≥ talep olana kadar binalar harita sırasıyla elektrik alır, almayanlar offline olur. Üretim: rüzgâr 12, güneş 8 (gündüz tam, gece %30), termik 100. Talep: müstakil 1, apartman 2, yüksek 5, dükkan 2, garaj 1. Günlük bakım: rüzgâr 8, güneş 5, termik 60, hat karesi 0,5. Nüfus ve iş için bina yine yola bitişik olmalı (elektrik ayrı, yol ayrı).
- Online/offline görünümü: offline binalar soluk (instanceColor), online olunca renkler döner ve yeşil halka yayılır (`bursts`, `applyPowerColors`). Havai hatlar direk ve tel, yer altı kablosu turuncu şerit, çim/kaldırımda turuncu işaret direği, yolda rögar kapağı olarak çizilir (`rebuildLines`). Zemin yüksekliği: çim ve kaldırım 0,06, yol 0. Kablo parçaları bu yüzeye oturtulur (önceki sürümde 0,03'te kalıp çimin içinde görünmez oluyordu). Eski kayıtlarda `pw` yoktur, binalar hat çekilene kadar offline kalır.
- Hat, kablo, yol ve kaldırım sürüklenirken köşegen hareket yatay-dikey bağlı karelerle doldurulur (`line4`), çünkü çapraz kareler elektrik/yol olarak bağlanmaz. Yapının üstüne hat çekilmeye çalışılırsa uyarı çıkar.
- Su (`econCompute` içinde): `wp[]` boru katmanı (kayıtta `wp`). Borular, su tesisleri ve tüm yapılar suyu iletir (`labelWater`). Su talebi: müstakil 1, apartman 3, yüksek 6, dükkan 2, garaj 1. Susuz bina nüfus ve işi yarı verir. Boru görseli: mavi şerit + vana, karenin merkezinden (0.2, 0.2) kaydırılmış (kabloyla çakışmasın diye).
- Atık: çöp üretimi = nüfus × 0,1 + iş × 0,05 (günlük). Çöp tesisi yola bitişikse 60 kapasite. Toplanamayan çöp oranı cazibeyi en çok %40 düşürür.
- Kirlilik (`computePollution`, `polMap`): kaynaklar termik santral (1, yarıçap 6), çöp tesisi (0,6, yarıçap 4), garaj (0,15, yarıçap 2). Yakındaki ağaçlar azaltır. Konutların ortalama kirliliği cazibeyi `1 - 0,6 × kirlilik` ile çarpar. O tuşu kirlilik katmanını gösterir.
- Köprü: `br[]` katmanı (kayıtta `br`), hücre türü ROAD kalır, altı su demektir (`rebuildBridges`). Su yüzeyi y = -0,04 (kara 0,06, yol 0), dünya zemini y = -0,1. Zemin suyun üstünde kalırsa su beyaz görünür.
- Hizmetler: `SVC_OF`, `SVC_R`, `svcList` (yeniden kurulumda toplanır), `covMask` (konut başına bit: 1 polis, 2 itfaiye, 4 sağlık, 8 okul). Ceza nüfusla ölçeklenir (polis/itfaiye 300, sağlık 400, okul 200 kişide tam). Etki alanı diski `updateCover()`.
- 2x2 yapılar: `SIZE[t] = 2`. Çapa sol üst köşede, diğer 3 kare `T.PART` (23). `anchorOf`, `roadAdj` (çevresinin herhangi bir karesi yola bitişikse), `faceRoad2`, `cOff(t)` (merkez kaydırma 1). Buldozer parçanın herhangi bir karesinden tümünü yıkar. Kayıtta ek katman yok, PART kareleri hücrelerde saklanır.
- Türler: 24-31 hizmet boyutları, 32-35 ticaret (fırın, market, kafe, ofis), 36-37 konut (villa, site), 38-42 eğlence. Eğlence beşinci hizmettir (`fun`, kapsama biti 16, ceza 500 kişide %10). Dükkan ağırlığı `SHOP_W` ticaret vergisini belirler.
- Yeni bina renkleri kodda sRGB yazılır, `buildPlantModels` sonunda karesi alınarak doğrusala çevrilir (daha doygun görünür).
- Ek Kenney paketleri `models_ext/<paket>/` altında (car, train), her paketin kendi `colormap.png` dokusu var. build.py bunları `"paket:model"` adıyla ve `window.COLORMAPS[paket]` ile gömer. Çok parçalı modeller `mergeMeshGeos` ile birleştirilir. `prepareExtModels`: ray ×0,25 (4 birimlik parça bir kareye), tren ×0,25, araba ×0,14.
- Lunapark `T.LUNA = 45` (2x2, 'fun').
- Ray: `T.RAIL = 43` (yapı değil), `T.STATION = 44` (ray + peron, tüketici, 'transit' hizmeti yarıçap 12). `railShape`: düz (K-G k=0, D-B k=1), köşe K+B k=0, B+G 1, G+D 2, D+K 3. Ray karesinin altına çim, istasyonun altına ray çizilir.
- Trenler (`updateTrains`): baş vagon karo karo (Bezier), vagonlar izden (`trail`) `TRAIN_GAP` aralıkla örneklenir. Çıkmazda `reverseTrain` kuyruktan ters yönde devam eder. Tren sayısı = istasyon sayısı (en çok 8).
- Su karesi `T.WATER = 18`. Hizmet türleri 19-22. 6'dan büyük ama yapı değil; yapı kontrolü için `isStruct(t)` kullanılır (`t >= T.HOUSE_A` yerine). Baraj yıkılınca karede su kalır.
- Kodla verilen renkler doğrusal (linear) renk uzayında. Ekranda daha açık çıkar, koyu ton için düşük değer ver (deniz 0.025, 0.15, 0.34).
- Araç paletinde bir araca gelince bilgi kutusu açılır (`TIPS` tablosu: üretim ve elektrik ihtiyacı). Elektriksiz binaların şimşeğinin yanında ihtiyaç duyulan birim yazar (DOM etiketleri, `updateBoltLabels`). Bütçe panelindeki "Para ekle" düğmesi +₺100.000 verir (kişisel oyun).
- Para birimi: TL, Euro, Dolar (Bütçe panelinden seçilir, kayıtta `cur`). Oyun içi tutarlar TL esaslıdır, gösterimde TCMB döviz satış kuruyla çevrilir (`money()`, `shortMoney()`). Açılışta `https://www.tcmb.gov.tr/kurlar/today.xml` çekilir. Tarayıcı CORS engelleyebilir, o durumda son alınan kur ya da yedek kur (USD 47,07 / EUR 53,84, TCMB 17.07.2026) kullanılır. Kur elle de girilebilir. Masaüstü uygulamasında (Electron) istek CORS'a takılmaz, canlı kur çalışır. Kurlar `localStorage` anahtarı `sehir3d:v1:rates` altında tutulur.
- Santral modelleri `buildPlantModels()` içinde kodla çizilir (Kenney Industrial GLB gelirse yerine konabilir). Rüzgâr kanatları, duman ve şimşek işaretleri ayrı InstancedMesh'tir (`updatePlantFx`).
- Test için `window.__city` nesnesi açıktır (yalnızca geliştirme).

## Model kaynakları

| Kaynak | Link | Lisans |
|---|---|---|
| Kenney (City Kit, Car Kit, Train Kit) | https://kenney.nl/assets | CC0 |
| Quaternius | https://quaternius.com | CC0 |
| Poly Pizza | https://poly.pizza | Çoğu CC-BY, bazıları CC0 |
| Poly Haven | https://polyhaven.com | CC0 |
| Sketchfab | https://sketchfab.com | Karışık, tek tek kontrol et |

- Şu an kullanılan modeller: https://github.com/KenneyNL/Starter-Kit-City-Builder (modeller CC0, kod MIT).
- Kenney "City Kit Industrial" paketi indirildi ama `.glb` dosyaları henüz yüklenmedi (yalnızca lisans ve önizleme geldi). Rüzgâr türbini, güneş paneli, soğutma kulesi, su kulesi 4. aşamada (enerji) gerekir. Pakette `Models/GLB format` klasöründeki dosyaları zip olarak yükle.
- itch.io "Isometric City Voxel" paketi 2D PNG olduğu için 3D oyuna uymuyor, kullanılmıyor.

## Model Geçiş Uyarıları (Claude bu bölümü takip eder)

Varsayılan model: **Sonnet 5.5**. Aşağıdaki durumlarda Claude kullanıcıyı uyarır ve model değiştirmesini önerir. Kod dosyaları aynı kaldığı için geçişte hiçbir şey kaybolmaz.

### Opus 5.5'e geç, eğer:
- Elektrik, su ve trafik birbirini etkiliyor ve hata aynı anda birden fazla sistemde görünüyorsa.
- Aynı hata Sonnet ile 2 denemeden sonra hâlâ çözülmediyse.
- Simülasyon denge ayarı (ekonomi, nüfus artışı) mantıksız sonuç veriyor ve sebebi anlaşılmıyorsa.
- Büyük bir yeniden yapılandırma gerekiyorsa (örnek: kayıt formatı değişecek ve eski kayıtlar bozulabilecek).

### Fable 5.1'e geç, eğer:
- Çok büyük ve karmaşık bir sistem baştan tasarlanacaksa (yol ağında yol bulma + trafik yoğunluğu).
- Oyun yavaşladıysa ve performans sorunu Opus ile de çözülmediyse.

### Sonnet 5.5'e geri dön, eğer:
- Sorun çözüldüyse ve iş sıradan geliştirmeye döndüyse (yeni bina, arayüz, küçük ayarlar).

## Açık konular

- Para konusu (oyun içi ekonomi ayarı, sınırsız para seçeneği ya da gerçek para harcaması) kullanıcı tarafından "sonra konuşuruz" denildi.
- Mac için hangi araçla paketleneceği (Electron ya da Tauri) 8. aşamada netleşecek.
- Docker şimdilik kullanılmıyor.
- iPhone uygulaması (ertelendi): kullanıcı Safari değil, uygulama gibi oynamak istiyor. Plan: önce dokunmatik kontroller (iki parmakla yakınlaştırma, döndürme, gezme; sayfa yakınlaşmasını engelle), sonra Capacitor ile iOS projesi; Mac'te Xcode + ücretsiz Apple hesabı (7 günde bir yeniden yükleme) ya da yıllık geliştirici hesabı.
