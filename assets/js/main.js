window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const heroLogo = document.getElementById('heroLogo');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
        // Apply classes to shrink hero logo and show nav logo
        header.classList.add('scrolled');
        heroLogo.classList.add('fade-out');
    } else {
        // Return to original state
        header.classList.remove('scrolled');
        heroLogo.classList.remove('fade-out');
    }
});
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
