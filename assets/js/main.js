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

/* ========== TEAM SPOTLIGHT CAROUSEL ========== */
(function() {
    var carousel = document.getElementById("teamCarousel");
    var prevBtn = document.querySelector(".team-arrow-prev");
    var nextBtn = document.querySelector(".team-arrow-next");
    if (!carousel) return;

    var cards = carousel.querySelectorAll(".team-card");
    var total = cards.length;
    var spotlightIndex = Math.floor(total / 2);

    function updateSpotlight() {
        cards.forEach(function(card, i) {
            card.classList.toggle("spotlight", i === spotlightIndex);
        });
        var spotlightCard = cards[spotlightIndex];
        if (spotlightCard && window.matchMedia("(max-width: 480px)").matches) {
            spotlightCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
    }

    cards.forEach(function(card, i) {
        card.addEventListener("click", function() {
            spotlightIndex = i;
            updateSpotlight();
        });
    });
    if (prevBtn) {
        prevBtn.addEventListener("click", function() {
            spotlightIndex = (spotlightIndex - 1 + total) % total;
            updateSpotlight();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", function() {
            spotlightIndex = (spotlightIndex + 1) % total;
            updateSpotlight();
        });
    }
    updateSpotlight();
})();

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
