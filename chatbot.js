class Chatbot {
    constructor() {
        this.chatbotToggle = document.getElementById('chatbot-toggle');
        this.chatbotContainer = document.getElementById('chatbot-container');
        this.chatbotClose = document.getElementById('chatbot-close');
        this.chatbotInput = document.getElementById('chatbot-input');
        this.chatbotSend = document.getElementById('chatbot-send');
        this.chatbotMessages = document.getElementById('chatbot-messages');

        this.historyKey = 'chatHistory';
        this.maxHistory = 500; // keep latest N messages
        try {
            this.history = JSON.parse(localStorage.getItem(this.historyKey)) || [];
        } catch (e) {
            this.history = [];
        }

        // Product database - includes featured products from index.html
        this.products = [
            // Featured from index.html (สินค้าแนะนำ)
            { name: 'ชุดเดรสลายตารางเล็ก', price: 350, img: 'https://i.postimg.cc/Kztd55dp/35dc8fc45069c0ed3e5afce155db32ba.jpg', theme: ['เดรส','dress'], rating: 4, featured: true },
            { name: 'ชุดเดรสสีครีมลายจุดดำ', price: 450, img: 'https://i.postimg.cc/nz7tPxDx/97b6053408338a6aaab688c141d89ef9.jpg', theme: ['เดรส','dress'], rating: 4, featured: true },
            { name: 'ชุดเดรสลายสก๊อต', price: 490, img: 'https://i.postimg.cc/rFwPdcwD/b41cc805d73fa9ff770997ed758d9803.jpg', theme: ['เดรส','dress'], rating: 4, featured: true },
            { name: 'ชุดเดรสแขนตุ๊กตามินิมอล', price: 550, img: 'https://i.postimg.cc/kgxKqRPG/18fd00c5378fa3d877be6d640ded5895.jpg', theme: ['เดรส','dress'], rating: 4, featured: true },
            { name: 'ชุดเดรสลายดอกไม้ปัก', price: 590, img: 'https://i.postimg.cc/c43FjcT4/031611812a726bb110d9e303229a58e0.jpg', theme: ['เดรส','dress'], rating: 4, featured: true },
            { name: 'ชุดเดรสลายดอกไม้เล็ก', price: 350, img: 'https://i.postimg.cc/9fLbTgX1/291d2c7897f7d57bba14080574d6c8ab.jpg', theme: ['เดรส','dress'], rating: 4, featured: true },
            
            // Best seller products from best-seller.html
            { name: 'ชุดเดรสสไตล์เกาหลี', price: 350, img: 'https://i.postimg.cc/Y0CyZhRD/d59047cc7093fc78dd3cf945f9b819d0.jpg', theme: ['เดรส','dress'], rating: 5, bestseller: true },
            { name: 'ชุดเดรสโบว์หน้า', price: 359, img: 'https://i.postimg.cc/4N0gPc5Y/bow-front-dress.jpg', theme: ['เดรส','dress'], rating: 5, bestseller: true },
            { name: 'ชุดเดรสโบว์ไหล่หวาน', price: 350, img: 'https://i.postimg.cc/placeholder/bow-shoulder.jpg', theme: ['เดรส','dress'], rating: 5 },
            { name: 'ชุดเดรสโบว์ดอกกุหลาบ', price: 590, img: 'https://i.postimg.cc/placeholder/bow-rose.jpg', theme: ['เดรส','dress'], rating: 5 },
            { name: 'ชุดเดรสลายจุดชมพู', price: 380, img: 'https://i.postimg.cc/placeholder/polka-pink.jpg', theme: ['เดรส','dress'], rating: 4 },
            { name: 'ชุดเซ็ตกลีบกุหลาบอ่อน', price: 560, img: 'https://i.postimg.cc/placeholder/rose-petal-set.jpg', theme: ['ชุดเซ็ต'], rating: 4 },
            { name: 'ชุดเดรสเสื้อแขนตุ๊กตามินิมอล', price: 550, img: 'https://i.postimg.cc/kgxKqRPG/18fd00c5378fa3d877be6d640ded5895.jpg', theme: ['เดรส','dress'], rating: 4, featured: true },
            { name: 'ชุดเดรสสายเดี่ยวระบายลูกไม้', price: 599, img: 'https://i.postimg.cc/placeholder/lace-dress.jpg', theme: ['เดรส','dress'], rating: 4 },
            { name: 'ชุดเดรสโปโล', price: 490, img: 'https://i.postimg.cc/placeholder/polo-dress.jpg', theme: ['เดรส','dress'], rating: 4 },
            { name: 'ชุดเซ็ตไหมพรมละมุน', price: 420, img: 'https://i.postimg.cc/nLTWk4YV/403ff7c17865d5e8f80b5d14df01df83.jpg', theme: ['เดรส','dress'], rating: 5, bestseller: true },
            { name: 'ชุดเดรสโบว์ชมพู', price: 490, img: 'https://i.postimg.cc/5yjj0Spv/d1e1a95d7613fed51d18daaf7a8ad290.jpg', theme: ['เดรส','dress'], rating: 5, bestseller: true },
            { name: 'ชุดเซ็ตคุณหนูโบว์หวาน', price: 750, img: 'https://i.postimg.cc/fWK8nCds/7412f5dd867aa210a2566afcbcb9bc8f.jpg', theme: ['เดรส','dress'], rating: 5, bestseller: true },
            { name: 'ชุดเดรสสีแดงผูกคอ', price: 399, img: 'https://i.postimg.cc/SsjckPH1/97f0923fd505d533b7b24fc35220b7e2.jpg', theme: ['เดรส','dress'], rating: 5, bestseller: true },
            { name: 'เดรสสีแดงสายเดี่ยวเว้าหน้า', price: 650, img: 'https://i.postimg.cc/Y9JLkC6F/04fdcf57da0429b1324d46f7cae74ba7.jpg', theme: ['เดรส','dress'], rating: 5, bestseller: true },
            
            // Other products
            { name: 'Pastel Dream Sweater', price: 890, img: 'https://picsum.photos/500/350?random=1', theme: ['ชุดเซ็ต'], rating: 5 },
            { name: 'Cozy Knit Cardigan', price: 990, img: 'https://picsum.photos/500/350?random=2', theme: ['ชุดเซ็ต'], rating: 5 },
            { name: 'Cute Oversized Tee', price: 590, img: 'https://picsum.photos/500/350?random=3', theme: ['ชุดเซ็ต'], rating: 4 },
            { name: 'Aesthetic Linen Blouse', price: 890, img: 'https://picsum.photos/500/350?random=4', theme: ['ชุดเซ็ต'], rating: 5 },
            { name: 'Soft Pastel Hoodie', price: 1190, img: 'https://picsum.photos/500/350?random=5', theme: ['ชุดเซ็ต'], rating: 4 },
            { name: 'Kawaii Style Crop Top', price: 690, img: 'https://picsum.photos/500/350?random=6', theme: ['ชุดเซ็ต'], rating: 5 }
        ];

        // pending product waiting for size selection
        this.pendingProduct = null;

        this.init();
    }

    init() {
        if (this.chatbotToggle) {
            this.chatbotToggle.tabIndex = 0;
            this.chatbotToggle.addEventListener('click', () => this.toggleChat());
        }
        if (this.chatbotClose) this.chatbotClose.addEventListener('click', () => this.closeChat());
        if (this.chatbotSend) this.chatbotSend.addEventListener('click', () => this.sendMessage());
        if (this.chatbotInput) {
            this.chatbotInput.tabIndex = 0;
            this.chatbotInput.removeAttribute('disabled');
            this.chatbotInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.sendMessage(); });
            this.chatbotInput.style.pointerEvents = 'auto';
            this.chatbotInput.style.zIndex = '2147483648';
        }

        // render history or welcome
        if (this.history && this.history.length) {
            this.renderHistory();
        } else {
            const welcome = 'สวัสดีค่ะ! 👋 ยินดีต้อนรับสู่ SWG.SHOP\\nฉันช่วยได้เรื่อง: สินค้า / สั่งซื้อ / จัดส่ง / ติดต่อ\\n\\nเลือกหัวข้อที่สนใจได้เลยค่ะ!';
            this.addBotMessage(welcome, true, null, null);
        }

        // add clear button if header exists
        const header = document.querySelector('.chatbot-header');
        if (header && !document.getElementById('chatbot-clear')) {
            const btn = document.createElement('button');
            btn.id = 'chatbot-clear';
            btn.textContent = 'ล้าง';
            btn.className = 'chatbot-clear';
            btn.style.marginLeft = '8px';
            btn.addEventListener('click', () => this.clearHistory());
            header.appendChild(btn);
        }

        // Create a top-most transparent hit area over the toggle as a fallback
        if (!document.getElementById('chatbot-hit')) {
            try {
                const hit = document.createElement('div');
                hit.id = 'chatbot-hit';
                Object.assign(hit.style, {
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    zIndex: '2147483649',
                    background: 'rgba(255,0,0,0.06)', /* light debug overlay */
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                    borderRadius: '50%'
                });
                hit.title = 'เปิด/ปิดแชท (สำรอง)';
                hit.addEventListener('click', (e) => { e.stopPropagation(); this.toggleChat(); });
                document.body.appendChild(hit);
                // Fallback: also toggle when clicking anywhere near bottom-right corner
                document.addEventListener('click', (e) => {
                    try {
                        const nearRight = e.clientX > window.innerWidth - 120;
                        const nearBottom = e.clientY > window.innerHeight - 120;
                        if (nearRight && nearBottom) {
                            // ignore clicks on inputs or buttons to avoid interfering
                            const tag = (e.target && e.target.tagName) || '';
                            if (!['INPUT','BUTTON','TEXTAREA','A'].includes(tag)) {
                                console.log('chatbot: bottom-right fallback click');
                                this.toggleChat();
                            }
                        }
                    } catch(err) { /* ignore */ }
                }, {capture: false});
            } catch (e) {
                console.warn('Could not create chatbot hit area', e);
            }
        }

        // Keyboard shortcut: Ctrl+M toggles chat
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
                e.preventDefault();
                this.toggleChat();
            }
        });

        const t = document.getElementById('chatbot-toggle'); 
        t && {visible: !!t, rect: t.getBoundingClientRect(), z: getComputedStyle(t).zIndex, pe: getComputedStyle(t).pointerEvents};
    }

    toggleChat() {
        if (!this.chatbotContainer) return;
        this.chatbotContainer.classList.toggle('active');
        if (this.chatbotContainer.classList.contains('active') && this.chatbotInput) {
            // focus input after container becomes visible
            setTimeout(() => { try { this.chatbotInput.focus(); } catch(e){} }, 80);
        }
    }

    closeChat() {
        if (!this.chatbotContainer) return;
        this.chatbotContainer.classList.remove('active');
    }

    sendMessage() {
        if (!this.chatbotInput) return;
        const message = this.chatbotInput.value.trim();
        if (!message) return;
        this.addUserMessage(message, true);
        this.chatbotInput.value = '';
        setTimeout(() => this.botReply(message), 400);
    }

    addUserMessage(text, save = false) {
        if (!this.chatbotMessages) return;
        const div = document.createElement('div');
        div.className = 'chatbot-message user';
        div.innerHTML = `<div class="message-text">${this.formatMessage(text)}</div>`;
        this.chatbotMessages.appendChild(div);
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
        if (save) this.pushHistory('user', text);
    }

    addBotMessage(text, save = false, buttons = null, products = null) {
        if (!this.chatbotMessages) return;
        const div = document.createElement('div');
        div.className = 'chatbot-message bot';
        div.innerHTML = `<div class="message-text">${this.formatMessage(text)}</div>`;
        
        // Add product cards if provided
        if (products && products.length > 0) {
            const productsContainer = document.createElement('div');
            productsContainer.className = 'chatbot-products';
            products.forEach(prod => {
                const card = document.createElement('div');
                card.className = 'chatbot-product-card';
                card.innerHTML = `
                    <img src="${prod.img}" alt="${prod.name}">
                    <h4>${prod.name}</h4>
                    <p class="prod-price">฿${prod.price.toLocaleString('th-TH')}</p>
                `;
                productsContainer.appendChild(card);
            });
            div.appendChild(productsContainer);
        }
        
        // Add action buttons if provided (DISABLED - buttons removed)
        // if (buttons && buttons.length > 0) {
        //     const btnContainer = document.createElement('div');
        //     btnContainer.className = 'chatbot-buttons';
        //     buttons.forEach(btn => {
        //         const button = document.createElement('button');
        //         button.className = 'chatbot-action-btn';
        //         button.textContent = btn.label;
        //         button.onclick = btn.action;
        //         btnContainer.appendChild(button);
        //     });
        //     div.appendChild(btnContainer);
        // }
        
        this.chatbotMessages.appendChild(div);
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
        if (save) this.pushHistory('bot', text);
    }

    formatMessage(text) {
        return this.escapeHtml(text).replace(/\\n/g, '<br>');
    }

    pushHistory(sender, text) {
        try {
            this.history.push({ sender, text, time: new Date().toISOString() });
            if (this.history.length > this.maxHistory) this.history = this.history.slice(-this.maxHistory);
            localStorage.setItem(this.historyKey, JSON.stringify(this.history));
        } catch (e) {
            console.warn('Could not save chat history', e);
        }
    }

    renderHistory() {
        if (!this.chatbotMessages) return;
        this.chatbotMessages.innerHTML = '';
        for (const msg of this.history) {
            const div = document.createElement('div');
            div.className = msg.sender === 'user' ? 'chatbot-message user' : 'chatbot-message bot';
            div.innerHTML = `<div class="message-text">${this.formatMessage(msg.text)}</div>`;
            this.chatbotMessages.appendChild(div);
        }
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
    }

    clearHistory() {
        this.history = [];
        localStorage.removeItem(this.historyKey);
        if (this.chatbotMessages) this.chatbotMessages.innerHTML = '';
        const welcome = 'สวัสดีค่ะ! 👋 ยินดีต้อนรับสู่ SWG.SHOP\\nฉันช่วยได้เรื่อง: สินค้า / สั่งซื้อ / จัดส่ง / ติดต่อ\\n\\nเลือกหัวข้อที่สนใจได้เลยค่ะ!';
        this.addBotMessage(welcome, true, null, null);
    }

    // ฟังก์ชันสำหรับดึงข้อมูลสินค้าจาก HTML และแสดงในแชท
    async fetchProductsFromPage(pageName = 'collection') {
        try {
            const response = await fetch(pageName + '.html');
            const html = await response.text();
            
            // สร้าง DOM parser
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // ดึงสินค้าทั้งหมด
            const cards = doc.querySelectorAll('.card');
            const products = [];
            
            cards.forEach(card => {
                const nameEl = card.querySelector('h3');
                const priceEl = card.querySelector('.price');
                const imgEl = card.querySelector('img');
                
                if (nameEl && priceEl) {
                    products.push({
                        name: nameEl.textContent.trim(),
                        price: priceEl.textContent.trim(),
                        img: imgEl ? imgEl.src : '',
                        alt: imgEl ? imgEl.alt : ''
                    });
                }
            });
            
            return products;
        } catch (e) {
            console.warn('Could not fetch products from page:', e);
            return [];
        }
    }

    // Helper: Try to match and add product to cart by name
    tryAddProductToCart(userMessage) {
        const msg = String(userMessage).toLowerCase().trim();
        let bestMatch = null;
        let bestMatchScore = 0;
        
        // First try: exact substring match (user mentioned product name directly)
        for (const prod of this.products) {
            const prodName = String(prod.name).toLowerCase();
            
            // Exact substring match (highest priority)
            if (msg.includes(prodName)) {
                return prod;
            }
            
            // Partial match: check if key words from product name appear in message
            const prodWords = prodName.split(/[\s-]/);
            let matchScore = 0;
            for (const word of prodWords) {
                if (word.length > 2 && msg.includes(word)) {
                    matchScore += word.length;
                }
            }
            
            // Track best match by score
            if (matchScore > bestMatchScore) {
                bestMatchScore = matchScore;
                bestMatch = prod;
            }
        }
        
        // If good partial match found, use it
        if (bestMatch && bestMatchScore >= 4) {
            return bestMatch;
        }
        
        // Second try: match by theme keywords
        if (msg.includes('เดรส') || msg.includes('dress')) {
            return this.products.find(p => p.theme.includes('เดรส'));
        } else if (msg.includes('ชุดเซ็ต') || msg.includes('เซ็ต') || msg.includes('set')) {
            return this.products.find(p => p.theme.includes('ชุดเซ็ต'));
        }
        
        return null;
    }

    // Helper: parse size from user message (supports XS, S, M, L, XL, XXL and Thai mentions)
    parseSizeFromMessage(userMessage) {
        const msg = String(userMessage).toLowerCase();
        const sizeMap = ['xs', 's', 'm', 'l', 'xl', 'xxl'];
        // common thai patterns: 'ไซส์ s', 'ไซส์ m', 'ขนาด m'
        for (const sz of sizeMap) {
            if (msg.includes(`ไซส์ ${sz}`) || msg.includes(`ขนาด ${sz}`) || msg.includes(`size ${sz}`) || msg.includes(` ${sz} `) || msg.endsWith(` ${sz}`) || msg.includes(`${sz}`)) {
                return sz.toUpperCase();
            }
        }
        // also detect numeric sizes like 36,38,40
        const numMatch = msg.match(/\b(\d{2})\b/);
        if (numMatch) return numMatch[1];
        return null;
    }

    addProductToCart(product, size = 'M', quantity = 1) {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartItem = {
                name: product.name,
                price: product.price,
                img: product.img,
                size: size || 'M', // default size
                quantity: quantity
            };
            // Check if already in cart
            const existing = cart.find(item => item.name === cartItem.name && item.size === cartItem.size);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push(cartItem);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            return true;
        } catch (e) {
            console.warn('Could not add to cart', e);
            return false;
        }
    }

    // Ask user to choose size for a pending product
    askForSize(product) {
        this.pendingProduct = product;
        const msg = `คุณต้องการไซส์ไหนสำหรับ "${product.name}" คะ?`;
        const sizes = ['XS','S','M','L','XL','XXL'];
        const buttons = sizes.map(sz => ({ label: sz, action: () => { this.addUserMessage(`ไซส์ ${sz}`, true); this.handleSizeSelection(sz); } }));
        this.addBotMessage(msg, true, buttons, null);
    }

    // Handle size chosen and ask for quantity
    handleSizeSelection(size) {
        if (!this.pendingProduct) return;
        this.selectedSize = size;
        this.askForQuantity();
    }

    // Ask for quantity
    askForQuantity() {
        if (!this.pendingProduct) return;
        const msg = `ต้องการสั่งกี่ชิ้นคะ?`;
        const quantities = ['1', '2', '3', '4', '5'];
        const buttons = quantities.map(qty => ({ label: qty, action: () => { this.addUserMessage(`${qty} ชิ้น`, true); this.handleQuantitySelection(parseInt(qty)); } }));
        this.addBotMessage(msg, true, buttons, null);
    }

    // Handle quantity selection and add to cart
    handleQuantitySelection(quantity) {
        if (!this.pendingProduct || !this.selectedSize) return;
        const prod = this.pendingProduct;
        const size = this.selectedSize;
        this.pendingProduct = null;
        this.selectedSize = null;
        const added = this.addProductToCart(prod, size, quantity);
        if (added) {
            const confirmMsg = `✅ ได้เลยค่ะ! เพิ่ม "${prod.name}" (ไซส์ ${size}) ${quantity} ชิ้น ลงตะกร้าแล้ว\n\nต้องการเลือกอะไรเพิ่มหรือชำระเงินเลยค่ะ?`;
            const buttons = [
                { label: '🛒 ดูตะกร้า', action: () => window.location.href = 'cart-page.html' },
                { label: '🛍️ เลือกเพิ่มเติม', action: () => window.location.href = 'collection.html' }
            ];
            this.addBotMessage(confirmMsg, true, buttons, null);
        } else {
            this.addBotMessage('ขอโทษค่ะ เกิดข้อผิดพลาด ขอลองใหม่อีกครั้งได้ไหมคะ?', true);
        }
    }

    // Show payment QR and COD info inline in chat
    showPaymentQr() {
        const msg = 'ช่องทางการชำระเงินที่รองรับ:\n1) สแกนจ่าย (QR) — ชำระออนไลน์ได้ทันที\n2) เก็บเงินปลายทาง (COD) — จ่ายเมื่อได้รับสินค้า';
        const buttons = [
            { label: 'แจ้งชำระ (ส่งสลิป)', action: () => { window.location.href = 'contact.html'; } },
            { label: 'ไปที่ตะกร้า', action: () => { window.location.href = 'cart-page.html'; } }
        ];
        this.addBotMessage(msg, true, buttons, null);

        // append QR image to last bot message
        try {
            const last = this.chatbotMessages && this.chatbotMessages.lastElementChild;
            if (last) {
                const img = document.createElement('img');
                img.src = 'https://i.postimg.cc/26Bg9CCZ/af30c4e1-e184-4a32-bdeb-fb681e344b83.jpg';
                img.alt = 'QR Payment';
                img.style.maxWidth = '240px';
                img.style.display = 'block';
                img.style.margin = '10px auto 0';
                last.appendChild(img);
            }
        } catch (e) { /* ignore */ }
    }

    botReply(userMessage) {
        this.botReplyAsync(userMessage);
    }

    async botReplyAsync(userMessage) {
        const message = String(userMessage).toLowerCase().trim();

        // If waiting for size selection and user just replied with a size, finalize
        const pendingSize = this.parseSizeFromMessage(userMessage);
        if (this.pendingProduct && pendingSize) {
            this.handleSizeSelection(pendingSize);
            return;
        }

        // If user asks about payment methods, show QR + COD info immediately
        const paymentKeywords = ['ชำระ','ชำระเงิน','จ่าย','วิธีชำระ','จ่ายยังไง','วิธีจ่าย','payment','ชำระยังไง'];
        if (paymentKeywords.some(kw => message.includes(kw))) {
            this.showPaymentQr();
            return;
        }
        
        // Explicit order triggers for specific product names
        const explicitOrderKeywords = ['สั่งซื้อ', 'สั่ง', 'เอา', 'ซื้อ', 'อยากได้', 'ต้องการ', 'ให้หน่อย'];
        const explicitProducts = [
            'ชุดเดรสลายตารางเล็ก',
            'ชุดเดรสสีครีมลายจุดดำ',
            'ชุดเดรสลายสก๊อต',
            'ชุดเดรสแขนตุ๊กตามินิมอล',
            'ชุดเดรสลายดอกไม้ปัก',
            'ชุดเดรสลายดอกไม้เล็ก'
        ];
        // extend explicit product names requested by user
        explicitProducts.push(
            'ชุดเดรสโบว์หน้า',
            'ชุดเดรสเสื้อแขนตุ๊กตามินิมอล',
            'ชุดเดรสสายเดี่ยวระบายลูกไม้',
            'ชุดเดรสสไตล์เกาหลี',
            'ชุดเดรสโปโล',
            'ชุดเซ็ตไหมพรมละมุน'
        );
        // add additional pink-theme explicit triggers
        explicitProducts.push(
            'ชุดเดรสโบว์ไหล่หวาน',
            'ชุดเดรสโบว์ชมพู',
            'ชุดเดรสโบว์ดอกกุหลาบ',
            'ชุดเดรสลายจุดชมพู',
            'ชุดเซ็ตคุณหนูโบว์หวาน',
            'ชุดเซ็ตกลีบกุหลาบอ่อน'
        );

        // Special alias mapping: map common human phrases to actual product names
        const aliasMap = [
            { aliases: ['ชุดแดงแพงแรงฤทธิ์'], productName: 'ชุดเดรสสีแดงผูกคอ' },
            { aliases: ['ชุดเดรสสีแดง', 'ชุดเดรสแดง'], productName: 'ชุดเดรสสีแดงผูกคอ' },
            { aliases: ['ชุดเดรสแดงเรียบ'], productName: 'ชุดเดรสสีแดงผูกคอ' },
            { aliases: ['ชุดเดรสโบว์แดง', 'โบว์แดง'], productName: 'ชุดเดรสโบว์หน้า' },
            { aliases: ['เดรสสีแดงสายเดี่ยวเว้าหน้า'], productName: 'เดรสสีแดงสายเดี่ยวเว้หน้า' }
        ];

        // Check alias map first for direct matches like "สั่งซื้อชุดแดงแพงแรงฤทธิ์ให้หน่อย"
        for (const mapEntry of aliasMap) {
            for (const a of mapEntry.aliases) {
                if (message.includes(a)) {
                    // if user expressed purchase intent (has any order keyword) proceed
                    if (explicitOrderKeywords.some(kw => message.includes(kw)) || message.startsWith('สั่ง') || message.startsWith('สั่งซื้อ')) {
                        const matched = this.products.find(p => p.name === mapEntry.productName || p.name.includes(mapEntry.productName));
                        if (matched) {
                            const parsedSize = this.parseSizeFromMessage(message);
                            if (!parsedSize) {
                                this.askForSize(matched);
                                return;
                            }
                            // Size is provided, ask for quantity
                            this.pendingProduct = matched;
                            this.selectedSize = parsedSize;
                            this.askForQuantity();
                            return;
                        }
                    }
                }
            }
        }
        for (const prodName of explicitProducts) {
            for (const kw of explicitOrderKeywords) {
                if (message.includes(kw) && message.includes(prodName.toLowerCase())) {
                    const matched = this.products.find(p => p.name === prodName);
                    if (matched) {
                        const parsedSize = this.parseSizeFromMessage(message);
                        if (!parsedSize) {
                            this.askForSize(matched);
                            return;
                        }
                        // Size is provided, ask for quantity
                        this.pendingProduct = matched;
                        this.selectedSize = parsedSize;
                        this.askForQuantity();
                        return;
                    }
                }
            }
        }
        
        // Handle product queries: "สินค้าอะไร [product name]" or "ของอะไร [product name]"
        // Remove query prefix to extract product name
        let cleanedMessage = message;
        const queryPrefixes = ['สินค้าอะไร', 'สินค้าไหน', 'ของอะไร', 'เอาอะไร'];
        for (const prefix of queryPrefixes) {
            if (message.includes(prefix)) {
                cleanedMessage = message.replace(prefix, '').trim();
                break;
            }
        }
        
        // Auto-purchase: Detect purchase intent and add to cart
        const purchaseKeywords = ['เอา', 'ซื้อ', 'อยากได้', 'ต้องการ', 'เลือก', 'ขอ', 'สั่ง'];
        const hasPurchaseIntent = purchaseKeywords.some(kw => cleanedMessage.includes(kw));
        
        // If query prefix was found or purchase intent detected, try to add product
        if ((cleanedMessage !== message || hasPurchaseIntent) && !cleanedMessage.includes('ราคา') && !cleanedMessage.includes('ยังไง') && !cleanedMessage.includes('วิธี')) {
            // Try to match specific product name from cleaned message
            const matchedProduct = this.tryAddProductToCart(cleanedMessage || userMessage);
            
            if (matchedProduct) {
                // If user didn't specify size, ask for it first
                const parsedSize = this.parseSizeFromMessage(cleanedMessage || userMessage);
                if (!parsedSize) {
                    this.askForSize(matchedProduct);
                    return;
                }
                // Size is provided, ask for quantity
                this.pendingProduct = matchedProduct;
                this.selectedSize = parsedSize;
                this.askForQuantity();
                return;
            }
        }
        
        // If we removed a query prefix but didn't match product, show product list
        if (cleanedMessage !== message && !cleanedMessage) {
            // User just asked "สินค้าอะไร" without specifying
            const buttons = [
                { label: '🛍️ ไปดูสินค้า', action: () => window.location.href = 'collection.html' }
            ];
            this.addBotMessage('สินค้าในร้านเรา:\n👗 ชุดเซ็ต: ชุดเซ็ตสไตล์หลากหลาย ราคา 350-1190 บาท\n👗 เดรส: ชุดเดรสลายต่างๆ ราคา 350-590 บาท\n\nพิมพ์ชื่อสินค้าที่อยากได้นะค่ะ!', true, buttons, null);
            return;
        }
        
        // Standard purchase intent detection
        if (hasPurchaseIntent && !message.includes('ราคา') && !message.includes('ยังไง') && !message.includes('วิธี')) {
            // Try to match specific product name from user message
            const matchedProduct = this.tryAddProductToCart(userMessage);
            
            if (matchedProduct) {
                // If user didn't include size, ask for it
                const parsedSize = this.parseSizeFromMessage(userMessage);
                if (!parsedSize) {
                    this.askForSize(matchedProduct);
                    return;
                }
                // Size is provided, ask for quantity
                this.pendingProduct = matchedProduct;
                this.selectedSize = parsedSize;
                this.askForQuantity();
                return;
            }
        }
        
        // Special case: when asking for white items specifically
        if ((message.includes('อยากได้') || message.includes('ต้องการ') || message.includes('เลือก') || message.includes('ชุด')) && message.includes('สีขาว')) {
            const whiteReply = 'สินค้าขายดีสีขาว:\\n🥇 ชุดเดรสสไตล์เกาหลี ฿350 ⭐⭐⭐⭐⭐\\n🥈 ชุดเดรสโบว์หน้า ฿359 ⭐⭐⭐⭐⭐\\n🥉 ชุดเซ็ตไหมพรมละมุน ฿420 ⭐⭐⭐⭐⭐\\nหรือดูตัวเลือกสีขาวอื่นๆ ได้ในคอลเลคชัน!';
            const buttons = [
                { label: '⚪ ดูคอลเลคชันสีขาว', action: () => window.location.href = 'collection.html#white' }
            ];
            this.addBotMessage(whiteReply, true, buttons, null);
            return;
        }
        
        // Special case: when asking for recommendations for specific colors
        if ((message.includes('แนะนำ') || message.includes('อยากได้')) && message.includes('สี')) {
            let colorReply = '';
            let products = null;
            let button = null;
            
            if (message.includes('ขาว')) {
                colorReply = 'สินค้าสีขาวแนะนำ: 🤍';
                products = this.products.filter(p => p.name.includes('สไตล์เกาหลี') || p.name.includes('โบว์หน้า') || p.name.includes('ไหมพรมละมุน'));
                button = { label: '⚪ ดูทั้งหมด', action: () => window.location.href = 'collection.html#white' };
            } else if (message.includes('ชมพู') || message.includes('pink')) {
                colorReply = 'สินค้าสีชมพูแนะนำ: 💗';
                products = this.products.filter(p => p.name.includes('โบว์ชมพู') || p.name.includes('คุณหนูโบว์') || p.name.includes('โบว์ไหล่'));
                button = { label: '💗 ดูทั้งหมด', action: () => window.location.href = 'collection.html#pink' };
            } else if (message.includes('แดง') || message.includes('red')) {
                colorReply = 'สินค้าสีแดงแนะนำ: ❤️';
                products = this.products.filter(p => p.name.includes('สีแดง') || p.name.includes('สายเดี่ยว') || p.name.includes('แดง'));
                button = { label: '❤️ ดูทั้งหมด', action: () => window.location.href = 'collection.html#red' };
            }
            
            if (colorReply) {
                const buttons = button ? [button] : null;
                if (!buttons) buttons = [];
                else buttons = [button];
                buttons.push({ label: '⬅️ กลับไปเมนูหลัก', action: () => { this.clearHistory(); } });
                this.addBotMessage(colorReply, true, buttons, products);
                return;
            }
        }
        
        // Special case: when asking about buying specific colors
        if (message.includes('จะซื้อ') && message.includes('สี')) {
            let colorReply = '';
            let button = null;
            
            if (message.includes('ขาว')) {
                colorReply = 'ถ้าต้องการสีขาว ลองดูสินค้าขายดีนี้ค่ะ:\\n🥇 ชุดเดรสสไตล์เกาหลี ฿350 ⭐⭐⭐⭐⭐\\n🥈 ชุดเดรสโบว์หน้า ฿359 ⭐⭐⭐⭐⭐\\n🥉 ชุดเซ็ตไหมพรมละมุน ฿420 ⭐⭐⭐⭐⭐';
                button = { label: '⚪ ดูคอลเลคชันสีขาว', action: () => window.location.href = 'collection.html#white' };
            } else if (message.includes('ชมพู') || message.includes('pink')) {
                colorReply = 'สีชมพูสดใส! ลองดูสินค้านี้ค่ะ:\\n◾ ชุดเดรสโบว์ไหล่หวาน ฿350\\n◾ ชุดเดรสโบว์ชมพู ฿490\\n◾ ชุดเซ็ตคุณหนูโบว์หวาน ฿750';
                button = { label: '💗 ดูคอลเลคชันสีชมพู', action: () => window.location.href = 'collection.html#pink' };
            } else if (message.includes('แดง') || message.includes('red')) {
                colorReply = 'สีแดงหรู! ลองดูสินค้านี้ค่ะ:\\n◾ ชุดเดรสสีแดง ฿599\\n◾ ชุดเดรสสีแดงผูกคอ ฿399\\n◾ เดรสสีแดงสายเดี่ยวเว้าหน้า ฿650';
                button = { label: '❤️ ดูคอลเลคชันสีแดง', action: () => window.location.href = 'collection.html#red' };
            }
            
            if (colorReply) {
                const buttons = button ? [button] : null;
                if (!buttons) buttons = [];
                else buttons = [button];
                buttons.push({ label: '⬅️ กลับไปเมนูหลัก', action: () => { this.clearHistory(); } });
                this.addBotMessage(colorReply, true, buttons, null);
                return;
            }
        }
        
        // Special case: when asking how to order
        if (message.includes('สั่งซื้อ') && (message.includes('ยังไง') || message.includes('ได้ไหม') || message.includes('วิธี'))) {
            const orderReply = 'วิธีสั่งซื้อง่ายๆ:\\n\\n1️⃣ เลือกสินค้าที่ชอบ (กดเข้าร้านของเรา)\\n2️⃣ เลือกไซส์และจำนวน\\n3️⃣ เพิ่มลงตะกร้า\\n4️⃣ ไปที่หน้าตะกร้า\\n5️⃣ กรอกข้อมูลการส่ง\\n6️⃣ เลือกวิธีชำระเงิน\\n7️⃣ สั่งเสร็จ! 🎉\\n\\nจะได้รับ tracking number ผ่าน Email ค่ะ!';
            const buttons = [
                { label: '🛍️ ไปเลือกสินค้า', action: () => window.location.href = 'collection.html' }
            ];
            this.addBotMessage(orderReply, true, buttons, null);
            return;
        }
        
        // expanded FAQ map with detailed product info
        const faq = [
            {k: ['สวัสดี','hi','hello','สวัสดีค่ะ'], a: 'สวัสดีค่ะ! 👋 ยินดีต้อนรับสู่ SWG.SHOP\\nฉันช่วยได้เรื่อง: สินค้า / ราคา / จัดส่ง / คืน / ติดต่อ / ไซส์ / โปรโมชั่น\\nพิมพ์คำสั้นๆ เช่น "ราคา" หรือถามเลยค่ะ'},
            {k: ['หน้าแรก','แนะนำ','featured','recommended'], a: '✨ สินค้าแนะนำจากหน้าแรก\\nดูสินค้าสุดฮิตที่ลูกค้าชอบ!'},
            {k: ['ชุด','ชุดเซ็ต','เซ็ต','set'], a: 'ชุดยอดนิยม:\\n◾ ชุดเดรสสไตล์เกาหลี ฿350 (XS-XXL)\\n◾ ชุดเซ็ตไหมพรมละมุน ฿420 (XS-XXL)\\n◾ ชุดเดรสโบว์ชมพู ฿490 (S-XL)\\nสั่งได้เลยค่ะ!'},
            {k: ['เดรส','dress','กระโปรง','ชุดเดรส','เดรสสวย','ชุด'], a: 'ชุดเดรส:\\n◾ ชุดเดรสลายตารางเล็ก ฿350\\n◾ ชุดเดรสสีครีมลายจุดดำ ฿450\\n◾ ชุดเดรสลายสก๊อต ฿490\\n◾ ชุดเดรสแขนตุ๊กตามินิมอล ฿550\\n◾ ชุดเดรสลายดอกไม้ปัก ฿590\\n◾ ชุดเดรสลายดอกไม้เล็ก ฿350\\nทุกชุดมีไซส์ XS-XXL ค่ะ!'},
            {k: ['ขาว','white','สีขาว'], a: 'ธีมสีขาว (จากคอลเลคชัน):\\n◾ ชุดเดรสโบว์หน้า ฿359\\n◾ ชุดเดรสเสื้อแขนตุ๊กตามินิมอล ฿459\\n◾ ชุดเดรสสายเดี่ยวระบายลูกไม้ ฿599\\n◾ ชุดเดรสสไตล์เกาหลี ฿350\\n◾ ชุดเดรสโปโล ฿490\\n◾ ชุดเซ็ตไหมพรมละมุน ฿420\\nสีขาวปราชีญ สะอาด สดใส!'},
            {k: ['ชมพู','pink','rose','สีชมพู','พิงค์'], a: 'ธีมสีชมพู (จากคอลเลคชัน):\\n◾ ชุดเดรสโบว์ไหล่หวาน ฿350\\n◾ ชุดเดรสโบว์ชมพู ฿490\\n◾ ชุดเดรสโบว์ดอกกุหลาบ ฿590\\n◾ ชุดเดรสลายจุดชมพู ฿380\\n◾ ชุดเซ็ตคุณหนูโบว์หวาน ฿750\\n◾ ชุดเซ็ตกลีบกุหลาบอ่อน ฿560\\nชมพูหวาน น่ารัก สดใสมากค่ะ!'},
            {k: ['แดง','red','สีแดง','สีแดงเข้ม'], a: 'ธีมสีแดง (จากคอลเลคชัน):\\n◾ ชุดแดงแพงแรงฤทธิ์ ฿599\\n◾ ชุดเดรสสีแดง ฿599\\n◾ ชุดเดรสสีแดงผูกคอ ฿399\\n◾ เดรสสีแดงสายเดี่ยวเว้าหน้า ฿650\\nแดงสดใส โดดเด่น หรูหราค่ะ!'},
            {k: ['ราคา','price','บาท','เท่าไหร่','ราคากี่บาท','ราคาเท่า','รีพอร','ลด','ของถูก','ของแพง'], a: 'ช่วงราคา:\\n◾ ฿280-500 (เสื้อเบา, ชุดเดรสลายดอกไม้)\\n◾ ฿500-750 (เสื้อ, hoodie)\\n◾ ฿750-990 (sweater/cardigan)\\n◾ ฿1000+ (set premium)\\nมีโปรโมชั่นลด 10-15% สำหรับซื้อเยอะค่ะ!'},
            {k: ['ขายดี','ยอดนิยม','best','top','อันดับ1','อันดับหนึ่ง','นิยม','ฮิต'], a: 'สินค้าขายดี:\\n🥇 ชุดเดรสสไตล์เกาหลี ฿350 ⭐⭐⭐⭐⭐\\n🥈 ชุดเซ็ตไหมพรมละมุน ฿420 ⭐⭐⭐⭐⭐\\n🥉 ชุดเดรสโบว์ชมพู ฿490 ⭐⭐⭐⭐⭐\\n💗 ชุดเซ็ตคุณหนูโบว์หวาน ฿750 ⭐⭐⭐⭐⭐\\n❤️ ชุดเดรสสีแดงผูกคอ ฿399 ⭐⭐⭐⭐⭐\\n💕 เดรสสีแดงสายเดี่ยวเว้าหน้า ฿650 ⭐⭐⭐⭐⭐\\nผู้คนซื้อมากมายทุกวันค่ะ!'},
            {k: ['ธีม','สี','สีไหน','เลือกสี','สีอะไร'], a: 'ธีมสี:\\n🤍 ขาว — ปราชีญ, สะอาด, ดูสดใส\\n💗 ชมพู — หวาน, น่ารัก, สดใส\\n❤️ แดง — หรู, โดดเด่น, ดูสง่า\\nเลือกตามใจชอบได้ค่ะ!'},
            {k: ['ไซส์','size','เบอร์','ขนาด','ไซส์เท่าไหร่','ไซส์อะไร','ตรวจไซส์'], a: 'ไซส์:\\n🔹 XS — อก 32", เอว 25"\\n🔹 S — อก 34", เอว 27"\\n🔹 M — อก 36", เอว 29"\\n🔹 L — อก 38", เอว 31"\\n🔹 XL — อก 40", เอว 33"\\n🔹 XXL — อก 42", เอว 35"\\nเลือกไซส์ตรงตามเบอร์ของคุณนะค่ะ!'},
            {k: ['วัสดุ','ผ้า','fabric','ผ้าเนื้อ','คณภาพผ้า','ดี','คุณภาพ'], a: 'วัสดุ:\\n🧵 Cotton 100% — ใส่สบาย, ระบายอากาศดี, ไม่บึง\\n🧵 Cotton Blend — ยืด, ทนทาน, ปนพลิเอ\\n🧵 Linen — เย็นสบาย, สง่า, เหมาะสำหรับฤดูร้อน\\n🧵 Wool — อบอุ่น, พรีเมี่ยม, เหมาะสำหรับฤดูหนาว\\nผ้าคุณภาพดีทั้งหมด!'},
            {k: ['โปรโมชั่น','ลด','ส่วนลด','sale','ดิสเค้าท์','ลดราคา','ส่วนลดพิเศษ'], a: 'โปรโมชั่นปัจจุบัน:\\n💝 ซื้อ 3 ชิ้น ลด 10%\\n💝 ซื้อ 5 ชิ้น ลด 15%\\n💝 ซื้อเกิน ฿1,500 ฟรีค่าส่ง\\n💝 สมาชิกใหม่ ลด 5% (สมัครฟรี!)\\nลดเยอะมากค่ะ!'},
            {k: ['ชำระ','payment','จ่าย','วิธีจ่าย','จ่ายเงินยังไง','วิธีการชำระ','ชำระเงิน'], a: 'วิธีชำระเงิน:\\n💳 โอนธนาคาร (ทุกธนาคาร)\\n💳 บัตรเครดิต/เดบิต\\n💳 TrueMoney\\n💳 Promptpay\\n💳 COD (ส่งคืนเมื่อได้) - ฿20\\nเลือกวิธีไหนก็ได้ค่ะ!'},
            {k: ['ส่ง','ขนส่ง','delivery','จัดส่ง','ส่งไปไหน','ส่งเร็วไหม','ส่งกี่วัน'], a: 'จัดส่ง:\\n📦 กรุงเทพ: 2-3 วัน (฿50)\\n📦 ต่างจังหวัด: 3-5 วัน (฿100-150)\\n📦 ฟรีส่งเมื่อซื้อ ≥ ฿1,500\\n📦 Express: 1 วัน +฿100\\nทั้งหมดมี tracking number ค่ะ!'},
            {k: ['คืน','เปลี่ยน','return','refund','คืนเงิน','ขอเปลี่ยน','ขอคืน','refund','ไม่ใจ'], a: 'นโยบายคืน/เปลี่ยน:\\n✅ ภายใน 7 วัน นับจากได้รับสินค้า\\n✅ สินค้ายังไม่ใช้, ยังสมบูรณ์\\n✅ มีฉลากและกล่องเดิมครบ\\n✅ ติดต่อแอดมินก่อนส่งกลับ\\n✅ ส่งกลับแบบ COD ค่อนข้างค่ะ\\nเราเข้าใจนะค่ะ!'},
            {k: ['ติดต่อ','แอดมิน','line','เบอร์','contact','เบอร์โทร','อีเมล','email','อยากติดต่อ','line id','ยาวดว่า'], a: 'ติดต่อเรา:\\n📧 Email: 66202040030@ptl.ac.th\\n📱 เบอร์: +66 63897671\\n⏰ เวลาทำการ: จันทร์-ศุกร์ 9:00-18:00\\n💬 Line: @swgshop (ตอบเร็วสุด!)\\nติดต่อได้เลยค่ะ!'},
            {k: ['คุณภาพ','quality','ดี','ทนทาน','นาน','ไม่เสีย'], a: 'มาตรฐานคุณภาพ:\\n✨ เลือกวัสดุดี จากผู้ผลิตที่เชื่อถือ\\n✨ ตัดเย็บมาตรฐาน ไม่เสีย\\n✨ ตรวจสอบ QC เข้มงวด ก่อนจัดส่ง\\n✨ รับประกันความพึงพอใจ ถ้าไม่พอใจมีการคืน\\nคุณภาพดีเป็นสัญญา!'},
            {k: ['ของขวัญ','แพ็ก','gift','ของขวัญ','แพคขวัญ','ห่อของขวัญ','บรรจุภัณฑ์'], a: 'บริการพิเศษ:\\n🎁 ห่อของขวัญฟรี (ขอบอกล่วงหน้า)\\n🎁 ซื้อ 2+ ลด 10% พิเศษ\\n🎁 ติดโปรโมชั่น + การ์ดฟรี\\n🎁 แนะนำสินค้าให้ตรงใจ\\nเหมาะสำหรับของขวัญค่ะ!'},
            {k: ['สินค้า','product','ของ','มีอะไร','มีบ้าง'], a: 'สินค้าในร้านเรา:\\n👗 ชุดเซ็ต: ชุดเซ็ตสไตล์หลากหลาย ราคา 350-1190 บาท\\n👗 เดรส: ชุดเดรสลายต่างๆ ราคา 350-590 บาท\\n\\n✨ สินค้าทั้งหมดมี:\\n🔹 ไซส์ XS-XXL\\n🔹 คุณภาพผ้าดี 100%\\n🔹 ลายและสีหลากหลาย\\n🔹 ราคาสุดคุ้ม\\n\\nมาดูสินค้าเพิ่มเติมได้ที่หน้าคอลเลคชันนะคะ!'},
            {k: ['ช่วยหน่อย','ไม่เข้าใจ','สอบถาม','อยากรู้','คิดว่า','ขึ้นใจ','มีปัญหา','งง','สงสัย'], a: 'ฉันช่วยได้ค่ะ! 😊\\nถามอะไรก็ได้เกี่ยวกับ:\\n◾ สินค้า (ประเภท/สี/ไซส์/ราคา)\\n◾ จัดส่งและชำระเงิน\\n◾ นโยบายคืน/เปลี่ยน\\n◾ วิธีติดต่อ\\nพิมพ์คำถามแบบเฉพาะเจาะจงหน่อยค่ะ!'}
        ];

        for (const item of faq) {
            for (const kw of item.k) {
                if (message.includes(kw)) {
                    // Add product action buttons for specific queries
                    let buttons = null;
                    let products = null;
                    
                    if (kw === 'หน้าแรก' || kw === 'แนะนำ' || kw === 'featured' || kw === 'recommended') {
                        products = this.products.filter(p => p.featured === true);
                        buttons = [
                            { label: '🏠 ไปหน้าแรก', action: () => window.location.href = 'index.html' }
                        ];
                    } else if (message.includes('ชุด') || message.includes('ชุดเซ็ต') || message.includes('เซ็ต') || message.includes('set')) {
                        // ดึงข้อมูลจากหน้า collection
                        const collectionProducts = await this.fetchProductsFromPage('collection');
                        if (collectionProducts.length > 0) {
                            products = collectionProducts.slice(0, 4);
                        }
                        buttons = [
                            { label: '👗 ดูทั้งหมด', action: () => window.location.href = 'collection.html' }
                        ];
                    } else if (message.includes('สินค้า') || message.includes('มีอะไร') || message.includes('ของ')) {
                        // ดึงข้อมูลจากหน้า best-seller
                        const bestsellerProducts = await this.fetchProductsFromPage('best-seller');
                        if (bestsellerProducts.length > 0) {
                            products = bestsellerProducts.slice(0, 3);
                        }
                        buttons = [
                            { label: '🛍️ ไปร้าน', action: () => window.location.href = 'collection.html' }
                        ];
                    } else if (message.includes('ราคา') || message.includes('price') || message.includes('บาท')) {
                        buttons = [
                            { label: '🛍️ เลือกซื้อ', action: () => window.location.href = 'collection.html' }
                        ];
                    } else if (message.includes('ขายดี') || message.includes('ยอดนิยม') || message.includes('best')) {
                        // ดึงข้อมูลจากหน้า best-seller
                        const bestsellerProducts = await this.fetchProductsFromPage('best-seller');
                        if (bestsellerProducts.length > 0) {
                            products = bestsellerProducts.slice(0, 4);
                        }
                        buttons = [
                            { label: '⭐ ดูสินค้าขายดี', action: () => window.location.href = 'best-seller.html' }
                        ];
                    } else if (message.includes('ขาว') || message.includes('white')) {
                        buttons = [
                            { label: '⚪ ดูธีมสีขาว', action: () => window.location.href = 'collection.html#white' }
                        ];
                    } else if (message.includes('ชมพู') || message.includes('pink')) {
                        buttons = [
                            { label: '💗 ดูธีมสีชมพู', action: () => window.location.href = 'collection.html#pink' }
                        ];
                    } else if (message.includes('แดง') || message.includes('red')) {
                        buttons = [
                            { label: '❤️ ดูธีมสีแดง', action: () => window.location.href = 'collection.html#red' }
                        ];
                    } else if (message.includes('ติดต่อ') || message.includes('contact')) {
                        buttons = [
                            { label: '📞 ติดต่อเรา', action: () => window.location.href = 'contact.html' }
                        ];
                    }
                    
                    // Add "Back to Menu" button for all FAQ responses
                    if (!buttons) buttons = [];
                    buttons.push({ label: '⬅️ กลับไปเมนูหลัก', action: () => { this.clearHistory(); } });
                    
                    this.addBotMessage(item.a, true, buttons, products);
                    return;
                }
            }
        }

        // fallback with helpful message
        this.addBotMessage('ขอโทษค่ะ ยังไม่แน่ใจความต้องการของคุณ 😅\\nช่วยพิมพ์ชัดเจนหน่อยค่ะ เช่น:\\n\\n🛍️ สินค้า: "เสื้อ", "เดรส", "สไตล์", "ราคา"\\n💳 ชำระ: "จ่ายยังไง", "ส่งเท่าไหร่"\\n🔄 คืน: "คืนได้ไหม", "นโยบายคืน"\\n📞 ติดต่อ: "เบอร์", "line", "email"\\n💬 หรือพูดตามสบายๆ ฉันจะช่วย!', true);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// เริ่มต้นแชทบอท
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new Chatbot();
});

// Handle quantity selection and add to cart
handleQuantitySelection(quantity) 
{
    if (!this.pendingProduct || !this.selectedSize) return;

    const prod = this.pendingProduct;
    const size = this.selectedSize;

    this.pendingProduct = null;
    this.selectedSize = null;

    const added = this.addProductToCart(prod, size, quantity);

    if (added) {
        const confirmMsg = `✅ ได้เลยค่ะ! เพิ่ม "${prod.name}" (ไซส์ ${size}) ${quantity} ชิ้น ลงตะกร้าแล้ว

โอเคค่ะ สั่งซื้อเรียบร้อยแล้ว 🎉
📦 กรุณาพิมพ์ที่อยู่สำหรับจัดส่งสินค้าค่ะ`;

        const buttons = [
            { label: '🛒 ดูตะกร้า', action: () => window.location.href = 'cart-page.html' },
            { label: '🛍️ เลือกเพิ่มเติม', action: () => window.location.href = 'collection.html' }
        ];

        this.addBotMessage(confirmMsg, true, buttons, null);

        // 🔥 เพิ่มส่วนนี้เพื่อรอรับที่อยู่
        this.waitingForAddress = true;

    } else {
        this.addBotMessage('ขอโทษค่ะ เกิดข้อผิดพลาด ขอลองใหม่อีกครั้งได้ไหมคะ?', true);
    }
}

