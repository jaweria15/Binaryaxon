// Centralized Layout Loader for Product Pages

const sharedHeader = `
    <header class="fixed top-0 w-full z-50 transition-all duration-300" x-data="{ scrolled: false }" @scroll.window="scrolled = (window.pageYOffset > 20)">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center transition-all duration-300" 
             :class="scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-3' : 'py-6'">
            <a href="../index.html#ProductSection" class="flex items-center gap-3 group">
                <div class="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group-hover:bg-[#635091] group-hover:border-[#635091] transition-all duration-300 shadow-lg">
                    <i class="fas fa-arrow-left text-white group-hover:-translate-x-1 transition-transform"></i>
                </div>
                <div class="flex flex-col text-left">
                    <span class="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Navigation</span>
                    <span class="text-xs font-bold tracking-widest uppercase text-white group-hover:text-[#635091] transition-colors">Back to Products</span>
                </div>
            </a>
            <img src="../assets/images/Binary_Axon_logo_2307.webp" alt="Binary Axon" class="nav-logo-img opacity-80 hover:opacity-100 transition-opacity">
        </div>
    </header>
`;

const sharedFooterAndModals = `
    <footer class="py-12 border-t border-white/5 bg-[#050505]">
        <div class="max-w-7xl mx-auto px-6 text-center">
            <img src="../assets/images/Binary_Axon_logo_2307.webp" alt="Binary Axon" class="nav-logo-img mx-auto mb-6 opacity-50">
            <p class="text-gray-500 text-sm">&copy; 2020 - 2026 Binary Axon. All Rights Reserved.</p>
        </div>
    </footer>

    <!-- Demo Request Modal -->
    <div x-show="showDemoModal" 
         class="fixed inset-0 z-[100] flex items-center justify-center p-4"
         x-transition:enter="transition ease-out duration-300"
         x-transition:enter-start="opacity-0 scale-90"
         x-transition:enter-end="opacity-100 scale-100"
         x-transition:leave="transition ease-in duration-200"
         x-transition:leave-start="opacity-100 scale-100"
         x-transition:leave-end="opacity-0 scale-90"
         style="display: none;">
        
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="showDemoModal = false"></div>

        <!-- Modal Content -->
        <div class="relative bg-[#0D0D0E] border border-white/10 p-8 rounded-[2rem] max-w-lg w-full shadow-2xl overflow-hidden group">
            <!-- Glow Effect -->
            <div class="absolute -top-24 -right-24 w-48 h-48 bg-[#635091] rounded-full opacity-20 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            
            <div class="relative z-10">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <h2 class="text-3xl font-bold text-white tracking-tighter">Request Demo</h2>
                        <p class="text-[#FFC132] font-mono text-xs uppercase tracking-widest mt-1" x-text="demoProductName"></p>
                    </div>
                    <button @click="showDemoModal = false" class="text-gray-500 hover:text-white transition-colors">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>

                <form @submit.prevent="submitDemoRequest($el)" class="space-y-4">
                    <input type="hidden" name="productName" :value="demoProductName">
                    
                    <div>
                        <label class="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Your Name</label>
                        <input type="text" name="name" required
                               class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#635091] transition-colors">
                    </div>

                    <div>
                        <label class="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Email Address *</label>
                        <input type="email" name="email" required
                               class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#635091] transition-colors">
                    </div>

                    <div>
                        <label class="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Phone Number (Optional)</label>
                        <input type="tel" name="phone"
                               class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#635091] transition-colors">
                    </div>

                    <div>
                        <label class="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Message/Requirements (Optional)</label>
                        <textarea name="description" rows="3"
                                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#635091] transition-colors"></textarea>
                    </div>

                    <button type="submit" class="btn w-full uppercase tracking-wider flex items-center justify-center gap-2 font-bold" :disabled="submitting">
                        <span class="flex items-center justify-center gap-2">
                            <span x-text="submitting ? 'Sending...' : 'Submit Request'"></span>
                            <i class="fas fa-paper-plane text-xs" x-show="!submitting"></i>
                            <i class="fas fa-circle-notch fa-spin text-xs" x-show="submitting"></i>
                        </span>
                    </button>
                </form>

                <!-- Success Message -->
                <div x-show="success" x-transition 
                     class="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-center text-sm">
                    <i class="fas fa-check-circle mr-2"></i> Your request has been sent successfully!
                </div>
            </div>
        </div>
    </div>

    <!-- Lightbox Modal -->
    <div x-show="showLightbox" 
         class="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
         x-transition
         style="display: none;"
         @keydown.escape.window="showLightbox = false">
        <button @click="showLightbox = false" class="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-50">
            <i class="fas fa-times text-3xl"></i>
        </button>
        <div class="absolute inset-0" @click="showLightbox = false"></div>
        <div class="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center p-2 z-10">
            <img :src="lightboxImg" class="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-white/10" alt="Fullscreen View">
        </div>
    </div>
`;

function generateHeroHTML(product) {
    // Generate stats HTML
    let statsHTML = '';
    if (product.stats && product.stats.length > 0) {
        statsHTML = `<div class="grid grid-cols-2 gap-8 mb-12">`;
        product.stats.forEach(stat => {
            statsHTML += `
                <div class="p-6 glass-panel border-l-4" style="border-left-color: ${stat.borderColor}">
                    <h3 class="text-3xl font-bold mb-1">${stat.value}</h3>
                    <p class="text-xs text-gray-500 uppercase tracking-widest">${stat.label}</p>
                </div>
            `;
        });
        statsHTML += `</div>`;
    }

    // Generate features checklist HTML (if any, like ERP)
    let featuresHTML = '';
    if (product.features && product.features.length > 0) {
        featuresHTML = `<div class="grid grid-cols-2 gap-4 mb-8 text-sm font-mono text-gray-300">`;
        product.features.forEach(feat => {
            featuresHTML += `
                <div class="flex items-center gap-2">
                    <i class="${feat.icon}"></i>
                    <span>${feat.text}</span>
                </div>
            `;
        });
        featuresHTML += `</div>`;
    }

    // Generate buttons HTML
    let buttonsHTML = '<div class="flex gap-4 items-center">';
    if (product.buttons && product.buttons.length > 0) {
        product.buttons.forEach(btn => {
            if (btn.action === 'demo') {
                buttonsHTML += `
                    <button @click="showDemoModal = true" class="btn uppercase">
                        <span>${btn.text}</span>
                    </button>
                `;
            } else if (btn.action === 'link') {
                buttonsHTML += `
                    <button onclick="window.open('${btn.url}', '_blank')" class="btn uppercase">
                        <span>${btn.text}</span>
                    </button>
                `;
            } else if (btn.action === 'none') {
                buttonsHTML += `
                    <button class="btn uppercase">
                        <span>${btn.text}</span>
                    </button>
                `;
            } else if (btn.action === 'dropdown') {
                let dropdownLinksHTML = '';
                btn.links.forEach(link => {
                    dropdownLinksHTML += `
                        <a href="${link.url}" target="_blank" class="block px-6 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-3">
                            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span>${link.name}</span>
                        </a>
                    `;
                });
                buttonsHTML += `
                    <div class="relative inline-block text-left" x-data="{ openDropdown: false }" @click.away="openDropdown = false">
                        <button @click="openDropdown = !openDropdown" class="btn uppercase inline-flex items-center gap-2">
                            <span>
                                <span>${btn.text}</span>
                                <i class="fas fa-chevron-down text-xs transition-transform duration-300" :class="openDropdown ? 'rotate-180' : ''"></i>
                            </span>
                        </button>
                        <div x-show="openDropdown" 
                             x-transition:enter="transition ease-out duration-200"
                             x-transition:enter-start="opacity-0 translate-y-2"
                             x-transition:enter-end="opacity-100 translate-y-0"
                             x-transition:leave="transition ease-in duration-150"
                             x-transition:leave-start="opacity-100 translate-y-0"
                             x-transition:leave-end="opacity-0 translate-y-2"
                             class="absolute left-0 mt-2 w-64 bg-[#0D0D0E]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-30 py-2 overflow-hidden"
                             style="display: none;">
                            ${dropdownLinksHTML}
                            <div class="border-t border-white/5 my-1"></div>
                            <div class="px-6 py-2 text-[10px] text-gray-500 font-mono uppercase tracking-widest flex items-center gap-2">
                                <i class="fas fa-clock text-xs"></i>
                                <span>More Links Coming Soon</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
    }
    buttonsHTML += '</div>';

    // Generate screenshot thumbnails HTML
    let thumbnailsHTML = '';
    if (product.screenshots && product.screenshots.length > 0) {
        thumbnailsHTML = `
            <div class="mt-20 mb-12">
                <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
                    <span class="w-8 h-px bg-[#FFC132]"></span>
                    System Screenshots
                </h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 screenshot-grid">
        `;
        product.screenshots.forEach((src, idx) => {
            thumbnailsHTML += `
                <div @click="activeImg = '${src}'" 
                     class="glass-panel p-2 cursor-pointer transition-all border"
                     :class="activeImg === '${src}' ? 'border-[#FFC132] bg-white/10' : 'border-transparent hover:border-white/10'">
                    <img src="${src}" class="rounded-xl w-full h-32 object-cover" alt="${product.name} Screenshot ${idx + 1}">
                </div>
            `;
        });
        thumbnailsHTML += `
                </div>
            </div>
        `;
    }

    return `
        <div class="max-w-7xl mx-auto px-6 w-full">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div>
                    <span style="color: ${product.categoryColor}" class="font-mono tracking-[0.3em] uppercase text-xs mb-4 block">${product.category}</span>
                    <h1 class="text-6xl font-bold tracking-tighter mb-6 leading-tight">
                        ${product.name} <br><span class="accent-gradient">${product.subName}</span>
                    </h1>
                    <p class="text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">${product.description}</p>
                    
                    ${featuresHTML}
                    ${statsHTML}
                    ${buttonsHTML}
                </div>

                <!-- Main Display Image -->
                <div class="glass-panel p-4 overflow-hidden relative group cursor-zoom-in w-full" @click="lightboxImg = activeImg; showLightbox = true">
                    <div class="absolute inset-4 rounded-[1.5rem] bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <div class="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                            <i class="fas fa-search-plus text-white text-xl"></i>
                        </div>
                    </div>
                    <img :src="activeImg" class="rounded-[1.5rem] w-full shadow-2xl transition-all duration-500" alt="${product.name} Preview">
                </div>
            </div>

            ${thumbnailsHTML}
        </div>
    `;
}

// Perform layout injection synchronously
(function() {
    const heroEl = document.getElementById('shared-product-hero');
    if (!heroEl) return;
    
    const productId = heroEl.getAttribute('data-product-id');
    const data = typeof productsData !== 'undefined' ? productsData : (window.productsData || null);
    if (!productId || !data || !data[productId]) return;
    
    const product = data[productId];

    // 1. Inject Styles
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        .accent-gradient {
            background: linear-gradient(135deg, ${product.colors.gradientStart}, ${product.colors.gradientEnd}) !important;
            -webkit-background-clip: text !important;
            background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
        }
    `;
    document.head.appendChild(styleTag);

    // 2. Inject Elements
    document.getElementById('shared-header').innerHTML = sharedHeader;
    document.getElementById('shared-footer-and-modals').innerHTML = sharedFooterAndModals;
    heroEl.innerHTML = generateHeroHTML(product);
})();
