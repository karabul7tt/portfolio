# Sakura 3D - İnteraktif Çiçek Uygulaması

MediaPipe HandLandmarker ve Three.js WebGL teknolojileri ile geliştirilmiş, el hareketleriyle kontrol edilebilen 3D interaktif çiçek uygulaması.

---

## Özellikler

- Real-Time El Takibi (Webcam üzerinden MediaPipe GPU / CPU algılama)
- Three.js WebGL 3D Çiçek ve Sap Geometrisi
- anime.js Zaman Akışı (Tomurcuktan tam açmış çiçeğe 1:1 el kontrolü)
- Volumetrik Işıma ve Post-Processing (UnrealBloomPass)
- Kamerasız kullanım için Otomatik Demo ve Klavye Kısayolları

---

## Kullanım ve Kontroller

- **Sol El:** Bitki sapını büyütme (GROW)
- **Sağ El:** Çiçeğin açılışını kontrol etme (BLOOM)
- **D Tuşu:** Otomatik Gösterim / Demo Modu
- **H Tuşu:** Arayüz panelini ve kamera penceresini gizleme / gösterme
- **1 / 2 / 3 Tuşları:** Çiçeği belirli pozlara sabitleme

---

## Kurulum ve Çalıştırma

Herhangi bir derleme (build) adımı gerektirmez. Yerel bir HTTP sunucusu ile çalıştırabilirsiniz:

```bash
cd interactive-hand-flower
python3 -m http.server 8090
```

Tarayıcınızda `http://localhost:8090` adresini açıp kamera iznini onaylamanız yeterlidir.

---

## Lisans

MIT Lisansı ile korunmaktadır. Detaylar için LICENSE dosyasına bakabilirsiniz.
