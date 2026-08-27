// K7 Döner Esenyurt - Application & Menu Logic

const MENU_ITEMS = [
  {
    id: 'durum-et',
    category: 'durum',
    title: 'Yaprak Et Döner Dürüm',
    description: 'Odun ateşinde pişmiş %100 dana yaprak et döner, taze pişen özel lavaş, isteğe göre domates, sumaklı soğan ve yeşillik ile.',
    image: 'assets/durum.jpg',
    portions: [
      { name: '100 Gram', price: 465 },
      { name: '150 Gram (Doyurucu)', price: 640 },
      { name: '200 Gram (Çifte Lezzet)', price: 790 }
    ],
    badge: 'En Çok Satan',
    selectedPortion: 0
  },
  {
    id: 'porsiyon-et',
    category: 'porsiyon',
    title: 'Porsiyon Et Döner',
    description: 'Özel marinasyonlu yaprak et döner, tırnak pide yatağında, közlenmiş biber, domates ve pilav eşliğinde.',
    image: 'assets/hero.jpg',
    portions: [
      { name: '150 Gram', price: 695 },
      { name: '200 Gram (Bol Döner)', price: 890 },
      { name: '250 Gram (Gurme Porsiyon)', price: 1050 }
    ],
    badge: 'Gurme Seçim',
    selectedPortion: 0
  },
  {
    id: 'tombik-et',
    category: 'durum',
    title: 'Tombik Et Döner',
    description: 'Taş fırından taptaze çıkmış tombul ekmek içerisinde 120g meşe odununda pişen nefis et döner.',
    image: 'assets/durum.jpg',
    portions: [
      { name: '120 Gram', price: 520 },
      { name: '180 Gram (Ekstra)', price: 710 }
    ],
    badge: 'Çıtır Ekmek',
    selectedPortion: 0
  },
  {
    id: 'iskender',
    category: 'porsiyon',
    title: 'Tereyağlı İskender Döner',
    description: 'Közde pişmiş et döner, fırınlanmış pide küpleri, özel domates sosu ve üzerine cosss diye dökülen kızgın tereyağı. Süzme yoğurt ile.',
    image: 'assets/iskender.jpg',
    portions: [
      { name: '150 Gram Klasik', price: 740 },
      { name: '220 Gram Duble', price: 960 }
    ],
    badge: 'Özel Soslu',
    selectedPortion: 0
  },
  {
    id: 'beyti-doner',
    category: 'porsiyon',
    title: 'Sarma Beyti Döner',
    description: 'Lavaşa sarılı et döner dilimleri, üzerine domates sosu, erimiş tereyağı ve ortasında taze yoğurt.',
    image: 'assets/iskender.jpg',
    portions: [
      { name: '150 Gram Porsiyon', price: 780 }
    ],
    badge: null,
    selectedPortion: 0
  },
  {
    id: 'merzi-corba',
    category: 'yan',
    title: 'Süzme Mercimek Çorbası',
    description: 'Kendi kıvamında pişmiş, tereyağlı kıtır pide ile sunulan sıcacık çorba.',
    image: 'assets/corba.jpg',
    portions: [
      { name: 'Porsiyon', price: 140 }
    ],
    badge: 'Sıcak Başlangıç',
    selectedPortion: 0
  },
  {
    id: 'patates',
    category: 'yan',
    title: 'Çıtır Patates Kızartması',
    description: 'Özel baharat çeşnili elma dilim veya parmak patates kızartması.',
    image: 'assets/durum.jpg',
    portions: [
      { name: 'Porsiyon', price: 150 }
    ],
    badge: null,
    selectedPortion: 0
  },
  {
    id: 'kunefe',
    category: 'tatli',
    title: 'Hatay Usulü Fıstıklı Künefe',
    description: 'Bol Antep fıstıklı, içi uzayan özel peynirli, şerbeti tam kıvamında sıcak künefe.',
    image: 'assets/kunefe.jpg',
    portions: [
      { name: 'Porsiyon', price: 220 }
    ],
    badge: 'Sıcak Tatlı',
    selectedPortion: 0
  },
  {
    id: 'sutlac',
    category: 'tatli',
    title: 'Fırın Sütlaç',
    description: 'Üzeri nar gibi kızarmış geleneksel fırın sütlaç.',
    image: 'assets/sutlac.jpg',
    portions: [
      { name: 'Porsiyon', price: 140 }
    ],
    badge: null,
    selectedPortion: 0
  },
  {
    id: 'ayran-yayik',
    category: 'tatli',
    title: 'Bol Köpüklü Yayık Ayranı',
    description: 'Bakır maşrapada sunulan özgün köy yoğurdu yayık ayranı.',
    image: 'assets/ayran.jpg',
    portions: [
      { name: '300 ml Maşrapa', price: 50 }
    ],
    badge: 'Tavsiye',
    selectedPortion: 0
  },
  {
    id: 'salgam',
    category: 'tatli',
    title: 'Doğanay Şalgam Suyu',
    description: 'Acılı veya acısız Adana usulü cam şişe şalgam suyu.',
    image: 'assets/salgam.jpg',
    portions: [
      { name: '330 ml Şişe', price: 50 }
    ],
    badge: null,
    selectedPortion: 0
  }
];

let cart = [];
let currentCategory = 'all';
let searchQuery = '';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  setupEventListeners();
  checkOpenStatus();
  setupScrollAnimations();
});

// Render Menu Cards
function renderMenu() {
  const container = document.getElementById('menu-grid');
  if (!container) return;

  const filtered = MENU_ITEMS.filter(item => {
    const matchesCat = currentCategory === 'all' || item.category === currentCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 text-gray-400">
        <i class="fa-solid fa-utensils text-4xl mb-3 text-amber-500/40">
        <p class="text-lg">Aradığınız kriterlere uygun lezzet bulunamadı.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const activePortion = item.portions[item.selectedPortion || 0];
    return `
      <div class="glass-card overflow-hidden flex flex-col justify-between group">
        <div>
          <!-- Görsel & Badge -->
          <div class="relative h-48 sm:h-56 overflow-hidden">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-transparent opacity-80"></div>
            ${item.badge ? `
              <span class="absolute top-3 left-3 bg-amber-500/90 text-gray-950 font-bold text-xs px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
                <i class="fa-solid fa-fire mr-1"></i>${item.badge}
              </span>
            ` : ''}
          </div>

          <!-- İçerik -->
          <div class="p-5">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold text-gray-100 group-hover:text-amber-400 transition-colors">${item.title}</h3>
            </div>
            <p class="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">${item.description}</p>

            <!-- Gramaj / Porsiyon Seçenekleri -->
            ${item.portions.length > 1 ? `
              <div class="mb-4">
                <label class="text-xs text-amber-400/80 block mb-1.5 font-medium">Porsiyon Seçiniz:</label>
                <div class="flex flex-wrap gap-1.5">
                  ${item.portions.map((p, idx) => `
                    <button 
                      onclick="selectPortion('${item.id}', ${idx})" 
                      class="portion-pill ${ (item.selectedPortion || 0) === idx ? 'active' : ''}">
                      ${p.name}
                    </button>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Fiyat & Ekle Butonu -->
        <div class="p-5 pt-0 mt-auto flex items-center justify-between border-t border-amber-500/10 pt-4">
          <div>
            <span class="text-xs text-gray-400 block">Fiyat</span>
            <span class="text-2xl font-extrabold text-amber-400">${activePortion.price} <span class="text-sm font-semibold">₺</span></span>
          </div>
          <button 
            onclick="addToCart('${item.id}')"
            class="btn-amber text-sm px-4 py-2.5 shadow-md">
            <i class="fa-solid fa-plus text-xs"></i> Sepete Ekle
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Gramaj Seçimi
window.selectPortion = function(itemId, portionIdx) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (item) {
    item.selectedPortion = portionIdx;
    renderMenu();
  }
};

// Event Listeners Setup
function setupEventListeners() {
  // Category tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.getAttribute('data-category');
      renderMenu();
    });
  });

  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderMenu();
    });
  }

  // Floating Cart Modal Open
  const cartBtn = document.getElementById('floating-cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', openCartModal);
  }
}

// Cart Functions
window.addToCart = function(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  const portionIdx = item.selectedPortion || 0;
  const portion = item.portions[portionIdx];

  const cartItemId = `${item.id}-${portionIdx}`;
  const existing = cart.find(c => c.cartItemId === cartItemId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      cartItemId,
      id: item.id,
      title: item.title,
      portionName: portion.name,
      price: portion.price,
      qty: 1
    });
  }

  updateCartBadge();
  showToast(`${item.title} (${portion.name}) sepete eklendi!`);
};

function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  const totalElem = document.getElementById('cart-total-badge');
  const floatingBtn = document.getElementById('floating-cart-btn');

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (badge) badge.innerText = totalQty;
  if (totalElem) totalElem.innerText = `${totalPrice} ₺`;

  if (floatingBtn) {
    if (totalQty > 0) {
      floatingBtn.classList.remove('hidden');
      floatingBtn.classList.add('flex');
    } else {
      floatingBtn.classList.add('hidden');
    }
  }
}

// Cart Modal
window.openCartModal = function() {
  const modal = document.getElementById('cart-modal');
  if (!modal) return;

  renderCartItems();
  modal.classList.remove('hidden');
};

window.closeCartModal = function() {
  const modal = document.getElementById('cart-modal');
  if (modal) modal.classList.add('hidden');
};

function renderCartItems() {
  const container = document.getElementById('cart-modal-items');
  const totalPriceElem = document.getElementById('modal-total-price');

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-gray-400">
        <i class="fa-solid fa-basket-shopping text-4xl mb-3 text-amber-500/30"></i>
        <p>Sepetiniz şu anda boş.</p>
      </div>
    `;
    if (totalPriceElem) totalPriceElem.innerText = '0 ₺';
    return;
  }

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  if (totalPriceElem) totalPriceElem.innerText = `${totalPrice} ₺`;

  container.innerHTML = cart.map(item => `
    <div class="flex items-center justify-between p-3 bg-gray-900/60 rounded-xl border border-gray-800">
      <div>
        <h4 class="font-bold text-gray-100 text-sm">${item.title}</h4>
        <span class="text-xs text-amber-400/90">${item.portionName} • ${item.price} ₺</span>
      </div>
      <div class="flex items-center gap-3">
        <div class="flex items-center bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
          <button onclick="changeQty('${item.cartItemId}', -1)" class="px-2.5 py-1 text-gray-300 hover:bg-gray-700">-</button>
          <span class="px-3 text-sm font-semibold text-amber-400">${item.qty}</span>
          <button onclick="changeQty('${item.cartItemId}', 1)" class="px-2.5 py-1 text-gray-300 hover:bg-gray-700">+</button>
        </div>
        <span class="font-bold text-sm text-gray-200 min-w-[60px] text-right">${item.price * item.qty} ₺</span>
      </div>
    </div>
  `).join('');
}

window.changeQty = function(cartItemId, delta) {
  const item = cart.find(c => c.cartItemId === cartItemId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.cartItemId !== cartItemId);
  }

  updateCartBadge();
  renderCartItems();
};

// WhatsApp Order Generator
window.sendWhatsAppOrder = function() {
  if (cart.length === 0) {
    alert('Lütfen önce sepetinize lezzet ekleyin!');
    return;
  }

  const addressInput = document.getElementById('order-address-input');
  const noteInput = document.getElementById('order-note-input');
  
  const address = addressInput ? addressInput.value.trim() : '';
  const note = noteInput ? noteInput.value.trim() : '';

  let message = `*K7 DÖNER ESENYURT - YENİ SİPARİŞ*\n\n`;
  message += `*Sipariş Detayı:*\n`;

  let total = 0;
  cart.forEach((item, i) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    message += `${i+1}. ${item.title} (${item.portionName}) x ${item.qty} adet = *${itemTotal} TL*\n`;
  });

  message += `\n*Toplam Tutar:* *${total} TL*\n`;

  if (address) {
    message += `\n📍 *Teslimat Adresi:* ${address}\n`;
  } else {
    message += `\n📍 *Teslimat:* (Masaya Servis / Gel-Al / Adres Telefon Yazılacak)\n`;
  }

  if (note) {
    message += `📝 *Not:* ${note}\n`;
  }

  message += `\n_Web sitenizden sipariş verildi._`;

  const encoded = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/902128581819?text=${encoded}`;
  
  window.open(whatsappUrl, '_blank');
};

// Toast notification
function showToast(msg) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'fixed top-20 right-6 z-50 bg-amber-500 text-gray-950 font-bold px-5 py-3 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-[-20px] opacity-0 flex items-center gap-2';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check text-lg"></i> <span>${msg}</span>`;
  toast.classList.remove('translate-y-[-20px]', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-[-20px]', 'opacity-0');
  }, 2500);
}

// Check open/close status (10:00 - 22:30)
function checkOpenStatus() {
  const badge = document.getElementById('status-badge');
  if (!badge) return;

  const now = new Date();
  const hours = now.getHours();
  const mins = now.getMinutes();
  const currentTime = hours * 60 + mins;

  const openTime = 10 * 60; // 10:00
  const closeTime = 22 * 60 + 30; // 22:30

  if (currentTime >= openTime && currentTime <= closeTime) {
    badge.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> <span class="text-emerald-400 font-semibold text-xs">Şu An Açık • Sıcak Serviste</span>`;
  } else {
    badge.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span> <span class="text-amber-300 font-semibold text-xs">Açılış Saat 10:00 (Sipariş Alınabilir)</span>`;
  }
}

// Smooth scroll animations
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
    observer.observe(el);
  });
}
