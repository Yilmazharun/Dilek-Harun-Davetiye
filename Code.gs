/**
 * Dilek & Harun — Ortak Albüm
 * Misafirlerin yüklediği fotoğrafları Google Drive'ınızdaki bir klasöre kaydeder
 * ve sitedeki albüm için fotoğraf listesini verir.
 *
 * Kurulum: README.md dosyasındaki "Ortak albüm kurulumu" adımlarına bakın.
 */

const FOLDER_NAME = 'Dilek & Harun Düğün Fotoğrafları';
const MAX_BYTES = 8 * 1024 * 1024;   // fotoğraf başına en fazla 8 MB
const LIST_LIMIT = 500;              // albümde gösterilecek en fazla fotoğraf
const CACHE_KEY = 'photo_list_v1';

function getFolder_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('FOLDER_ID');
  if (id) {
    try { return DriveApp.getFolderById(id); } catch (e) { /* klasör silinmişse yeniden oluştur */ }
  }
  const folder = DriveApp.createFolder(FOLDER_NAME);
  props.setProperty('FOLDER_ID', folder.getId());
  return folder;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Albüm listesi: en yeni fotoğraf en başta */
function doGet() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get(CACHE_KEY);
  if (cached) return json_({ ok: true, photos: JSON.parse(cached) });

  const files = getFolder_().getFiles();
  const list = [];
  while (files.hasNext()) {
    const f = files.next();
    if (f.isTrashed() || f.getMimeType().indexOf('image/') !== 0) continue;
    list.push({ id: f.getId(), name: f.getDescription() || '', t: f.getDateCreated().getTime() });
  }
  list.sort(function (a, b) { return b.t - a.t; });
  const out = list.slice(0, LIST_LIMIT);
  try { cache.put(CACHE_KEY, JSON.stringify(out), 30); } catch (e) { /* liste çok büyükse önbelleğe alınmaz */ }
  return json_({ ok: true, photos: out });
}

/** Fotoğraf yükleme: site, küçültülmüş JPEG'i base64 olarak gönderir */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const bytes = Utilities.base64Decode(String(body.data || ''));
    if (!bytes.length || bytes.length > MAX_BYTES) return json_({ ok: false, error: 'size' });
    // yalnızca JPEG kabul et (ilk baytlar FF D8 FF)
    if (!((bytes[0] & 0xff) === 0xff && (bytes[1] & 0xff) === 0xd8 && (bytes[2] & 0xff) === 0xff)) {
      return json_({ ok: false, error: 'type' });
    }
    const name = String(body.name || 'Misafir').replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, 40) || 'Misafir';
    const stamp = Utilities.formatDate(new Date(), 'Europe/Istanbul', 'yyyy-MM-dd_HH-mm-ss');
    const safe = name.replace(/[^\p{L}\p{N} _-]/gu, '').trim().replace(/\s+/g, '_') || 'Misafir';
    const blob = Utilities.newBlob(bytes, 'image/jpeg', stamp + '_' + safe + '.jpg');

    const file = getFolder_().createFile(blob);
    file.setDescription(name);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    CacheService.getScriptCache().remove(CACHE_KEY);
    return json_({ ok: true, id: file.getId() });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  }
}

/** Kurulumda bir kez çalıştırın: klasörü oluşturur ve Drive izni ister */
function kurulum() {
  const folder = getFolder_();
  Logger.log('Klasör hazır: ' + folder.getUrl());
}
