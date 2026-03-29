window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const heroLogo = document.getElementById('heroLogo');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
        header.classList.add('scrolled');
        heroLogo.classList.add('fade-out');
    } else {
        header.classList.remove('scrolled');
        heroLogo.classList.remove('fade-out');
    }
});

(function() {
    var hamburger = document.getElementById('navHamburger');
    var navLinks  = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });
})();
const section = document.getElementById('stackSection');
const cards = document.querySelectorAll('.stack-card');

const bgColors = [
    "linear-gradient(135deg,#33395D,#1c1f33)",
    "linear-gradient(135deg,#7052A5,#3c2c75)",
    "linear-gradient(135deg,#006400,#013220)",
    "linear-gradient(135deg,#8B4513,#3e1f0b)"
];

let current = 0;

function rotateCards() {

    cards.forEach(card => {
        card.classList.remove('active','next','prev','hidden');
    });

    const total = cards.length;

    cards[current].classList.add('active');
    cards[(current + 1) % total].classList.add('next');
    cards[(current - 1 + total) % total].classList.add('prev');

    for (let i = 0; i < total; i++) {
        if (
            i !== current &&
            i !== (current + 1) % total &&
            i !== (current - 1 + total) % total
        ) {
            cards[i].classList.add('hidden');
        }
    }

    section.style.background = bgColors[current];

    current = (current + 1) % total;
}

setInterval(rotateCards, 3000);

function showDetail(serviceId, element) {
    // 1. Remove active class from all cards
    document.querySelectorAll('.service-selector-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // 2. Add active class to clicked card
    element.classList.add('active');

    // 3. Hide all content sections
    document.querySelectorAll('.detail-content').forEach(content => {
        content.classList.remove('active');
    });

    // 4. Show the specific content
    const activeContent = document.getElementById('content-' + serviceId);
    if(activeContent) {
        activeContent.classList.add('active');
    }

}

function scrollToContact() {
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
}



/* ========== WHY CHOOSE US — Count-up animation ========== */
(function() {
    var section = document.getElementById("WhyChooseUs");
    if (!section) return;

    var numbers = section.querySelectorAll(".why-choose-number");
    var done = false;

    function animateValue(el, end, duration) {
        var start = 0;
        var startTime = null;
        end = parseInt(end, 10);
        if (end > 100) duration = Math.min(duration, 2200);

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var easeOut = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(start + (end - start) * easeOut);
            el.textContent = current;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    function runCounters() {
        if (done) return;
        done = true;
        numbers.forEach(function(el) {
            var target = el.getAttribute("data-target");
            if (!target) return;
            animateValue(el, target, 1800);
        });
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) runCounters();
        });
    }, { threshold: 0.25, rootMargin: "0px" });
    observer.observe(section);
})();

/* ========== RADIAL ORBITAL TIMELINE ========== */
(function () {
    var products = [
        {
            id: 1, title: "School Management", date: "2024",
            content: "Complete student records, attendance tracking, fee collection, timetable scheduling & academic performance platform.",
            icon: "fa-graduation-cap", relatedIds: [5, 6], status: "completed", energy: 95,
            bgIcons: ["fa-school","fa-chalkboard","fa-book-open","fa-user-graduate","fa-clipboard","fa-pencil","fa-calculator","fa-bell","fa-award","fa-bus-simple","fa-apple-whole","fa-ruler"]
        },
        {
            id: 2, title: "Restaurant Management", date: "2024",
            content: "Order processing, table booking, kitchen display, menu management & complete dining workflow automation.",
            icon: "fa-utensils", relatedIds: [6, 4], status: "completed", energy: 90,
            bgIcons: ["fa-pizza-slice","fa-wine-glass","fa-concierge-bell","fa-mug-hot","fa-ice-cream","fa-bowl-food","fa-burger","fa-cookie","fa-champagne-glasses","fa-lemon","fa-pepper-hot","fa-drumstick-bite"]
        },
        {
            id: 3, title: "Ecommerce Management", date: "2024",
            content: "Complete online store with AI-powered recommendations, payment integration, multi-vendor support & order tracking.",
            icon: "fa-store", relatedIds: [4, 5], status: "in-progress", energy: 75,
            bgIcons: ["fa-cart-shopping","fa-credit-card","fa-tag","fa-box","fa-truck","fa-barcode","fa-receipt","fa-bag-shopping","fa-gift","fa-percent","fa-globe","fa-heart"]
        },
        {
            id: 4, title: "Inventory Management", date: "2024",
            content: "Smart stock tracking with predictive analytics, supplier management, warehouse control & automated reporting.",
            icon: "fa-boxes-stacked", relatedIds: [2, 3, 6], status: "in-progress", energy: 65,
            bgIcons: ["fa-warehouse","fa-dolly","fa-clipboard-list","fa-truck-ramp-box","fa-database","fa-chart-bar","fa-cubes","fa-layer-group","fa-box-archive","fa-pallet","fa-gears","fa-list-check"]
        },
        {
            id: 5, title: "Account Management", date: "2024",
            content: "Real-time financial management with expense tracking, invoicing, ledger management & automated reconciliation.",
            icon: "fa-chart-pie", relatedIds: [1, 3], status: "completed", energy: 85,
            bgIcons: ["fa-calculator","fa-file-invoice-dollar","fa-coins","fa-money-bill-wave","fa-landmark","fa-chart-line","fa-scale-balanced","fa-wallet","fa-hand-holding-dollar","fa-piggy-bank","fa-sack-dollar","fa-money-check"]
        },
        {
            id: 6, title: "Point of Sale", date: "2024",
            content: "Lightning-fast billing with barcode scanning, multi-branch support, real-time sales analytics & receipt printing.",
            icon: "fa-cash-register", relatedIds: [1, 2, 4], status: "in-progress", energy: 70,
            bgIcons: ["fa-barcode","fa-receipt","fa-credit-card","fa-money-bill","fa-qrcode","fa-print","fa-basket-shopping","fa-coins","fa-mobile-screen","fa-comment-dollar","fa-handshake","fa-shop"]
        }
    ];

    var rotationAngle = 0;
    var autoRotate = true;
    var activeNodeId = null;

    var sectionEl  = document.querySelector(".orbital-section");
    var viewport   = document.getElementById("orbitalViewport");
    var nodesEl    = document.getElementById("orbitalNodes");
    var svgEl      = document.getElementById("orbitalSvg");
    var detailCard = document.getElementById("orbitalDetailCard");
    var hintEl     = document.getElementById("orbitalHint");
    var dynamicBg  = document.getElementById("orbitalDynamicBg");

    var clearBgTimeout = null;

    if (!viewport) return;

    function getRadius() {
        var base = viewport.offsetWidth < 400 ? 140 : 210;
        return activeNodeId ? base + 25 : base;
    }

    /* --- Dynamic Background: gradient + icons (stay until card change or close) --- */
    function setDynamicBackground(product) {
        if (clearBgTimeout) { clearTimeout(clearBgTimeout); clearBgTimeout = null; }
        if (!dynamicBg) return;

        /* Remove old icons immediately so we don't get wiped by a previous timeout */
        dynamicBg.innerHTML = "";
        dynamicBg.className = "orbital-dynamic-bg";
        if (sectionEl) sectionEl.removeAttribute("data-bg-gradient");

        if (!product || !product.bgIcons) return;

        sectionEl.setAttribute("data-bg-gradient", product.id);
        dynamicBg.classList.add("active");

        var count = 18;
        for (var i = 0; i < count; i++) {
            var iconClass = product.bgIcons[i % product.bgIcons.length];
            var el = document.createElement("i");
            el.className = "fas " + iconClass + " orbital-float-icon";
            el.style.left = Math.random() * 94 + 3 + "%";
            el.style.top  = Math.random() * 90 + 5 + "%";
            el.style.fontSize = (22 + Math.random() * 36) + "px";
            el.style.animationDuration = (6 + Math.random() * 8) + "s";
            el.style.animationDelay = (Math.random() * 4) + "s";
            el.style.transform = "rotate(" + (Math.random() * 40 - 20) + "deg)";
            dynamicBg.appendChild(el);
        }
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                var icons = dynamicBg.querySelectorAll(".orbital-float-icon");
                icons.forEach(function(ic) { ic.classList.add("visible"); });
            });
        });
    }

    function clearDynamicBackground() {
        if (!dynamicBg) return;
        if (clearBgTimeout) clearTimeout(clearBgTimeout);
        var icons = dynamicBg.querySelectorAll(".orbital-float-icon");
        icons.forEach(function(ic) { ic.classList.remove("visible"); });
        dynamicBg.classList.remove("active");
        if (sectionEl) sectionEl.removeAttribute("data-bg-gradient");
        clearBgTimeout = setTimeout(function() {
            dynamicBg.innerHTML = "";
            clearBgTimeout = null;
        }, 500);
    }

    function buildNodes() {
        products.forEach(function (p) {
            var node = document.createElement("div");
            node.className = "orbital-node";
            node.dataset.id = p.id;
            node.dataset.status = p.status;

            var eSize = p.energy * 0.5 + 46;
            var energy = document.createElement("div");
            energy.className = "orbital-node-energy";
            energy.style.width = eSize + "px";
            energy.style.height = eSize + "px";
            energy.style.marginLeft = -(eSize / 2) + "px";
            energy.style.marginTop = -(eSize / 2) + "px";

            var dot = document.createElement("div");
            dot.className = "orbital-node-dot";
            dot.innerHTML = '<i class="fas ' + p.icon + '"></i>';

            var label = document.createElement("div");
            label.className = "orbital-node-label";
            label.textContent = p.title;

            node.appendChild(energy);
            node.appendChild(dot);
            node.appendChild(label);

            node.addEventListener("click", function (e) {
                e.stopPropagation();
                toggleNode(p.id);
            });

            nodesEl.appendChild(node);
        });
    }

    function positionNodes() {
        var radius = getRadius();
        var total = products.length;
        var nodes = nodesEl.querySelectorAll(".orbital-node");

        nodes.forEach(function (node, i) {
            var angle = ((i / total) * 360 + rotationAngle) % 360;
            var rad   = (angle * Math.PI) / 180;
            var x     = radius * Math.cos(rad);
            var y     = radius * Math.sin(rad);
            var zIdx  = Math.round(100 + 50 * Math.cos(rad));
            var op    = node.classList.contains("active")
                ? 1
                : Math.max(0.4, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2));

            node.style.transform = "translate(" + x + "px," + y + "px)";
            node.style.zIndex    = node.classList.contains("active") ? 200 : zIdx;
            node.style.opacity   = op;
        });

        drawConnections();
    }

    function drawConnections() {
        while (svgEl.firstChild) svgEl.removeChild(svgEl.firstChild);
        if (!activeNodeId) return;

        var prod = products.find(function (p) { return p.id === activeNodeId; });
        if (!prod) return;

        var cx     = viewport.offsetWidth / 2;
        var cy     = viewport.offsetHeight / 2;
        var radius = getRadius();
        var total  = products.length;

        var ai   = products.findIndex(function (p) { return p.id === activeNodeId; });
        var aAng = ((ai / total) * 360 + rotationAngle) % 360;
        var aRad = (aAng * Math.PI) / 180;
        var ax   = cx + radius * Math.cos(aRad);
        var ay   = cy + radius * Math.sin(aRad);

        prod.relatedIds.forEach(function (rid) {
            var ri = products.findIndex(function (p) { return p.id === rid; });
            if (ri === -1) return;
            var rAng = ((ri / total) * 360 + rotationAngle) % 360;
            var rRad = (rAng * Math.PI) / 180;
            var rx   = cx + radius * Math.cos(rRad);
            var ry   = cy + radius * Math.sin(rRad);

            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", ax);
            line.setAttribute("y1", ay);
            line.setAttribute("x2", rx);
            line.setAttribute("y2", ry);
            line.classList.add("orbital-conn-line");
            svgEl.appendChild(line);
        });
    }

    function toggleNode(id) {
        var nodes = nodesEl.querySelectorAll(".orbital-node");

        if (activeNodeId === id) {
            activeNodeId = null;
            autoRotate = true;
            nodes.forEach(function (n) { n.classList.remove("active", "related"); });
            detailCard.classList.remove("visible");
            detailCard.innerHTML = "";
            while (svgEl.firstChild) svgEl.removeChild(svgEl.firstChild);
            sectionEl.classList.remove("orbit-expanded");
            clearDynamicBackground();
            hintEl.innerHTML = '<i class="fas fa-hand-pointer"></i> Click a node to explore';
            return;
        }

        activeNodeId = id;
        autoRotate = false;

        var idx   = products.findIndex(function (p) { return p.id === id; });
        var total = products.length;
        rotationAngle = 270 - (idx / total) * 360;

        var prod = products.find(function (p) { return p.id === id; });
        nodes.forEach(function (n) {
            var nid = parseInt(n.dataset.id);
            n.classList.remove("active", "related");
            if (nid === id) n.classList.add("active");
            else if (prod.relatedIds.indexOf(nid) !== -1) n.classList.add("related");
        });

        sectionEl.classList.add("orbit-expanded");
        setDynamicBackground(prod);
        showDetail(prod);
        hintEl.innerHTML = '<i class="fas fa-times-circle"></i> Click empty space to close';
        positionNodes();
    }

    function showDetail(p) {
        var statusLabel = p.status === "completed" ? "COMPLETE"
            : p.status === "in-progress" ? "IN PROGRESS" : "PENDING";

        var connHtml = "";
        if (p.relatedIds.length) {
            var btns = p.relatedIds.map(function (rid) {
                var r = products.find(function (x) { return x.id === rid; });
                return '<button class="orbital-connected-btn" data-goto="' + rid + '">'
                    + (r ? r.title : "Node " + rid)
                    + ' <i class="fas fa-arrow-right" style="font-size:8px"></i></button>';
            }).join("");
            connHtml = '<div class="orbital-connected-section">'
                + '<div class="orbital-connected-label"><i class="fas fa-link" style="font-size:10px"></i> Connected Nodes</div>'
                + '<div class="orbital-connected-nodes">' + btns + '</div></div>';
        }

        detailCard.innerHTML =
            '<div class="orbital-card-header">'
            + '<span class="orbital-status-badge ' + p.status + '">' + statusLabel + '</span>'
            + '<span class="orbital-card-date">' + p.date + '</span>'
            + '</div>'
            + '<div class="orbital-card-body">'
            + '<div class="orbital-card-title">' + p.title + '</div>'
            + '<div class="orbital-card-desc">' + p.content + '</div>'
            + '<div class="orbital-energy-section">'
            + '<div class="orbital-energy-header"><span><i class="fas fa-bolt"></i> Energy Level</span><span>' + p.energy + '%</span></div>'
            + '<div class="orbital-energy-bar"><div class="orbital-energy-fill" style="width:' + p.energy + '%"></div></div>'
            + '</div>'
            + connHtml
            + '</div>';

        detailCard.querySelectorAll(".orbital-connected-btn").forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                toggleNode(parseInt(btn.dataset.goto));
            });
        });

        requestAnimationFrame(function () {
            detailCard.classList.add("visible");
        });
    }

    viewport.addEventListener("click", function (e) {
        var isBackground = e.target === viewport
            || e.target.closest(".orbital-center")
            || e.target.classList.contains("orbital-path")
            || e.target.classList.contains("orbital-nodes");
        if (isBackground && activeNodeId) {
            toggleNode(activeNodeId);
        }
    });

    function animate() {
        if (autoRotate) {
            rotationAngle = (rotationAngle + 0.15) % 360;
        }
        positionNodes();
        requestAnimationFrame(animate);
    }

    buildNodes();
    animate();

    window.addEventListener("resize", positionNodes);
})();
function productApp() {
    return {
        activeIndex: 0,
        products: [
            { name: "E-Commerce", color: "#635091", image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500", desc: "Global retail platforms built for speed and conversion." },
            { name: "Restaurant POS", color: "#FFC132", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500", desc: "Synchronized kitchen and floor management for modern dining." },
            { name: "Web Design", color: "#2E4053", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=500", desc: "UI/UX focused digital identities that captivate users." },
            { name: "App Development", color: "#1B4F72", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500", desc: "Native iOS and Android solutions with seamless integration." },
            { name: "School System", color: "#512E5F", image: "https://images.unsplash.com/photo-1523050337458-5bd812eb534c?w=500", desc: "Unified ERP for modern educational institutions." },
            { name: "POS Systems", color: "#784212", image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=500", desc: "High-speed retail processing and inventory automation." }
        ],
        init() { this.animateText(); },
        
        getCardStyle(index) {
            const total = this.products.length;
            // Calculate relative distance from active index
            let diff = index - this.activeIndex;
            
            // Wrap around logic
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            if (diff === 0) {
                // ACTIVE CENTER CARD
                return `z-index: 100; transform: translateX(0) translateZ(200px) scale(1.2); filter: blur(0px); opacity: 1;`;
            } else {
                // BACKGROUND CARDS
                const xPos = diff * 180; // Spread cards horizontally
                const zPos = Math.abs(diff) * -150; // Push further back the further they are from center
                const blurVal = Math.abs(diff) * 4; // Increase blur with distance
                const scaleVal = 1 - (Math.abs(diff) * 0.15); // Shrink with distance
                
                return `
                    z-index: ${50 - Math.abs(diff)}; 
                    transform: translateX(${xPos}px) translateZ(${zPos}px) scale(${scaleVal}); 
                    filter: blur(${blurVal}px); 
                    opacity: 0.4;
                `;
            }
        },

        animateText() {
            const el = document.getElementById('product-desc');
            const text = this.products[this.activeIndex].desc;
            el.innerHTML = text.split(' ').map(w => `<span class="inline-block opacity-0 translate-y-2 blur-sm">${w}&nbsp;</span>`).join('');
            gsap.to('#product-desc span', {
                opacity: 1, 
                y: 0, 
                filter: 'blur(0px)', 
                stagger: 0.03, 
                duration: 0.5, 
                ease: "power2.out"
            });
        }
    }
}

// Add this to main.js to make the 'About Us' section animate
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".reveal-card", {
        scrollTrigger: {
            trigger: "#Aboutus",
            start: "top 80%",
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
    });
    
    gsap.to(["#about-sub", "#about-title", "#about-line"], {
        scrollTrigger: {
            trigger: "#Aboutus",
            start: "top 80%",
        },
        opacity: 1,
        duration: 1,
        stagger: 0.1
    });
});



// Add this to your main.js or index.html



// Replace your existing initTechScene function with this:
// const initSoftwareBackground = () => {
//     const container = document.getElementById('tech-canvas-container');
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x050505, 1); // Solid dark background
//     container.appendChild(renderer.domElement);

//     // --- SOFTWARE COMPANY VISUALS ---
    
//     // 1. Floating Code Particles (Binary/Matrix Style)
//     const particleCount = 2000;
//     const particlesGeo = new THREE.BufferGeometry();
//     const particlesPos = new Float32Array(particleCount * 3);
    
//     for (let i = 0; i < particleCount; i++) {
//         particlesPos[i*3] = (Math.random() - 0.5) * 30;
//         particlesPos[i*3+1] = (Math.random() - 0.5) * 20;
//         particlesPos[i*3+2] = (Math.random() - 0.5) * 30 - 10;
//     }
    
//     particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlesPos, 3));
    
//     // Create two types of particles
//     const binaryParticles = new THREE.Points(
//         particlesGeo,
//         new THREE.PointsMaterial({ 
//             color: 0x635091, 
//             size: 0.1,
//             transparent: true,
//             opacity: 0.6
//         })
//     );
//     scene.add(binaryParticles);

//     // 2. Floating Code Snippets (using small cubes to represent code blocks)
//     const codeBlocksGeo = new THREE.BoxGeometry(0.3, 0.1, 0.2);
//     const codeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFC132, emissive: 0x221100 });
    
//     for (let i = 0; i < 50; i++) {
//         const block = new THREE.Mesh(codeBlocksGeo, codeMaterial);
//         block.position.set(
//             (Math.random() - 0.5) * 25,
//             (Math.random() - 0.5) * 15,
//             (Math.random() - 0.5) * 25 - 5
//         );
//         block.rotation.x = Math.random() * Math.PI;
//         block.rotation.y = Math.random() * Math.PI;
//         scene.add(block);
//     }

//     // 3. Central "Axon" Structure - Neural Network Style
//     const axonGroup = new THREE.Group();
    
//     // Central sphere (the "brain")
//     const coreGeo = new THREE.IcosahedronGeometry(1.2, 2);
//     const coreMat = new THREE.MeshPhongMaterial({
//         color: 0x635091,
//         emissive: 0x221144,
//         wireframe: true,
//         transparent: true,
//         opacity: 0.9
//     });
//     const core = new THREE.Mesh(coreGeo, coreMat);
//     axonGroup.add(core);

//     // Connection lines (neural network style)
//     const connections = [];
//     for (let i = 0; i < 8; i++) {
//         const points = [];
//         points.push(new THREE.Vector3(0, 0, 0));
//         points.push(new THREE.Vector3(
//             (Math.random() - 0.5) * 5,
//             (Math.random() - 0.5) * 5,
//             (Math.random() - 0.5) * 5
//         ));
        
//         const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
//         const lineMat = new THREE.LineBasicMaterial({ color: 0x635091, transparent: true, opacity: 0.3 });
//         const line = new THREE.Line(lineGeo, lineMat);
//         axonGroup.add(line);
//         connections.push(line);
//     }

//     // Floating binary digits (0s and 1s as text sprites)
//     const canvas = document.createElement('canvas');
//     canvas.width = 64;
//     canvas.height = 64;
//     const ctx = canvas.getContext('2d');
//     ctx.fillStyle = '#FFC132';
//     ctx.font = 'Bold 40px "Fira Code"';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
    
//     const textures = ['0', '1', '</>', '{ }', '()', '[]'];
//     for (let i = 0; i < 30; i++) {
//         ctx.clearRect(0, 0, 64, 64);
//         ctx.fillStyle = i % 2 === 0 ? '#635091' : '#FFC132';
//         ctx.fillText(textures[i % textures.length], 32, 32);
        
//         const texture = new THREE.CanvasTexture(canvas);
//         const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
//         const sprite = new THREE.Sprite(material);
        
//         sprite.position.set(
//             (Math.random() - 0.5) * 15,
//             (Math.random() - 0.5) * 10,
//             (Math.random() - 0.5) * 15 - 5
//         );
//         sprite.scale.set(0.5, 0.5, 0.5);
//         scene.add(sprite);
//     }

//     scene.add(axonGroup);

//     // 4. Grid floor (tech foundation)
//     const gridHelper = new THREE.GridHelper(40, 40, 0x635091, 0x333333);
//     gridHelper.position.y = -3;
//     gridHelper.position.z = -5;
//     scene.add(gridHelper);

//     // Lighting
//     const light1 = new THREE.PointLight(0x635091, 1, 30);
//     light1.position.set(2, 3, 4);
//     scene.add(light1);
    
//     const light2 = new THREE.PointLight(0xFFC132, 0.5, 30);
//     light2.position.set(-2, -1, 3);
//     scene.add(light2);
    
//     const ambientLight = new THREE.AmbientLight(0x404040);
//     scene.add(ambientLight);

//     camera.position.set(0, 2, 12);
//     camera.lookAt(0, 0, -2);

//     // Animation
//     const animate = () => {
//         requestAnimationFrame(animate);
        
//         // Rotate central group slowly
//         axonGroup.rotation.y += 0.002;
//         axonGroup.rotation.x += 0.001;
        
//         // Float particles
//         binaryParticles.rotation.y += 0.0005;
        
//         // Pulse core
//         const scale = 1 + Math.sin(Date.now() * 0.003) * 0.1;
//         core.scale.set(scale, scale, scale);
        
//         renderer.render(scene, camera);
//     };

//     window.addEventListener('resize', () => {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//     });

//     animate();
// };

// Initialize the new background
// initSoftwareBackground();


function enhancedProductApp() {
    return {
        activeIndex: 0,
        mouseX: 50,
        mouseY: 50,
        autoSwitchTimer: null,
        isAnimating: false,
        products: [
            { 
                name: "E-Commerce Platform", 
                category: "RETAIL",
                color: "#635091", 
                image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500",
                shortDesc: "AI-powered online store with smart recommendations",
                desc: "Global retail platforms built for speed and conversion with AI-powered recommendations, multi-payment integration, and real-time analytics.",
                icon: '<i class="fas fa-store"></i>',
                features: [
                    { icon: "fas fa-robot", text: "AI Recommendations" },
                    { icon: "fas fa-credit-card", text: "Multi-payment" },
                    { icon: "fas fa-truck", text: "Order Tracking" },
                    { icon: "fas fa-chart-line", text: "Analytics" }
                ],
                technologies: [
                    { icon: "fab fa-react", name: "React" },
                    { icon: "fab fa-node-js", name: "Node.js" },
                    { icon: "fas fa-database", name: "MongoDB" },
                    { icon: "fab fa-aws", name: "AWS" }
                ],
                slug: "ecommerce",
                stats: [
                    { value: "10k+", label: "Products" },
                    { value: "5k+", label: "Users" },
                    { value: "99.9%", label: "Uptime" }
                ],
                icons: ["fas fa-search", "fas fa-shopping-cart", "fas fa-heart"]
            },
            { 
                name: "Restaurant POS", 
                category: "HOSPITALITY",
                color: "#FFC132", 
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500",
                shortDesc: "Complete dining workflow automation system",
                desc: "Synchronized kitchen and floor management for modern dining with table booking, kitchen display, and real-time billing.",
                icon: '<i class="fas fa-utensils"></i>',
                features: [
                    { icon: "fas fa-table", text: "Table Management" },
                    { icon: "fas fa-print", text: "Kitchen Display" },
                    { icon: "fas fa-receipt", text: "Billing" },
                    { icon: "fas fa-chart-pie", text: "Reports" }
                ],
                technologies: [
                    { icon: "fab fa-vuejs", name: "Vue.js" },
                    { icon: "fab fa-python", name: "Python" },
                    { icon: "fas fa-database", name: "PostgreSQL" },
                    { icon: "fab fa-docker", name: "Docker" }
                ],
                slug: "restaurant-pos",
                stats: [
                    { value: "500+", label: "Restaurants" },
                    { value: "1M+", label: "Orders" },
                    { value: "24/7", label: "Support" }
                ],
                icons: ["fas fa-utensils", "fas fa-wine-glass", "fas fa-mug-hot"]
            },
            { 
                name: "Web Design Studio", 
                category: "CREATIVE",
                color: "#2E4053", 
                image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=500",
                shortDesc: "Immersive digital experiences & branding",
                desc: "UI/UX focused digital identities that captivate users with responsive design, intuitive interfaces, and conversion-optimized layouts.",
                icon: '<i class="fas fa-paint-brush"></i>',
                features: [
                    { icon: "fas fa-palette", text: "UI/UX Design" },
                    { icon: "fas fa-code", text: "Development" },
                    { icon: "fas fa-mobile-alt", text: "Responsive" },
                    { icon: "fas fa-chart-simple", text: "SEO" }
                ],
                technologies: [
                    { icon: "fab fa-figma", name: "Figma" },
                    { icon: "fab fa-html5", name: "HTML5" },
                    { icon: "fab fa-css3-alt", name: "CSS3" },
                    { icon: "fab fa-js", name: "JavaScript" }
                ],
                slug: "web-design",
                stats: [
                    { value: "200+", label: "Projects" },
                    { value: "50+", label: "Clients" },
                    { value: "15", label: "Awards" }
                ],
                icons: ["fas fa-paint-brush", "fas fa-code", "fas fa-mobile-alt"]
            },
            { 
                name: "Mobile Apps", 
                category: "DEVELOPMENT",
                color: "#1B4F72", 
                image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500",
                shortDesc: "Native iOS and Android solutions",
                desc: "Native iOS and Android solutions with seamless cloud integration, push notifications, and offline capabilities.",
                icon: '<i class="fas fa-mobile-alt"></i>',
                features: [
                    { icon: "fab fa-apple", text: "iOS Native" },
                    { icon: "fab fa-android", text: "Android" },
                    { icon: "fas fa-cloud", text: "Cloud Sync" },
                    { icon: "fas fa-lock", text: "Security" }
                ],
                technologies: [
                    { icon: "fab fa-swift", name: "Swift" },
                    { icon: "fab fa-java", name: "Kotlin" },
                    { icon: "fab fa-react", name: "React Native" },
                    { icon: "fas fa-fire", name: "Firebase" }
                ],
                slug: "mobile-apps",
                stats: [
                    { value: "100k+", label: "Downloads" },
                    { value: "4.8", label: "App Store" },
                    { value: "4.9", label: "Play Store" }
                ],
                icons: ["fab fa-apple", "fab fa-android", "fas fa-cloud"]
            },
            { 
                name: "School System", 
                category: "EDUCATION",
                color: "#512E5F", 
                image: "https://images.unsplash.com/photo-1523050337458-5bd812eb534c?w=500",
                shortDesc: "Complete educational management platform",
                desc: "Unified ERP for modern educational institutions with student portals, attendance tracking, fee management, and academic reporting.",
                icon: '<i class="fas fa-school"></i>',
                features: [
                    { icon: "fas fa-user-graduate", text: "Student Portal" },
                    { icon: "fas fa-chalkboard", text: "Attendance" },
                    { icon: "fas fa-file-alt", text: "Reports" },
                    { icon: "fas fa-calendar", text: "Timetable" }
                ],
                technologies: [
                    { icon: "fab fa-laravel", name: "Laravel" },
                    { icon: "fas fa-database", name: "MySQL" },
                    { icon: "fab fa-bootstrap", name: "Bootstrap" },
                    { icon: "fab fa-php", name: "PHP" }
                ],
                slug: "school-system",
                stats: [
                    { value: "50+", label: "Schools" },
                    { value: "10k+", label: "Students" },
                    { value: "1000+", label: "Teachers" }
                ],
                icons: ["fas fa-user-graduate", "fas fa-book", "fas fa-calculator"]
            },
            { 
                name: "POS Systems", 
                category: "RETAIL",
                color: "#784212", 
                image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=500",
                shortDesc: "Lightning-fast retail processing system",
                desc: "High-speed retail processing and inventory automation with barcode scanning, real-time stock updates, and sales analytics.",
                icon: '<i class="fas fa-cash-register"></i>',
                features: [
                    { icon: "fas fa-barcode", text: "Barcode Scan" },
                    { icon: "fas fa-boxes", text: "Inventory" },
                    { icon: "fas fa-chart-simple", text: "Sales" },
                    { icon: "fas fa-users", text: "Staff" }
                ],
                technologies: [
                    { icon: "fab fa-angular", name: "Angular" },
                    { icon: "fab fa-node-js", name: "Node.js" },
                    { icon: "fas fa-database", name: "Redis" },
                    { icon: "fab fa-aws", name: "AWS" }
                ],
                slug: "pos-retail",
                stats: [
                    { value: "1000+", label: "Stores" },
                    { value: "50k+", label: "Transactions" },
                    { value: "0.5s", label: "Processing" }
                ],
                icons: ["fas fa-barcode", "fas fa-credit-card", "fas fa-receipt"]
            }
        ],
        
        init() {
            this.animateText();
            this.startAutoSwitch();
            
            // Track mouse movement for dynamic background
            document.addEventListener('mousemove', (e) => {
                this.mouseX = (e.clientX / window.innerWidth) * 100;
                this.mouseY = (e.clientY / window.innerHeight) * 100;
            });
            
            // Stop auto-switch when user hovers over cards
            const cards = document.querySelectorAll('.service-card, .product-card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => this.stopAutoSwitch());
                card.addEventListener('mouseleave', () => this.startAutoSwitch());
            });
        },
        
        startAutoSwitch() {
            if (this.autoSwitchTimer) clearInterval(this.autoSwitchTimer);
            
            // Switch to next product every 8 seconds (text animation takes ~5 seconds)
            this.autoSwitchTimer = setInterval(() => {
                if (!this.isAnimating) {
                    this.nextProduct();
                }
            }, 8000);
        },
        
        stopAutoSwitch() {
            if (this.autoSwitchTimer) {
                clearInterval(this.autoSwitchTimer);
                this.autoSwitchTimer = null;
            }
        },
        
        getCardStyle(index) {
            const total = this.products.length;
            let diff = index - this.activeIndex;
            
            // Wrap around logic
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            if (diff === 0) {
                // Active Center Card
                return `
                    z-index: 100; 
                    transform: translateX(0) translateZ(200px) scale(1.2) rotateY(0deg); 
                    filter: blur(0px); 
                    opacity: 1;
                    box-shadow: 0 30px 40px -15px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,193,50,0.3);
                `;
            } else {
                // Side Cards
                const direction = diff > 0 ? 1 : -1;
                const xPos = direction * 220;
                const zPos = Math.abs(diff) * -200;
                const rotateY = direction * -15;
                const blurVal = Math.abs(diff) * 3;
                const scaleVal = 0.8 - (Math.abs(diff) * 0.1);
                
                return `
                    z-index: ${50 - Math.abs(diff)}; 
                    transform: translateX(${xPos}px) translateZ(${zPos}px) rotateY(${rotateY}deg) scale(${scaleVal}); 
                    filter: blur(${blurVal}px); 
                    opacity: ${0.5 - (Math.abs(diff) * 0.1)};
                `;
            }
        },

        animateText() {
            const el = document.getElementById('product-desc');
            if (!el) return;
            
            this.isAnimating = true;
            const text = this.products[this.activeIndex].desc;
            
            // Clear previous content
            el.innerHTML = '';
            
            // Create typing effect
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    el.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    this.isAnimating = false;
                    
                    // Automatically switch to next product after a short delay
                    setTimeout(() => {
                        if (!this.isAnimating && this.autoSwitchTimer) {
                            this.nextProduct();
                        }
                    }, 1500);
                }
            }, 30);
        },

        prevProduct() {
            this.stopAutoSwitch();
            this.activeIndex = (this.activeIndex - 1 + this.products.length) % this.products.length;
            this.animateText();
            this.startAutoSwitch();
        },

        nextProduct() {
            this.stopAutoSwitch();
            this.activeIndex = (this.activeIndex + 1) % this.products.length;
            this.animateText();
            this.startAutoSwitch();
        }
    }
}

function servicesApp() {
    return {
        showAll: false,
        services: [
            { 
                title: 'Web <span class="text-[#FFC132]">Development</span>',
                icon: 'fas fa-code',
                color: '#FFC132',
                image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
                features: ['Frontend & Backend', 'API Integration', 'Database Design', 'Cloud Deployment'],
                description: 'Custom web applications built with modern frameworks like React, Vue, and Node.js.'
            },
            { 
                title: 'Mobile <span class="text-[#635091]">Development</span>',
                icon: 'fas fa-mobile-alt',
                color: '#635091',
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
                features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Deployment'],
                description: 'Native and cross-platform mobile apps with stunning UI and seamless performance.'
            },
            { 
                title: 'Account <span class="text-[#FFC132]">Management</span>',
                icon: 'fas fa-calculator',
                color: '#FFC132',
                image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=800',
                features: ['Ledger Tracking', 'Financial Reports', 'Invoice Generation', 'Tax Compliance'],
                description: 'Comprehensive financial management solutions for businesses of all sizes.'
            },
            { 
                title: 'Web <span class="text-[#635091]">Designing</span>',
                icon: 'fas fa-paint-brush',
                color: '#635091',
                image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800',
                features: ['UI/UX Design', 'Wireframing', 'Prototyping', 'Responsive Design'],
                description: 'Beautiful, user-centered designs that engage visitors and drive conversions.'
            },
            { 
                title: 'Enterprise <span class="text-[#FFC132]">Applications</span>',
                icon: 'fas fa-network-wired',
                color: '#FFC132',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
                features: ['ERP Systems', 'CRM Solutions', 'Workflow Automation', 'Business Intelligence'],
                description: 'Scalable enterprise software to streamline operations and boost productivity.'
            },
            { 
                title: 'Data <span class="text-[#635091]">Warehousing</span>',
                icon: 'fas fa-database',
                color: '#635091',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
                features: ['Big Data Analytics', 'ETL Processes', 'Data Visualization', 'Real-time Reporting'],
                description: 'Transform raw data into actionable insights with our data warehousing solutions.'
            },
            { 
                title: 'Content <span class="text-[#FFC132]">Writing</span>',
                icon: 'fas fa-pen-fancy',
                color: '#FFC132',
                image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800',
                features: ['SEO Content', 'Blog Posts', 'Technical Writing', 'Copywriting'],
                description: 'Engaging, high-quality content that tells your story and connects with your audience.'
            },
            { 
                title: 'Hardware <span class="text-[#635091]">Services</span>',
                icon: 'fas fa-microchip',
                color: '#635091',
                image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800',
                features: ['Server Setup', 'Network Configuration', 'Hardware Maintenance', 'IT Infrastructure'],
                description: 'Reliable hardware solutions and infrastructure support for your business.'
            }
        ],
        
        get visibleServices() {
            return this.showAll ? this.services : this.services.slice(0, 3);
        },
        
        loadMore() {
            this.showAll = true;
            // Smooth scroll to newly visible services
            setTimeout(() => {
                const newServices = document.querySelectorAll('.service-card');
                if (newServices.length > 3) {
                    newServices[3].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        },
        
        showLess() {
            this.showAll = false;
            // Scroll back to services section
            document.getElementById('Services').scrollIntoView({ behavior: 'smooth' });
        },
        
        init() {
            // Add animation delay classes
            this.services.forEach((_, index) => {
                if (index >= 3) {
                    // These will appear when load more is clicked
                }
            });
        }
    }
}

// Add this CSS for animation delays (add to your style.css)
const style = document.createElement('style');
style.textContent = `
    .animation-delay-200 {
        animation-delay: 200ms;
    }
    .animation-delay-400 {
        animation-delay: 400ms;
    }
`;
document.head.appendChild(style);