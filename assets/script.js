const card = document.getElementById('tiltCard');

const handleMotion = (e) => {
    const rect = card.getBoundingClientRect();
    
    // Support both Mouse and Touch
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Intensity of the tilt
    const tiltAmount = 20; 
    const rotateX = ((y - centerY) / centerY) * -tiltAmount;
    const rotateY = ((x - centerX) / centerX) * tiltAmount;

    // Apply the transform instantly during move
    card.style.transition = 'none';
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const resetMotion = () => {
    // Smoothly transition back to original state
    card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
};

// Desktop listeners
card.addEventListener('mousemove', handleMotion);
card.addEventListener('mouseleave', resetMotion);

// Mobile listeners
card.addEventListener('touchmove', (e) => {
    handleMotion(e);
    if (e.cancelable) e.preventDefault(); 
}, { passive: false });

card.addEventListener('touchend', resetMotion);