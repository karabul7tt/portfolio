# 🥙 K7 Döner Esenyurt — Gourmet Yaprak Et Döner Web Sitesi

Modern, iştah kabartan yumuşak renk geçişlerine (soft amber & dark slate UI) sahip, etkileşimli ve mobil uyumlu **K7 Döner Esenyurt** restoran web sitesi.

Proje, **GitHub Pages** üzerinde doğrudan yayınlanmaya hazır şekilde bağıl dosya yolları (`./assets/`, `./styles.css`, `./app.js`) ile yapılandırılmıştır.

---

## 🌟 Öne Çıkan Özellikler

* **🔥 %100 Dana Yaprak Et Döner Menüsü:** Gramaj seçici (100g, 150g, 200g) ile anlık fiyat hesaplama.
* **🛒 İnteraktif Sepet & WhatsApp Sipariş Sistemi:** Kullanıcının seçtiği ürünler, porsiyonlar, teslimat adresi ve sipariş notu ile tek tıkla otomatik WhatsApp sipariş mesajı oluşturma.
* **🎨 Soft Amber & Glassmorphism Tasarım:** Keskin renk geçişleri olmadan, duman ve kor ateş hissi veren pürüzsüz koyu tema UI.
* **📱 %100 Responsive:** Mobil, tablet ve masaüstü cihazlarla tam uyumlu responsive arayüz.
* **📍 Konum & Şube Görselleri:** Esenyurt Zafer Mahallesi şube restoran içi/dışı fotoğrafları ve entegre Google Maps haritası.

---

## 📁 Proje Yapısı

```
.
├── index.html          # Ana HTML yapısı & SEO meta etiketleri
├── styles.css          # Özel CSS, glassmorphism ve soft renk animasyonları
├── app.js              # Menü verisi, sepet hesabı, gramaj mantığı & WhatsApp siparişi
├── README.md           # Proje belgelendirmesi
└── assets/             # Yüksek çözünürlüklü lezzet & amblem görselleri
    ├── logo.jpg        # K7 Döner amblem logosu & Favicon
    ├── hero.jpg        # Meşe odun ateşinde yaprak döner başlık görseli
    ├── durum.jpg       # Yaprak et döner dürüm & ayran görseli
    ├── iskender.jpg    # Tereyağlı İskender döner görseli
    ├── corba.jpg       # Süzme mercimek çorbası görseli
    ├── kunefe.jpg      # Hatay usulü fıstıklı künefe görseli
    ├── sutlac.jpg      # Fırın sütlaç görseli
    └── venue.jpg       # K7 Döner Esenyurt salon & restoran dış görseli
```

---

## 🚀 GitHub'a Yükleme & GitHub Pages'te Yayınlama

Bu projeyi kendi GitHub hesabınızda yayınlamak için aşağıdaki adımları uygulayabilirsiniz:

### 1. Yerel Repozitörüyü Başlatın ve GitHub'a Yükleyin

```bash
# Proje dizinine gidin
cd k7-doner

# Git repozitörüsünü başlatın
git init

# Tüm dosyaları ekleyin ve commit yapın
git add .
git commit -m "feat: K7 Döner Esenyurt web sitesi yayına hazır"

# Ana dal adını main yapın
git branch -M main

# Kendi GitHub repozitörü adresinizi ekleyin
git remote add origin https://github.com/KULLANICI_ADINIZ/k7-doner.git

# GitHub'a gönderin
git push -u origin main
```

### 2. GitHub Pages Üzerinde Ücretsiz Yayınlayın

1. GitHub'da oluşturduğunuz **k7-doner** repozitörüsüne gidin.
2. **Settings (Ayarlar)** ➔ **Pages** sekmesine tıklayın.
3. **Build and deployment** başlığı altındaki **Source** kısmından **Deploy from a branch** seçeneğini seçin.
4. Branch olarak `main` ve klasör olarak `/ (root)` seçip **Save** butonuna tıklayın.
5. 1-2 dakika içinde siteniz `https://KULLANICI_ADINIZ.github.io/k7-doner/` adresinde **canlıya geçecektir!** 🎉

---

## 💻 Yerelde Çalıştırma

Projeyi bilgisayarınızda test etmek için herhangi bir HTTP sunucusu kullanabilirsiniz:

```bash
# Python 3 ile yerel sunucu başlatma
python3 -m http.server 8085
```
Tarayıcınızda `http://localhost:8085` adresini açarak inceleyebilirsiniz.

---

## 📄 Lisans
Bu proje açık kaynaklıdır ve özgürce geliştirilebilir.
