class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.themeMap = this.createThemeMap();
        this.init();
    }

    // สร้าง mapping ระหว่างชื่อสินค้ากับธีมสี
    createThemeMap() {
        return {
            // White theme
            'ชุดเดรสโบว์หน้า': '⚪ สีขาว',
            'เสื้อแขนตุ๊กตามินิมอล': '⚪ สีขาว',
            'ชุดเดรสสายเดี่ยวระบายลูกไม้': '⚪ สีขาว',
            'เสื้อครอปผ้าคอตตอน': '⚪ สีขาว',
            'ชุดเดรสคอตตอนรัดเอว': '⚪ สีขาว',
            'เสื้อเชิ้ตขาว สวยสะอาด': '⚪ สีขาว',
            
            // Pink theme
            'ชุดเดรสลายดอกไม้เล็ก': '💗 สีชมพู',
            'ชุดเดรสคอวีผ้าไหม': '💗 สีชมพู',
            'เดรสแขนกุ๊กลูกไม้': '💗 สีชมพู',
            'ชุดเดรสลายจุดชมพู': '💗 สีชมพู',
            'เดรสผ้าไหมชมพูกลีบ': '💗 สีชมพู',
            'ชุดเดรสฟ้องชมพู': '💗 สีชมพู',
            
            // Red theme
            'ชุดเดรสลายสก๊อต': '❤️ สีแดง',
            'เสื้อยืดโอเวอร์ไซส์': '❤️ สีแดง',
            'กระโปรงยีนส์ทรงบอลลูน': '❤️ สีแดง',
            'ชุดเดรสแดงสิ้นสกหน้า': '❤️ สีแดง',
            'เสื้อแขนสั้นสีแดง': '❤️ สีแดง',
            'กระโปรงสีแดงผ้าสักหลาด': '❤️ สีแดง',
            
            // Default for items not in mapping
            'default': '📦 สินค้า'
        };
    }

    getThemeForProduct(productName) {
        return this.themeMap[productName] || this.themeMap['default'];
    }

    init() {
        this.cartIcon = document.getElementById('cart-icon');
        this.cartModal = document.getElementById('cart-modal');
        this.closeCartBtn = document.getElementById('close-cart');
        this.cartItemsDiv = document.getElementById('cart-items');
        this.cartCountSpan = document.getElementById('cart-count');
        this.totalPriceSpan = document.getElementById('total-price');
        this.checkoutBtn = document.getElementById('checkout-btn');

        // Event listeners สำหรับ cart modal ถ้ามี
        if (this.cartIcon) this.cartIcon.addEventListener('click', () => this.toggleCart());
        if (this.closeCartBtn) this.closeCartBtn.addEventListener('click', () => this.closeCart());
        if (this.checkoutBtn) this.checkoutBtn.addEventListener('click', () => this.checkout());

        // ใช้ event delegation สำหรับปุ่ม add to cart
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-cart')) {
                this.addToCart(e);
            }
        });

        if (this.cartItemsDiv) {
            this.updateCart();
        }
    }

    attachAddToCartListeners() {
        // This is now handled by event delegation in init()
    }

    addToCart(e) {
        const btn = e.target;
        const productCard = btn.closest('.card') || btn.closest('.product-card');
        
        if (!productCard) {
            console.error('Product card not found');
            return;
        }

        const productNameEl = productCard.querySelector('h3');
        const productPriceEl = productCard.querySelector('.price');
        const sizeSelect = productCard.querySelector('select');

        if (!productNameEl || !productPriceEl) {
            console.error('Product info not found');
            return;
        }

        // ตรวจสอบว่าเลือกไซส์หรือไม่
        const selectedSize = sizeSelect ? sizeSelect.value : '';
        if (sizeSelect && selectedSize === '-- เลือกไซส์ --') {
            alert('กรุณาเลือกไซส์ก่อนครับ');
            return;
        }

        const productName = productNameEl.textContent.trim();
        const priceText = productPriceEl.textContent.trim();
        const productPrice = parseInt(priceText.replace(/[^0-9]/g, ''));

        if (isNaN(productPrice)) {
            console.error('Invalid price:', priceText);
            return;
        }

        // สร้าง key ที่รวม name กับ size เพื่อให้เก็บสินค้าเดียวกันแต่ไซส์ต่างกันแยกออก
        const itemKey = selectedSize ? `${productName} (${selectedSize})` : productName;
        const existingItem = this.items.find(item => item.key === itemKey);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: Date.now(),
                key: itemKey,
                name: productName,
                size: selectedSize || 'N/A',
                theme: this.getThemeForProduct(productName),
                price: productPrice,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCart();

        // แสดงสถานะ
        btn.classList.add('added');
        btn.textContent = '✓ เพิ่มแล้ว';
        setTimeout(() => {
            btn.classList.remove('added');
            btn.textContent = 'เพิ่มลงตะกร้า';
        }, 2000);
    }

    removeFromCart(itemId) {
        // ลบเฉพาะรายการที่มี id ตรงกัน อันอื่นจะเหลือไว้
        const indexToRemove = this.items.findIndex(item => item.id === itemId);
        if (indexToRemove !== -1) {
            this.items.splice(indexToRemove, 1);
            this.saveCart();
            this.updateCart();
            console.log('ลบรายการที่มี ID:', itemId, 'เหลือรายการ:', this.items.length);
        }
    }

    updateQuantity(itemId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(itemId);
            return;
        }
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCart();
        }
    }

    updateCart() {
        // ตรวจสอบว่าใช้ modal หรือหน้าจริง
        if (!this.cartItemsDiv) return;

        // อัปเดตจำนวนสินค้า
        const totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
        if (this.cartCountSpan) this.cartCountSpan.textContent = totalQuantity;

        // แสดงสินค้าในตะกร้า
        if (this.items.length === 0) {
            this.cartItemsDiv.innerHTML = '<p class="empty-cart">ตะกร้ายังว่างค่ะ</p>';
            this.totalPriceSpan.textContent = '0';
            return;
        }

        this.cartItemsDiv.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">${item.price.toLocaleString()} บาท</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" data-id="${item.id}" data-action="minus">−</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" data-id="${item.id}" data-action="plus">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">ลบ</button>
            </div>
        `).join('');

        // Event listeners สำหรับปุ่มในตะกร้า
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.dataset.id);
                const action = e.target.dataset.action;
                const item = this.items.find(i => i.id === itemId);
                
                if (action === 'plus') {
                    this.updateQuantity(itemId, item.quantity + 1);
                } else if (action === 'minus') {
                    this.updateQuantity(itemId, item.quantity - 1);
                }
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.dataset.id);
                this.removeFromCart(itemId);
            });
        });

        // คำนวณราคารวม
        const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (this.totalPriceSpan) this.totalPriceSpan.textContent = total.toLocaleString();
    }

    toggleCart() {
        this.cartModal.classList.toggle('active');
    }

    closeCart() {
        this.cartModal.classList.remove('active');
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    checkout() {
        if (this.items.length === 0) {
            alert('ตะกร้ายังว่างค่ะ');
            return;
        }
        const total = this.totalPriceSpan.textContent;
        alert('ขอบคุณที่สั่งซื้อค่ะ! จำนวนรวม: ' + total + ' บาท');
        this.items = [];
        this.saveCart();
        this.updateCart();
        this.closeCart();
    }
}

// เริ่มต้น
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
});