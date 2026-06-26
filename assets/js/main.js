window.addEventListener('scroll', function () {
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

(function () {
    var hamburger = document.getElementById('navHamburger');
    var navLinks = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });
})();
const section = document.getElementById('stackSection');
const cards = document.querySelectorAll('.stack-card');

if (section && cards.length > 0) {
    const bgColors = [
        "linear-gradient(135deg,#33395D,#1c1f33)",
        "linear-gradient(135deg,#7052A5,#3c2c75)",
        "linear-gradient(135deg,#006400,#013220)",
        "linear-gradient(135deg,#8B4513,#3e1f0b)"
    ];

    let current = 0;

    function rotateCards() {
        cards.forEach(card => {
            card.classList.remove('active', 'next', 'prev', 'hidden');
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
}

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
    if (activeContent) {
        activeContent.classList.add('active');
    }

}

function scrollToContact() {
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
}





/* ========== RADIAL ORBITAL TIMELINE ========== */
(function () {
    var products = [
        {
            id: 1, title: "School Management", date: "2024",
            content: "Complete student records, attendance tracking, fee collection, timetable scheduling & academic performance platform.",
            icon: "graduation-cap", relatedIds: [5, 6], status: "completed", energy: 95,
            bgIcons: ["school", "presentation", "book-open", "graduation-cap", "clipboard", "pencil", "calculator", "bell", "award", "bus", "apple", "ruler"]
        },
        {
            id: 2, title: "Recruitment Portal", date: "2024",
            content: "AI-driven talent acquisition, automated screening, interview scheduling, and end-to-end recruitment lifecycle management.",
            icon: "user-plus", relatedIds: [6, 4], status: "completed", energy: 90,
            bgIcons: ["users", "briefcase", "search", "handshake", "signature", "contact", "user", "calendar-check", "bot", "brain"]
        },
        {
            id: 3, title: "ERP System", date: "2024",
            content: "Unified enterprise planning suite integrating HR, Finance, Supply Chain, and Operations into one powerful ecosystem.",
            icon: "network", relatedIds: [4, 5], status: "completed", energy: 98,
            bgIcons: ["cog", "pie-chart", "warehouse", "truck", "receipt", "shield", "cpu", "database", "users", "network"]
        },
        {
            id: 4, title: "Inventory Management", date: "2024",
            content: "Smart stock tracking with predictive analytics, supplier management, warehouse control & automated reporting.",
            icon: "boxes", relatedIds: [2, 3, 6], status: "in-progress", energy: 65,
            bgIcons: ["warehouse", "package", "clipboard-list", "truck", "database", "bar-chart", "box", "layers", "archive", "box", "cog", "list-checks"]
        },
        {
            id: 5, title: "Account Management", date: "2024",
            content: "Real-time financial management with expense tracking, invoicing, ledger management & automated reconciliation.",
            icon: "pie-chart", relatedIds: [1, 3], status: "completed", energy: 85,
            bgIcons: ["calculator", "receipt", "coins", "banknote", "landmark", "line-chart", "scale", "wallet", "hand-coins", "piggy-bank", "coins", "receipt"]
        },
        {
            id: 6, title: "Point of Sale", date: "2024",
            content: "Lightning-fast billing with barcode scanning, multi-branch support, real-time sales analytics & receipt printing.",
            icon: "banknote", relatedIds: [1, 2, 4], status: "in-progress", energy: 70,
            bgIcons: ["barcode", "receipt", "credit-card", "banknote", "qr-code", "printer", "shopping-basket", "coins", "smartphone", "message-square-plus", "handshake", "store"]
        }
    ];

    var rotationAngle = 0;
    var autoRotate = true;
    var activeNodeId = null;

    var sectionEl = document.querySelector(".orbital-section");
    var viewport = document.getElementById("orbitalViewport");
    var nodesEl = document.getElementById("orbitalNodes");
    var svgEl = document.getElementById("orbitalSvg");
    var detailCard = document.getElementById("orbitalDetailCard");
    var hintEl = document.getElementById("orbitalHint");
    var dynamicBg = document.getElementById("orbitalDynamicBg");

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
            var iconName = product.bgIcons[i % product.bgIcons.length];
            var el = document.createElement("i");
            el.className = "orbital-float-icon";
            el.setAttribute("data-lucide", iconName);
            el.style.left = Math.random() * 94 + 3 + "%";
            el.style.top = Math.random() * 90 + 5 + "%";
            el.style.fontSize = (22 + Math.random() * 36) + "px";
            el.style.animationDuration = (6 + Math.random() * 8) + "s";
            el.style.animationDelay = (Math.random() * 4) + "s";
            el.style.transform = "rotate(" + (Math.random() * 40 - 20) + "deg)";
            dynamicBg.appendChild(el);
        }
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                var icons = dynamicBg.querySelectorAll(".orbital-float-icon");
                icons.forEach(function (ic) { ic.classList.add("visible"); });
            });
        });
    }

    function clearDynamicBackground() {
        if (!dynamicBg) return;
        if (clearBgTimeout) clearTimeout(clearBgTimeout);
        var icons = dynamicBg.querySelectorAll(".orbital-float-icon");
        icons.forEach(function (ic) { ic.classList.remove("visible"); });
        dynamicBg.classList.remove("active");
        if (sectionEl) sectionEl.removeAttribute("data-bg-gradient");
        clearBgTimeout = setTimeout(function () {
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
            dot.innerHTML = '<i data-lucide="' + p.icon + '"></i>';

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
            var rad = (angle * Math.PI) / 180;
            var x = radius * Math.cos(rad);
            var y = radius * Math.sin(rad);
            var zIdx = Math.round(100 + 50 * Math.cos(rad));
            var op = node.classList.contains("active")
                ? 1
                : Math.max(0.4, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2));

            node.style.transform = "translate(" + x + "px," + y + "px)";
            node.style.zIndex = node.classList.contains("active") ? 200 : zIdx;
            node.style.opacity = op;
        });

        drawConnections();
    }

    function drawConnections() {
        while (svgEl.firstChild) svgEl.removeChild(svgEl.firstChild);
        if (!activeNodeId) return;

        var prod = products.find(function (p) { return p.id === activeNodeId; });
        if (!prod) return;

        var cx = viewport.offsetWidth / 2;
        var cy = viewport.offsetHeight / 2;
        var radius = getRadius();
        var total = products.length;

        var ai = products.findIndex(function (p) { return p.id === activeNodeId; });
        var aAng = ((ai / total) * 360 + rotationAngle) % 360;
        var aRad = (aAng * Math.PI) / 180;
        var ax = cx + radius * Math.cos(aRad);
        var ay = cy + radius * Math.sin(aRad);

        prod.relatedIds.forEach(function (rid) {
            var ri = products.findIndex(function (p) { return p.id === rid; });
            if (ri === -1) return;
            var rAng = ((ri / total) * 360 + rotationAngle) % 360;
            var rRad = (rAng * Math.PI) / 180;
            var rx = cx + radius * Math.cos(rRad);
            var ry = cy + radius * Math.sin(rRad);

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
            hintEl.innerHTML = '<i data-lucide="mouse-pointer-click" class="inline-block w-4 h-4 me-1 align-middle"></i> Click a node to explore';
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return;
        }

        activeNodeId = id;
        autoRotate = false;

        var idx = products.findIndex(function (p) { return p.id === id; });
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
        hintEl.innerHTML = '<i data-lucide="x-circle" class="inline-block w-4 h-4 me-1 align-middle"></i> Click empty space to close';
        if (typeof lucide !== 'undefined') lucide.createIcons();
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
                    + ' <i data-lucide="arrow-right" class="w-2.5 h-2.5 inline-block align-middle ml-1"></i></button>';
            }).join("");
            connHtml = '<div class="orbital-connected-section">'
                + '<div class="orbital-connected-label"><i data-lucide="link" class="w-3 h-3 inline-block align-middle me-1"></i> Connected Nodes</div>'
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
            + '<div class="orbital-energy-header"><span><i data-lucide="zap" class="w-3.5 h-3.5 inline-block align-middle me-1"></i> Energy Level</span><span>' + p.energy + '%</span></div>'
            + '<div class="orbital-energy-bar"><div class="orbital-energy-fill" style="width:' + p.energy + '%"></div></div>'
            + '</div>'
            + connHtml
            + '</div>';

        if (typeof lucide !== 'undefined') lucide.createIcons();

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
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    window.addEventListener("resize", positionNodes);
})();
// Legacy productApp removed


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


// Global brand icons helper to render inline SVGs for tech stack brand logos or Lucide markup
window.getIconHTML = function (iconKey) {
    if (!iconKey) return '';
    let name = iconKey.replace(/fa[sb]\s+fa-/, '').replace(/fa-/, '').trim().toLowerCase();

    // Map generic FontAwesome names to Lucide equivalents
    const genericMap = {
        'robot': 'bot',
        'search-location': 'map-pin',
        'file-signature': 'signature',
        'chalkboard-teacher': 'presentation',
        'balance-scale': 'scale',
        'history': 'history',
        'shield-alt': 'shield',
        'cloud-upload-alt': 'cloud-upload',
        'hdd': 'hard-drive',
        'industry': 'factory',
        'truck-loading': 'package-open',
        'project-diagram': 'network',
        'cogs': 'cog',
        'chart-network': 'network',
        'cart-arrow-down': 'shopping-cart',
        'laptop-code': 'laptop',
        'shopping-bag': 'shopping-bag',
        'tags': 'tags',
        'truck': 'truck',
        'elementor': 'layout',
        'pencil-ruler': 'pencil-ruler',
        'keyboard': 'keyboard',
        'newspaper': 'newspaper',
        'quote-left': 'quote',
        'mobile': 'smartphone',
        'spell-check': 'spellcheck',
        'chart-bar': 'bar-chart',
        'brain': 'brain',
        'briefcase': 'briefcase',
        'search-dollar': 'search',
        'user-tie': 'user',
        'graduation-cap': 'graduation-cap',
        'bus': 'bus',
        'receipt': 'receipt',
        'piggy-bank': 'piggy-bank',
        'coins': 'coins',
        'print': 'printer',
        'credit-card': 'credit-card',
        'percentage': 'percent',
        'user-plus': 'user-plus',
        'school': 'school',
        'calculator': 'calculator',
        'cash-register': 'banknote',
        'network-wired': 'network'
    };

    if (genericMap[name]) {
        name = genericMap[name];
    }

    // Technology and brand logos custom SVGs
    const brandSVGs = {
        react: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(30 12 12)" /><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(90 12 12)" /><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(150 12 12)" /><circle cx="12" cy="12" r="2" fill="currentColor" /></svg>`,
        nodejs: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path d="M12 2L4 6.6v9.2L12 22l8-4.6v-9.2L12 2zM6 8.3l5-2.9v5.7L6 14v-5.7zm7 10.8V13.4l5-2.9v5.7l-5 2.9z"/></svg>`,
        laravel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
        python: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path d="M12 2c-5.5 0-5 2.5-5 2.5h5v1h-7s-3 .5-3 5.5c0 5 2.5 5 2.5 5h1.5v-2c0-2.5 2-4.5 4.5-4.5h4v-1h-5v-1.5s0-2.5 2.5-2.5 5 0 5 0V3s-1-1-5-1zm0 20c5.5 0 5-2.5 5-2.5h-5v-1h7s3-.5 3-5.5c0-5-2.5-5-2.5-5H18v2c0 2.5-2 4.5-4.5 4.5h-4v1h5v1.5s0 2.5-2.5 2.5-5 0-5 0v1.5s1 1 5 1z"/></svg>`,
        php: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-4.5 14h-1V8h2.5c1.1 0 2 .9 2 2s-.9 2-2 2H7.5v4zm7 0h-1V8h2.5c1.1 0 2 .9 2 2s-.9 2-2 2h-2.5v4zm-1.5-6h1.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-1.5v1zm7 0h1.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-1.5v1z"/></svg>`,
        wordpress: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.12 18.23c-1.39.38-2.84.44-4.22.18l3.19-9.25 1.03 9.07zm-7.66-2.59c-.83-1.12-1.34-2.51-1.34-4.01 0-2.31 1.21-4.32 3.03-5.5l-3.32 9.51zm9.64.08l2.25-6.84c.64 1.15.97 2.37.97 3.59 0 1.22-.33 2.37-.93 3.39l-2.29-.14zm-5.74-12.87c.73 0 1.28.32 1.28.73 0 .37-.23.71-.57 1.05l-1.02.93c-.48.43-.88.94-.88 1.63h-.04c-.05-.98.37-1.74.88-2.24l1.09-1.02c.16-.15.22-.26.22-.38 0-.17-.18-.32-.51-.32-.61 0-1.27.28-1.92.65l-.33-.51c1.07-.72 2.13-1.12 3.12-1.12z"/></svg>`,
        mysql: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0 .83-.67 1.5-1.5 1.5S10 17.33 10 16.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm1.5-5.3l-1.2 3.6h-2.6l-1.2-3.6c-.3-.9.3-1.7 1.2-1.7h2.6c.9 0 1.5.8 1.2 1.7z"/></svg>`,
        shopify: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path d="M19 6.5h-3v-1c0-1.4-1.1-2.5-2.5-2.5h-3C9.1 3 8 4.1 8 5.5v1H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-10c0-1.1-.9-2-2-2zm-9-1c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v1h-4v-1zm9 13H5v-9h14v9z"/></svg>`,
        docker: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path d="M2 10.5V12h2.5v-1.5H2zm3.5-3V9H8V7.5H5.5zM9 4.5V6h2.5V4.5H9zm3.5 0V6H15V4.5h-2.5zM16 7.5V9h2.5V7.5H16zm-3.5 3V12H15v-1.5h-2.5zm-3.5 0V12h2.5v-1.5H9zm-3.5 0V12H8v-1.5H5.5zM22 12c0-3.5-3-6.5-6.5-6.5S9 8.5 9 12s3 6.5 6.5 6.5S22 15.5 22 12z"/></svg>`,
        microsoft: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path d="M2 2h9.5v9.5H2V2zm10.5 0H22v9.5h-9.5V2zM2 12.5h9.5V22H2v-9.5zm10.5 0H22V22h-9.5v-9.5z"/></svg>`,
        angular: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path d="M12 2L2 5.5l1.5 12L12 22l8.5-4.5 1.5-12L12 2zm0 3.5l6.5 11.5h-2.5l-1.5-3.5h-5l-1.5 3.5H5.5L12 5.5zm-2.5 6.5h5L12 9.5l-2.5 2.5z"/></svg>`,
        mongodb: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path d="M12 2c0 0-4 4.5-4 8.5S10.5 17 12 22c1.5-5 4-7.5 4-11.5S12 2 12 2zm1 9.5c0 .6-.4 1-1 1s-1-.4-1-1 .4-1 1-1 1 .4 1 1z"/></svg>`
    };

    if (brandSVGs[name]) {
        return brandSVGs[name];
    }

    return `<i data-lucide="${name}" class="w-full h-full inline-block"></i>`;
};

function enhancedProductApp() {
    return {
        activeIndex: 0,
        mouseX: 50,
        mouseY: 50,
        autoSwitchTimer: null,
        typingInterval: null,
        isAnimating: false,
        showDemoModal: false,
        demoProductName: '',
        demoSubmitted: new URLSearchParams(window.location.search).has('demoSuccess'),
        products: [
            {
                name: "Axon Recruitment",
                category: "PORTAL",
                color: "#148F77",
                image: "assets/images/products/recruitment-1.webp",
                shortDesc: "AI-Driven Talent Acquisition",
                desc: "A powerful recruitment portal that bridges the gap between top talent and leading organizations through smart matching and automated workflows.",
                icon: '<i data-lucide="user-plus" class="w-6 h-6 lg:w-8 lg:h-8"></i>',
                features: [
                    { icon: "bot", text: "AI Matching" },
                    { icon: "map-pin", text: "Geo-Sourcing" },
                    { icon: "calendar-check", text: "Auto Interviews" },
                    { icon: "signature", text: "E-Onboarding" }
                ],
                technologies: [
                    { icon: "react", name: "React" },
                    { icon: "nodejs", name: "Node.js" },
                    { icon: "brain", name: "AI Engine" }
                ],
                slug: "recruitment",
                stats: [
                    { value: "50k+", label: "Resumes" },
                    { value: "12d", label: "Hire Time" },
                    { value: "95%", label: "Match" }
                ],
                icons: ["briefcase", "search", "user"]
            },
            {
                name: "Axon School",
                category: "EDUCATION",
                color: "#512E5F",
                image: "assets/images/products/school-1.webp",
                shortDesc: "Next-Gen School Management",
                desc: "A complete educational ERP system that unifies students, parents, and teachers on a single platform with automated reporting and fee management.",
                icon: '<i data-lucide="school" class="w-6 h-6 lg:w-8 lg:h-8"></i>',
                features: [
                    { icon: "graduation-cap", text: "LMS Integration" },
                    { icon: "wallet", text: "Fee Portal" },
                    { icon: "bell", text: "Smart Alerts" },
                    { icon: "bar-chart", text: "Result Center" }
                ],
                technologies: [
                    { icon: "laravel", name: "Laravel" },
                    { icon: "smartphone", name: "Mobile App" },
                    { icon: "mysql", name: "MySQL" }
                ],
                slug: "school-system",
                stats: [
                    { value: "100+", label: "Schools" },
                    { value: "50k+", label: "Users" },
                    { value: "98%", label: "Retention" }
                ],
                icons: ["graduation-cap", "presentation", "bus"]
            },
            {
                name: "Axon Accounts",
                category: "FINANCE",
                color: "#7B241C",
                image: "assets/images/products/accounts-1.webp",
                shortDesc: "Professional Accounting ERP",
                desc: "A secure and robust financial management system providing multi-currency ledgers, instant tax compliance, and deep audit capabilities.",
                icon: '<i data-lucide="calculator" class="w-6 h-6 lg:w-8 lg:h-8"></i>',
                features: [
                    { icon: "receipt", text: "Invoicing" },
                    { icon: "scale", text: "Tax Engine" },
                    { icon: "history", text: "Audit Trails" },
                    { icon: "line-chart", text: "Reports" }
                ],
                technologies: [
                    { icon: "microsoft", name: "C#" },
                    { icon: "database", name: "SQL Server" },
                    { icon: "shield", name: "OAuth 2.0" }
                ],
                slug: "accounts-app",
                stats: [
                    { value: "$50M+", label: "Turnover" },
                    { value: "Zero", label: "Errors" },
                    { value: "Realtime", label: "Update" }
                ],
                icons: ["receipt", "piggy-bank", "coins"]
            },
            {
                name: "Axon POS",
                category: "RETAIL",
                color: "#1B2631",
                image: "assets/images/products/pos-1.webp",
                shortDesc: "Hyper-Fast Point of Sale",
                desc: "Designed for high-traffic retail, Apex POS offers lightning-fast transactions, integrated hardware support, and powerful inventory sync.",
                icon: '<i data-lucide="banknote" class="w-6 h-6 lg:w-8 lg:h-8"></i>',
                features: [
                    { icon: "zap", text: "Instant Sale" },
                    { icon: "boxes", text: "Stock Sync" },
                    { icon: "user-check", text: "Staff Login" },
                    { icon: "cloud-upload", text: "Cloud Backup" }
                ],
                technologies: [
                    { icon: "angular", name: "Angular" },
                    { icon: "nodejs", name: "Express" },
                    { icon: "hard-drive", name: "Hardware API" }
                ],
                slug: "pos-retail",
                stats: [
                    { value: "2000+", label: "Stores" },
                    { value: "0.2s", label: "Processing" },
                    { value: "24/7", label: "Support" }
                ],
                icons: ["printer", "credit-card", "percent"]
            },
            {
                name: "Axon ERP",
                category: "ENTERPRISE",
                color: "#1B4F72",
                image: "assets/images/products/erp-1.webp",
                shortDesc: "End-to-End Business Unified",
                desc: "A comprehensive ERP suite that bridges Manufacturing, Supply Chain, and Finance for large-scale enterprise operations with advanced HR & Payroll modules.",
                icon: '<i data-lucide="network" class="w-6 h-6 lg:w-8 lg:h-8"></i>',
                features: [
                    { icon: "factory", text: "Production" },
                    { icon: "warehouse", text: "Inventory" },
                    { icon: "package-open", text: "Logistics" },
                    { icon: "network", text: "SOP Mgmt" }
                ],
                technologies: [
                    { icon: "python", name: "Python" },
                    { icon: "database", name: "PostgreSQL" },
                    { icon: "docker", name: "Microservices" }
                ],
                slug: "erp-system",
                stats: [
                    { value: "300%", label: "Efficiency" },
                    { value: "50+", label: "Modules" },
                    { value: "Enterprise", label: "Security" }
                ],
                icons: ["cog", "box", "network"]
            },
            {
                name: "Axon Shopify",
                category: "PLATFORM",
                color: "#1D8348",
                image: "assets/images/products/shopify-1.webp",
                shortDesc: "Custom Shopify Storefronts",
                desc: "High-conversion Shopify stores built with custom Liquid themes and headless integrations for the ultimate brand experience.",
                icon: '<i data-lucide="shopping-bag" class="w-6 h-6 lg:w-8 lg:h-8"></i>',
                features: [
                    { icon: "rocket", text: "Speed Boost" },
                    { icon: "plug", text: "Custom Apps" },
                    { icon: "pencil", text: "Bespoke Design" },
                    { icon: "smartphone", text: "Mobile First" }
                ],
                technologies: [
                    { icon: "shopify", name: "Liquid" },
                    { icon: "nodejs", name: "Node.js" },
                    { icon: "shopping-bag", name: "Shopify Plus" }
                ],
                slug: "shopify-dev",
                stats: [
                    { value: "250+", label: "Stores" },
                    { value: "98/100", label: "Speed" },
                    { value: "Top", label: "Rated" }
                ],
                icons: ["shopify", "shopping-cart", "laptop"]
            },
            {
                name: "Axon E-Commerce",
                category: "RETAIL",
                color: "#635091",
                image: "assets/images/products/ecommerce-1.webp",
                shortDesc: "Scalable Online Stores",
                desc: "High-conversion digital storefronts built with cutting-edge tech. We create seamless shopping experiences that drive sales and customer loyalty.",
                icon: '<i data-lucide="shopping-cart" class="w-6 h-6 lg:w-8 lg:h-8"></i>',
                features: [
                    { icon: "smartphone", text: "Responsive" },
                    { icon: "credit-card", text: "Secure Pay" },
                    { icon: "package", text: "Inventory" },
                    { icon: "search", text: "SEO Ready" }
                ],
                technologies: [
                    { icon: "nodejs", name: "Node.js" },
                    { icon: "react", name: "React" },
                    { icon: "database", name: "MongoDB" }
                ],
                slug: "ecommerce",
                stats: [
                    { value: "100+", label: "Stores" },
                    { value: "40%", label: "Conversion" },
                    { value: "Fast", label: "Delivery" }
                ],
                icons: ["shopping-bag", "tags", "truck"]
            },
            {
                name: "Axon WordPress",
                category: "PLATFORM",
                color: "#21618C",
                image: "assets/images/products/wordpress-1.webp",
                shortDesc: "Scalable WordPress CMS",
                desc: "Enterprise WordPress solutions designed for security, high-traffic, and seamless content management for corporate websites like Quill Product.",
                icon: '<i data-lucide="globe" class="w-6 h-6 lg:w-8 lg:h-8"></i>',
                features: [
                    { icon: "code", text: "Custom Core" },
                    { icon: "toy-brick", text: "Custom Plugins" },
                    { icon: "lock", text: "Secured" },
                    { icon: "server", text: "Hosting Opt" }
                ],
                technologies: [
                    { icon: "wordpress", name: "WordPress" },
                    { icon: "php", name: "PHP 8" },
                    { icon: "react", name: "Gutenberg" }
                ],
                slug: "wordpress-dev",
                stats: [
                    { value: "500+", label: "Websites" },
                    { value: "Secure", label: "Audit" },
                    { value: "99.9%", label: "Stability" }
                ],
                icons: ["wordpress", "layout", "pencil-ruler"]
            },
            {
                name: "Axon Content",
                category: "CONTENT",
                color: "#6E2C00",
                image: "assets/images/products/content-1.webp",
                shortDesc: "Professional Copywriting",
                desc: "Strategic content creation that drives organic traffic and converts visitors into loyal customers through impactful storytelling.",
                icon: '<i data-lucide="pen-tool" class="w-6 h-6 lg:w-8 lg:h-8"></i>',
                features: [
                    { icon: "search", text: "SEO Focus" },
                    { icon: "target", text: "Conversion" },
                    { icon: "languages", text: "Multi-Lang" },
                    { icon: "check-check", text: "QA Passed" }
                ],
                technologies: [
                    { icon: "spellcheck", name: "Grammarly" },
                    { icon: "bar-chart", name: "Ahrefs" },
                    { icon: "brain", name: "Creative" }
                ],
                slug: "content-writing",
                stats: [
                    { value: "10M+", label: "Words" },
                    { value: "1st", label: "Google" },
                    { value: "Elite", label: "Writers" }
                ],
                icons: ["keyboard", "newspaper", "quote"]
            }
        ],

        init() {
            this.animateText();
            this.startAutoSwitch();

            // Run Lucide conversion on boot and on state changes
            this.$nextTick(() => {
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
            this.$watch('activeIndex', () => {
                this.$nextTick(() => {
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                });
            });
            this.$watch('showDemoModal', () => {
                this.$nextTick(() => {
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                });
            });
            this.$watch('demoSubmitted', () => {
                this.$nextTick(() => {
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                });
            });

            // Handle URL parameters for Demo Modal
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('openDemo')) {
                const productSlug = urlParams.get('openDemo');
                const product = this.products.find(p => p.slug === productSlug);
                if (product) {
                    this.showDemoModal = true;
                    this.demoProductName = product.name;
                    this.activeIndex = this.products.indexOf(product);
                }
            }

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

            // Stop any current typing animation
            if (this.typingInterval) {
                clearInterval(this.typingInterval);
            }

            this.isAnimating = true;
            const text = this.products[this.activeIndex].desc;

            // Clear previous content
            el.innerHTML = '';

            // Create typing effect
            let i = 0;
            this.typingInterval = setInterval(() => {
                if (i < text.length) {
                    el.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(this.typingInterval);
                    this.typingInterval = null;
                    this.isAnimating = false;
                }
            }, 25);
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
    };
}

function servicesApp() {
    return {
        showAll: false,
        services: [
            {
                title: 'Web <span class="text-[#FFC132]">Development</span>',
                icon: 'code',
                color: '#FFC132',
                image: 'assets/images/unsplash/1.webp',
                features: ['Frontend & Backend', 'API Integration', 'Database Design', 'Cloud Deployment'],
                description: 'We engineer high-performance, scalable web applications using cutting-edge frameworks like React, Vue, and Node.js. Our development process focuses on creating robust backend architectures combined with seamless frontend experiences that drive business growth.'
            },
            {
                title: 'Mobile <span class="text-[#635091]">Development</span>',
                icon: 'smartphone',
                color: '#635091',
                image: 'assets/images/unsplash/2.webp',
                features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Deployment'],
                description: 'Our mobile experts deliver native and cross-platform solutions for iOS and Android that prioritize user engagement and performance. We handle everything from intuitive UI/UX design to complex cloud integrations and long-term app store maintenance.'
            },
            {
                title: 'Account <span class="text-[#FFC132]">Management</span>',
                icon: 'calculator',
                color: '#FFC132',
                image: 'assets/images/unsplash/3.webp',
                features: ['Ledger Tracking', 'Financial Reports', 'Invoice Generation', 'Tax Compliance'],
                description: 'Simplify your business finances with our comprehensive accounting solutions. From automated ledger tracking and real-time financial reporting to tax compliance and professional invoice generation, we provide the tools you need to maintain financial health.'
            },
            {
                title: 'Web <span class="text-[#635091]">Designing</span>',
                icon: 'palette',
                color: '#635091',
                image: 'assets/images/unsplash/4.webp',
                features: ['UI/UX Design', 'Wireframing', 'Prototyping', 'Responsive Design'],
                description: 'We create stunning, user-centric designs that tell your brand story and engage visitors from the first click. Our design philosophy combines artistic creativity with data-driven UX principles to ensure high conversion rates and a memorable digital presence.'
            },
            {
                title: 'Enterprise <span class="text-[#FFC132]">Applications</span>',
                icon: 'network',
                color: '#FFC132',
                image: 'assets/images/unsplash/5.webp',
                features: ['ERP Systems', 'CRM Solutions', 'Workflow Automation', 'Business Intelligence'],
                description: 'Streamline your corporate operations with custom enterprise software built for scale. We develop sophisticated ERP and CRM systems that automate complex workflows, improve team collaboration, and provide deep business intelligence for informed decision-making.'
            },
            {
                title: 'Data <span class="text-[#635091]">Warehousing</span>',
                icon: 'database',
                color: '#635091',
                image: 'assets/images/unsplash/6.webp',
                features: ['Big Data Analytics', 'ETL Processes', 'Data Visualization', 'Real-time Reporting'],
                description: 'Unlock the power of your data with our advanced warehousing and analytics solutions. We implement robust ETL processes and real-time reporting tools that transform raw data into actionable insights, helping you predict market trends and optimize operations.'
            },
            {
                title: 'Content <span class="text-[#FFC132]">Writing</span>',
                icon: 'pen-tool',
                color: '#FFC132',
                image: 'assets/images/unsplash/7.webp',
                features: ['SEO Content', 'Blog Posts', 'Technical Writing', 'Copywriting'],
                description: 'Our professional writers craft high-quality, SEO-optimized content that resonates with your target audience and boosts your search rankings. Whether you need technical whitepapers, engaging blog posts, or high-conversion sales copy, we tell your story effectively.'
            },
            {
                title: 'Hardware <span class="text-[#635091]">Services</span>',
                icon: 'cpu',
                color: '#635091',
                image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800',
                features: ['Server Setup', 'Network Configuration', 'Hardware Maintenance', 'IT Infrastructure'],
                description: 'Build a rock-solid foundation for your digital operations with our expert hardware and infrastructure services. We provide professional server setup, secure network configuration, and ongoing maintenance to ensure your business remains online and secure 24/7.'
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
            this.$nextTick(() => {
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
            this.$watch('showAll', () => {
                this.$nextTick(() => {
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                });
            });
        }
    };
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

// Form Submission Implementation (SMTP via .aspx)
(function () {
    window.sendEmail = function (form, alpineData) {
        // Change button text to indicate sending
        const btn = form.querySelector('button[type="submit"]');
        if (!btn) return;

        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;

        // Determine which endpoint to use based on form ID or hidden fields
        // productName field is present in demo form
        const isDemo = form.querySelector('input[name="productName"]') !== null;
        const action = isDemo ? 'send-demo.aspx' : 'send-lead.aspx';

        const formData = new FormData(form);

        fetch(action, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (isDemo) {
                        alpineData.demoSubmitted = true;
                    } else {
                        alpineData.submitted = true;
                    }
                    console.log('SUCCESS!');
                } else {
                    throw new Error(data.message || 'Server responded with an error');
                }
            })
            .catch(error => {
                console.error('FAILED...', error);
                alert('Error: ' + error.message);
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
    };
})();