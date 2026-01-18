// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
 anchor.addEventListener('click', function (e) {
 e.preventDefault();
 const target = document.querySelector(this.getAttribute('href'));
 if (target) {
 target.scrollIntoView({
 behavior: 'smooth',
 block: 'start'
 });
 }
    });
});

// Form submission handling
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
 e.preventDefault();
    alert('Message sent! (This is a demo)');
 this.reset();
});

// Mobile menu toggle (if needed)
// const mobileMenuButton = document.createElement('button');
// mobileMenuButton.className = 'mobile-menu-button';
// mobileMenuButton.innerHTML = '☰';
// document.querySelector('.nav').prepend(mobileMenuButton);

// mobileMenuButton.addEventListener('click', function() {
// const navLinks = document.querySelector('.nav-links');
// navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
// });