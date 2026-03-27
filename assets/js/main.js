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

// --- Scroll Reveal ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

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




function servicesApp() {
    return {
        showAll: false,
        services: [
            { 
                title: 'Software & <span class="text-[var(--accent-sky)]">Technology Solutions</span>',
                icon: 'fas fa-code',
                color: 'var(--accent-sky)',
                image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
                features: ['Modular ERP systems', 'Inventory & warehouse', 'POS systems', 'QR/barcode ecosystems', 'Cloud infrastructure/DevOps'],
                description: 'Custom ERP, CRM, and business process automation solutions tailored for modern enterprises.',
                url: 'services/software-solutions.html'
            },
            { 
                title: 'E-Commerce & <span class="text-[var(--primary-blue)]">Web Development</span>',
                icon: 'fas fa-store',
                color: 'var(--primary-blue)',
                image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
                features: ['Multi-vendor platforms', 'B2B/B2C web portals', 'Dedicated e-commerce apps'],
                description: 'Scalable corporate websites and feature-rich e-commerce stores using modern frameworks.',
                url: 'services/ecommerce-web.html'
            },
            { 
                title: 'Marketing & <span class="text-[var(--accent-sky)]">Growth</span>',
                icon: 'fas fa-chart-line',
                color: 'var(--accent-sky)',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
                features: ['Email marketing automation', 'Lead generation', 'Influencer marketing', 'WhatsApp API integration'],
                description: 'Advanced SEO, Social Media Strategy, and data-driven Paid Advertising campaigns.',
                url: 'services/marketing-growth.html'
            },
            { 
                title: 'Creative & <span class="text-[var(--primary-blue)]">Branding</span>',
                icon: 'fas fa-paint-brush',
                color: 'var(--primary-blue)',
                image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800',
                features: ['3D modeling', 'Video production', 'Professional photography', 'Social media creative designs'],
                description: 'High-end UI/UX design and compelling brand identity development for market leadership.',
                url: 'services/creative-branding.html'
            },
            { 
                title: 'Advanced AI <span class="text-[var(--accent-sky)]">Services</span>',
                icon: 'fas fa-robot',
                color: 'var(--accent-sky)',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
                features: ['SaaS product development', 'AI-powered chatbots', 'AI-driven content creation'],
                description: 'Cutting-edge SaaS development and AI-powered automation to future-proof your business.',
                url: 'services/advanced-ai.html'
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

// --- Team Spotlight Carousel Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.team-card');
    const nextBtn = document.getElementById('teamNext');
    const prevBtn = document.getElementById('teamPrev');
    let currentIndex = 3; // Center: Muhammad Waris Karim

    function updateCarousel(index) {
        cards.forEach((card, i) => {
            // Remove highlighting
            card.classList.remove('spotlight');
            
            // On mobile, cards might be hidden, so we show the spotlighted one
            if (i === index) {
                card.classList.add('spotlight');
                card.classList.remove('hidden');
                // Scroll into view on mobile
                if (window.innerWidth < 1024) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            } else {
                // Restore responsive hide classes for non-spotlight if needed
                // But generally, the layout handles this.
            }
        });
    }

    if (nextBtn && prevBtn) {
        nextBtn.onclick = () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel(currentIndex);
        };
        prevBtn.onclick = () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel(currentIndex);
        };
    }
});