// Smooth scrolling for navigation links
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
document.querySelector('.contact-form').addEventListener('submit', function(e) {
 e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
 this.reset();
});

// Add subtle animation on scroll
const observerOptions = {
 threshold:0.1,
 rootMargin: '0px0px -50px0px'
};

const observer = new IntersectionObserver(function(entries) {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 entry.target.style.opacity = '1';
 entry.target.style.transform = 'translateY(0)';
 }
 });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
 section.style.opacity = '0';
 section.style.transform = 'translateY(20px)';
 section.style.transition = 'opacity0.6s ease, transform0.6s ease';
 observer.observe(section);
});