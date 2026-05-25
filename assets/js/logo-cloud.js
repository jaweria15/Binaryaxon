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
            { name: 'CBS', src: 'assets/images/clients/CBS_logo1.png' },
            { name: 'FM', src: 'assets/images/clients/FM.png' },
            { name: 'FCA', src: 'assets/images/clients/FCA_logo.png' },
            { name: 'PrimeHR', src: 'assets/images/clients/PrimeHR.png' },
            { name: 'Mobi', src: 'assets/images/clients/MobiLogo3.png' },
            { name: 'SuperSports', src: 'assets/images/clients/mSunSportsLogo.png' },
            { name: 'Quill', src: 'assets/images/clients/quill.png' },
            { name: 'Microsoft', src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
            { name: 'Stripe', src: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
            { name: 'Google', src: 'https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg' }
        ],
        rows: [],
        
        init() {
            this.distributeLogos();
            this.$nextTick(() => {
                this.animateLogos();
            });
            
            // Re-distribute on window resize for responsiveness
            window.addEventListener('resize', () => {
                this.distributeLogos();
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
                // Desktop: Simple Staggered pattern [1, 3, 4, 2] for 10
                // We'll use a fixed-ish pattern for 10 logos as a baseline
                if (logoList.length === 10) {
                    result.push(logoList.splice(0, 1));
                    result.push(logoList.splice(0, 3));
                    result.push(logoList.splice(0, 4));
                    result.push(logoList.splice(0, 2));
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
