/**
 * Dynamic Logo Cloud Distribution Logic
 * Arranges logos into a staggered "diamond/cluster" shape
 */

console.log("logo-cloud.js loaded");

if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

window.logoCloudApp = function() {
    return {
        logos: [
            { name: 'CBS', src: 'assets/images/clients/CBS_logo1.webp' },
            { name: 'FM', src: 'assets/images/clients/FM.webp' },
            { name: 'FCA', src: 'assets/images/clients/FCA_logo.webp' },
            { name: 'AxonHR', src: 'assets/images/clients/AxonHR.webp' },
            { name: 'Mobi', src: 'assets/images/clients/MobiLogo3.webp' },
            { name: 'SuperSports', src: 'assets/images/clients/mSunSportsLogo.webp' },
            { name: 'Quill', src: 'assets/images/clients/quill.webp' },
            { name: 'Microsoft', src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
            { name: 'Stripe', src: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
            { name: 'CKH', src: 'assets/images/clients/CKH.webp' }
        ],
        rows: [],
        cachedWidth: window.innerWidth, // ✨ Global Cache Layout Read to prevent Reflow
        
        init() {
            this.distributeLogos();
            
            // Alpine.js ke fully render hone ke baad animate karein
            this.$nextTick(() => {
                setTimeout(() => {
                    this.animateLogos();
                }, 50); // ✨ Chota sa delay GSAP aur Alpine ke conflict ko zero kar dega
            });
            
            // Re-distribute on window resize safely
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    this.cachedWidth = window.innerWidth; // Update cache safely
                    this.distributeLogos();
                    // Layout change hone par ScrollTrigger ko recalibrate karein
                    if (typeof ScrollTrigger !== 'undefined') {
                        ScrollTrigger.refresh();
                    }
                }, 150);
            });
        },
        
        distributeLogos() {
            console.log("Distributing logos...");
            // ✨ SAFELY USE CACHED READ
            const isMobile = this.cachedWidth < 768; 
            const logoList = [...this.logos];
            const result = [];
            
            if (isMobile) {
                while (logoList.length > 0) {
                    result.push(logoList.splice(0, 2));
                }
            } else {
                if (logoList.length === 10) {
                    result.push(logoList.splice(0, 3));
                    result.push(logoList.splice(0, 4));
                    result.push(logoList.splice(0, 3));
                } else {
                    let perRow = Math.ceil(Math.sqrt(logoList.length));
                    while (logoList.length > 0) {
                        result.push(logoList.splice(0, perRow));
                    }
                }
            }
            this.rows = result;
            console.log("Rows calculated:", this.rows);
        },
        
        animateLogos() {
            if (typeof gsap !== 'undefined') {
                gsap.killTweensOf('.client-card');
                
                gsap.fromTo('.client-card', 
                    { 
                        opacity: 0, 
                        y: 30,
                        scale: 0.9
                    },
                    {
                        duration: 1,
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        stagger: 0.08,
                        ease: "power3.out",
                        clearProps: "transform",
                        scrollTrigger: {
                            trigger: '.clients-cloud',
                            start: 'top 85%',
                            toggleActions: "play none none none"
                        }
                    }
                );
            }
        }
    }
}