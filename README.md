# Dilek & Harun — Düğün Davetiyesi 💍

20 Ekim 2026 · Horasan / Erzurum

Tek dosyalık (`index.html`) dijital düğün davetiyesi: Türkçe/İngilizce, telefon, tablet ve bilgisayar uyumlu.
Katılım bildirimi WhatsApp'a gider; misafirlerin fotoğrafları Google Drive'ınızdaki bir klasöre yüklenir ve sitedeki albümde herkes görür.

---

## 1. Ortak albüm kurulumu (Google Drive, ücretsiz, ~5 dakika)

1. Bilgisayardan **script.google.com** adresine gidin ve Google hesabınızla girin.
2. **Yeni proje**'ye tıklayın. Proje adını `Dilek Harun Albüm` yapın.
3. Açılan `Code.gs` dosyasındaki her şeyi silin, bu paketteki `apps-script/Code.gs` içeriğini yapıştırın ve kaydedin (💾).
4. Üstteki fonksiyon listesinden **kurulum**'u seçip **Çalıştır**'a basın.
   Google izin isteyecek: hesabınızı seçin → *Gelişmiş* → *Dilek Harun Albüm'e git (güvenli değil)* → *İzin ver*.
   (Bu uyarı, betiği sizin yazdığınız için çıkar; kod sadece sizin Drive'ınızda bir klasör oluşturur.)
   Drive'ınızda **"Dilek & Harun Düğün Fotoğrafları"** klasörü oluşur.
5. Sağ üstte **Dağıt → Yeni dağıtım**:
   - Tür: ⚙️ → **Web uygulaması**
   - Şu kullanıcı olarak yürüt: **Ben**
   - Erişimi olanlar: **Herkes**
   - **Dağıt**'a basın ve verilen **Web uygulaması URL'sini** kopyalayın (sonu `/exec` ile biter).
6. `index.html` içinde şu satırı bulun ve adresi tırnakların arasına yapıştırın:

```js
const PHOTO_API='';
```

Örnek: `const PHOTO_API='https://script.google.com/macros/s/AKfy.../exec';`

**Bilinmesi gerekenler**
- Fotoğraflar telefonda küçültülerek (en fazla 1600 piksel) yüklenir; hızlı yüklenir, Drive'da az yer kaplar.
- Albüme linki olan herkes fotoğraf ekleyebilir. İstemediğiniz bir fotoğrafı Drive klasöründen silmeniz yeterli; bir dakika içinde albümden de kalkar.
- `Code.gs`'i değiştirirseniz: **Dağıt → Dağıtımları yönet → ✏️ → Sürüm: Yeni sürüm → Dağıt** (adres aynı kalır).

## 2. WhatsApp numarası (katılım bildirimleri)

`index.html` içinde:

```js
const WA_NUMBER='905323383254';
```

Numarayı ülke koduyla, başında `+` veya `0` olmadan yazın. Örnek: 0532 123 45 67 → `905321234567`

## 3. GitHub Pages ile yayınlama

Repo → **Settings → Pages** → Branch: `main`, klasör: `/ (root)` → **Save**.
Site birkaç dakika içinde `https://KULLANICI-ADINIZ.github.io/REPO-ADI/` adresinde açılır.

İngilizce açmak için adresin sonuna `?lang=en` ekleyin.
