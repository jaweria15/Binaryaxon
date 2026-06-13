document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('aether-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 200 };

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Mouse collision detection
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius + this.size) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x -= forceDirectionX * force * 5;
                    this.y -= forceDirectionY * force * 5;
                }
            }

            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particles = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(191, 128, 255, 0.8)'; // Brighter purple
            particles.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init(); 
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const connect = () => {
        let opacityValue = 1;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                    + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    
                    let dx_mouse_a = particles[a].x - mouse.x;
                    let dy_mouse_a = particles[a].y - mouse.y;
                    let distance_mouse_a = Math.sqrt(dx_mouse_a*dx_mouse_a + dy_mouse_a*dy_mouse_a);

                    if (mouse.x && distance_mouse_a < mouse.radius) {
                         ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                    } else {
                         ctx.strokeStyle = `rgba(200, 150, 255, ${opacityValue})`;
                    }
                    
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    };

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        connect();
    };
    
    const handleMouseMove = (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    };
    
    const handleMouseOut = () => {
        mouse.x = null;
        mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    // Dynamic Slogan Rotator Logic
    function initSloganRotator() {
        const dynamicSlogan = document.getElementById('dynamic-slogan');
        const heroSubtitle = document.getElementById('hero-subtitle');
        if (!dynamicSlogan || !heroSubtitle) return;

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
                subtitle: "Binary Axon provides a wealth of technical and business expertise to its customers, shaping the future of digital solutions."
            },
            {
                slogan: "AI Innovation",
                subtitle: "Harnessing machine learning and artificial intelligence to build smart, predictive, and automated systems."
            },
            {
                slogan: "Development Expertise",
                subtitle: "Delivering industry-grade software architecture, agile development processes, and robust enterprise solutions."
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

        function startNextCycle() {
            currentIndex = (currentIndex + 1) % items.length;
            const nextItem = items[currentIndex];

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

        // Kickoff initial typewriter on page load
        typewriteText(heroSubtitle, items[0].subtitle, typingSpeed, () => {
            setTimeout(startNextCycle, readingDelay);
        });
    }

    init();
    animate();
    initSloganRotator();
});
