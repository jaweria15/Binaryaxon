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
        
        init() {
            this.distributeLogos();
            this.$nextTick(() => {
                this.animateLogos();
            });
            
            // Re-distribute on window resize for responsiveness
           let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        this.distributeLogos();
    }, 150); // Sirf 150ms ka delay browser ko crash hone se bachayega
});
        },
        
        distributeLogos() {
            console.log("Distributing logos...");
            const isMobile = window.innerWidth < 768;
            const logoList = [...this.logos];
            const result = [];
            
            if (isMobile) {
                // On mobile, just use rows of 2
                while (logoList.length > 0) {
                    result.push(logoList.splice(0, 2));
                }
            } else {
                // Desktop: Balanced Staggered pattern [3, 4, 3] for 10 logos
                if (logoList.length === 10) {
                    result.push(logoList.splice(0, 3));
                    result.push(logoList.splice(0, 4));
                    result.push(logoList.splice(0, 3));
                } else {
                    // Fallback for other counts: simple balanced rows
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
                // Clear any existing animations
                gsap.killTweensOf('.client-card');
                
                // Animate from hidden to visible and stay there
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
                        clearProps: "transform", // Keep opacity but clear transform for performance
                        scrollTrigger: {
                            trigger: '.clients-cloud',
                            start: 'top 85%',
                            toggleActions: "play none none none" // Only play once
                        }
                    }
                );
            }
        }
    }
}
