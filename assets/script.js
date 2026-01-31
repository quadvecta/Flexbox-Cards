const card = document.getElementById('tiltCard');

const handleMotion = (e) => {
    const rect = card.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltAmount = 15; 
    const rotateX = ((y - centerY) / centerY) * -tiltAmount;
    const rotateY = ((x - centerX) / centerX) * tiltAmount;

    card.style.transition = 'none'; // Instant response on move
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const resetMotion = () => {
    // Return to original state with smooth spring-like timing
    card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease';
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
};

card.addEventListener('mousemove', handleMotion);
card.addEventListener('mouseleave', resetMotion);

card.addEventListener('touchmove', (e) => {
    handleMotion(e);
    if (e.cancelable) e.preventDefault(); 
}, { passive: false });

card.addEventListener('touchend', resetMotion);
