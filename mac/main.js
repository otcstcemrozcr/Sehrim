/* Şehrim - Mac uygulama kabuğu (Electron)
   Oyun dosyası sırası: Belgeler/Sehrim/sehrim.html, İndirilenler/Sehrim/sehrim.html ya da uygulamanın içindeki kopya.
   Hangisi en yeniyse o açılır. Güncellemek için yeni sehrim.html dosyasını bu klasörlerden birine koymak yeter. */
const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
const fs = require('fs');

app.setName('Sehrim'); /* iç ad ASCII: Mac'te Unicode normalizasyon sorunlarını önler */

function gameFolders() {
  return [path.join(app.getPath('documents'), 'Sehrim'), path.join(app.getPath('downloads'), 'Sehrim')];
}
function pickGameFile() {
  const bundled = path.join(__dirname, 'game', 'sehrim.html');
  let best = { file: bundled, time: 0 };
  try { best.time = fs.statSync(bundled).mtimeMs; } catch (e) {}
  for (const dir of gameFolders()) {
    const f = path.join(dir, 'sehrim.html');
    try { const st = fs.statSync(f); if (st.mtimeMs > best.time) best = { file: f, time: st.mtimeMs }; } catch (e) {}
  }
  return best.file;
}
function ensureFolder() {
  const dir = gameFolders()[0];
  try {
    fs.mkdirSync(path.join(dir, 'kayitlar'), { recursive: true });
    const readme = path.join(dir, 'BENI OKU.txt');
    if (!fs.existsSync(readme)) fs.writeFileSync(readme,
      'Şehrim oyun klasörü\n\n' +
      '- Oyunun yeni sürümü gelince sehrim.html dosyasını bu klasöre koy. Uygulama en yeni dosyayı açar.\n' +
      '- "kayitlar" klasörüne oyundaki Kayıt menüsünden indirdiğin yedekleri koyabilirsin.\n' +
      '- Şehrin ayrıca uygulamanın kendi deposunda otomatik saklanır; güncelleme şehrini silmez.\n');
  } catch (e) {}
  return dir;
}

let win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 1440, height: 900, minWidth: 900, minHeight: 600,
    title: 'Şehrim', backgroundColor: '#24282d', show: false,
    webPreferences: { contextIsolation: true, webSecurity: false, spellcheck: false }
  });
  win.loadFile(pickGameFile());
  win.once('ready-to-show', () => win.show());
  win.on('page-title-updated', (e) => e.preventDefault());
  /* Kayıt dosyası indirme: varsayılan klasör Belgeler/Sehrim/kayitlar */
  win.webContents.session.on('will-download', (e, item) => {
    item.setSaveDialogOptions({ defaultPath: path.join(gameFolders()[0], 'kayitlar', item.getFilename()) });
  });
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
}

function buildMenu() {
  const tpl = [
    { label: 'Şehrim', submenu: [
      { role: 'about', label: 'Şehrim Hakkında' }, { type: 'separator' },
      { role: 'hide', label: 'Gizle' }, { role: 'hideOthers', label: 'Diğerlerini Gizle' }, { type: 'separator' },
      { role: 'quit', label: 'Şehrim’den Çık' } ] },
    { label: 'Düzen', submenu: [
      { role: 'undo', label: 'Geri Al' }, { role: 'redo', label: 'Yinele' }, { type: 'separator' },
      { role: 'cut', label: 'Kes' }, { role: 'copy', label: 'Kopyala' }, { role: 'paste', label: 'Yapıştır' }, { role: 'selectAll', label: 'Tümünü Seç' } ] },
    { label: 'Oyun', submenu: [
      { label: 'Yeniden Yükle', accelerator: 'CmdOrCtrl+R', click: () => win && win.loadFile(pickGameFile()) },
      { label: 'Oyun Klasörünü Aç', click: () => shell.openPath(ensureFolder()) },
      { type: 'separator' },
      { role: 'togglefullscreen', label: 'Tam Ekran' },
      { role: 'resetZoom', label: 'Gerçek Boyut' }, { role: 'zoomIn', label: 'Yakınlaştır' }, { role: 'zoomOut', label: 'Uzaklaştır' },
      { type: 'separator' },
      { role: 'toggleDevTools', label: 'Geliştirici Araçları' } ] },
    { label: 'Pencere', submenu: [ { role: 'minimize', label: 'Küçült' }, { role: 'zoom', label: 'Büyüt' }, { role: 'close', label: 'Kapat' } ] }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(tpl));
}

app.whenReady().then(() => {
  app.setAboutPanelOptions({ applicationName: 'Şehrim', applicationVersion: '1.0', copyright: 'Kişisel kullanım · Modeller: Kenney (CC0)' });
  ensureFolder();
  buildMenu();
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => app.quit());
