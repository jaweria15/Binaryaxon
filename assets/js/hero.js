document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Slogan Rotator Logic
    function initSloganRotator() {
        const dynamicSlogan = document.getElementById('dynamic-slogan');
        const heroSubtitle = document.getElementById('hero-subtitle');
        if (!dynamicSlogan || !heroSubtitle) return;

        // Get background cards and glow elements
        const bgCards = document.querySelectorAll('.hero-slogan-bg-card');
        const bgGlow = document.getElementById('hero-bg-glow');

        // Ensure cursor styling is injected
        if (!document.getElementById('typing-cursor-style')) {
            const style = document.createElement('style');
            style.id = 'typing-cursor-style';
            style.innerHTML = `
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .typing-cursor {
                    animation: blink 0.8s infinite;
                    font-weight: bold;
                    display: inline-block;
                }
            `;
            document.head.appendChild(style);
        }

        const items = [
            {
                slogan: "Tech Reality",
                subtitle: "Binary Axon provides a wealth of technical and business expertise to its customers, shaping the future of digital solutions.",
                glowColor: "radial-gradient(circle, rgba(99,80,145,0.8) 0%, transparent 70%)"
            },
            {
                slogan: "AI Innovation",
                subtitle: "Harnessing machine learning and artificial intelligence to build smart, predictive, and automated systems.",
                glowColor: "radial-gradient(circle, rgba(255,193,50,0.5) 0%, transparent 70%)"
            },
            {
                slogan: "Development Expertise",
                subtitle: "Delivering industry-grade software architecture, agile development processes, and robust enterprise solutions.",
                glowColor: "radial-gradient(circle, rgba(99,80,145,0.8) 0%, transparent 70%)"
            }
        ];

        let currentIndex = 0;
        const typingSpeed = 25; // ms per character
        const readingDelay = 2000; // ms to pause after typing finishes before next cycle

        function typewriteText(element, text, speed, onComplete) {
            element.innerHTML = "";
            let i = 0;
            
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor text-[#FFC132] ml-1';
            cursor.textContent = '|';
            element.appendChild(cursor);

            function type() {
                if (i < text.length) {
                    const textNode = document.createTextNode(text.charAt(i));
                    element.insertBefore(textNode, cursor);
                    i++;
                    setTimeout(type, speed);
                } else {
                    if (onComplete) onComplete();
                }
            }
            type();
        }

        function switchSloganBgImage(nextIndex) {
            if (bgCards.length === 0) return;
            
            bgCards.forEach((card, index) => {
                const targetOpacity = index === nextIndex ? 0.45 : 0; // Higher opacity so the background images are beautifully visible!

                // Use GSAP for extremely smooth background fade transition
                gsap.to(card, {
                    duration: 1.0,
                    opacity: targetOpacity,
                    ease: "power2.out"
                });
            });

            // Update ambient background glow color
            if (bgGlow && items[nextIndex]) {
                bgGlow.style.background = items[nextIndex].glowColor;
            }
        }

        function startNextCycle() {
            currentIndex = (currentIndex + 1) % items.length;
            const nextItem = items[currentIndex];

            // Trigger background cross-fade immediately (simultaneously with text transition start)
            switchSloganBgImage(currentIndex);

            const tl = gsap.timeline();

            // 1. Flip out current slogan and fade out current subtitle
            tl.to(dynamicSlogan, {
                duration: 0.4,
                rotationX: -90,
                opacity: 0,
                transformPerspective: 1000,
                transformOrigin: "50% 50% -20px",
                ease: "power2.in"
            });
            tl.to(heroSubtitle, {
                duration: 0.3,
                opacity: 0,
                y: -10,
                ease: "power2.in"
            }, "-=0.3");

            // 2. Change dynamic slogan and setup subtitle entry
            tl.call(() => {
                dynamicSlogan.textContent = nextItem.slogan;
                heroSubtitle.innerHTML = "";
                gsap.set(dynamicSlogan, { rotationX: 90, transformPerspective: 1000 });
                gsap.set(heroSubtitle, { opacity: 1, y: 0 });
            });

            // 3. Flip in new slogan, then start typewriting the new subtitle
            tl.to(dynamicSlogan, {
                duration: 0.6,
                rotationX: 0,
                opacity: 1,
                transformPerspective: 1000,
                transformOrigin: "50% 50% -20px",
                ease: "back.out(1.2)"
            });

            tl.call(() => {
                typewriteText(heroSubtitle, nextItem.subtitle, typingSpeed, () => {
                    // Wait for reading duration, then start next cycle
                    setTimeout(startNextCycle, readingDelay);
                });
            });
        }

        // Initialize background image transitions
        switchSloganBgImage(0);

        // Kickoff initial typewriter on page load
        typewriteText(heroSubtitle, items[0].subtitle, typingSpeed, () => {
            setTimeout(startNextCycle, readingDelay);
        });
    }

    initSloganRotator();
});
