/**
 * Dynamic Logo Cloud Distribution Logic
 * Arranges logos into a staggered "diamond/cluster" shape
 * Optimized to prevent forced reflows and layout thrashing
 */

console.log("logo-cloud.js loaded");

if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

window.logoCloudApp = function() {
    return {
        logos: [
            { name: 'CBS', src: 'assets/images/clients/CBS_logo1.webp', width: 220, height: 100 },
            { name: 'FM', src: 'assets/images/clients/FM.webp', width: 220, height: 100 },
            { name: 'FCA', src: 'assets/images/clients/FCA_logo.webp', width: 220, height: 100 },
            { name: 'AxonHR', src: 'assets/images/clients/AxonHR.webp', width: 220, height: 100 },
            { name: 'Mobi', src: 'assets/images/clients/MobiLogo3.webp', width: 220, height: 100 },
            { name: 'SuperSports', src: 'assets/images/clients/mSunSportsLogo.webp', width: 220, height: 100 },
            { name: 'Quill', src: 'assets/images/clients/quill.webp', width: 220, height: 100 },
            { name: 'Microsoft', src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', width: 220, height: 100 },
            { name: 'Stripe', src: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg', width: 220, height: 100 },
            { name: 'CKH', src: 'assets/images/clients/CKH.webp', width: 220, height: 100 }
        ],
        rows: [],
        resizeTimer: null, // for debouncing

        init() {
            this.distributeLogos();
            this.$nextTick(() => {
                this.animateLogos();
            });

            // DEBOUNCED resize listener – prevents excessive reflows
            window.addEventListener('resize', () => {
                clearTimeout(this.resizeTimer);
                this.resizeTimer = setTimeout(() => {
                    this.distributeLogos();
                    // Re‑trigger animation after layout change (optional)
                    // this.animateLogos(); // Uncomment if you want re‑animation on resize
                }, 250);
            });
        },

        distributeLogos() {
            // Only read window.innerWidth once per call
            const isMobile = window.innerWidth < 768;
            const logoList = [...this.logos];
            const result = [];

            if (isMobile) {
                // On mobile, rows of 2
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
                    // Fallback for other counts: balanced rows
                    let perRow = Math.ceil(Math.sqrt(logoList.length));
                    while (logoList.length > 0) {
                        result.push(logoList.splice(0, perRow));
                    }
                }
            }
            this.rows = result;
        },

        animateLogos() {
            if (typeof gsap !== 'undefined') {
                // Kill any existing tweens to avoid conflicts
                gsap.killTweensOf('.client-card');

                // Animate from hidden to visible with a single batch write
                // Using ScrollTrigger which may cause reflows but is acceptable.
                // The main optimization is the debounced resize and avoiding
                // reading layout properties inside the animation.
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
                        clearProps: "transform", // clears transform after animation
                        scrollTrigger: {
                            trigger: '.clients-cloud',
                            start: 'top 85%',
                            toggleActions: "play none none none" // only once
                        }
                    }
                );
            }
        }
    };
};