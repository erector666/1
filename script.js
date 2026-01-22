// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinksContainer = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    if (navLinksContainer.classList.contains('active')) {
        navLinksContainer.style.display = 'flex';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '100%';
        navLinksContainer.style.left = '0';
        navLinksContainer.style.right = '0';
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.background = 'white';
        navLinksContainer.style.padding = '20px';
        navLinksContainer.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    } else {
        navLinksContainer.style.display = 'none';
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 968) {
            navLinksContainer.style.display = 'none';
            navLinksContainer.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-animate');
    observer.observe(section);
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateName(name) {
    return name.trim().length >= 2;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Real-time validation
function setupRealTimeValidation(input, validator, errorElement, errorMessage) {
    input.addEventListener('blur', function() {
        if (input.value && !validator(input.value)) {
            errorElement.textContent = errorMessage;
            input.style.borderColor = '#dc3545';
        } else {
            errorElement.textContent = '';
            input.style.borderColor = '#e1e4e8';
        }
    });

    input.addEventListener('input', function() {
        if (input.value && validator(input.value)) {
            errorElement.textContent = '';
            input.style.borderColor = '#10b981';
        }
    });
}

// Setup validation for each field
if (nameInput) {
    setupRealTimeValidation(
        nameInput,
        validateName,
        document.getElementById('nameError'),
        'Name must be at least 2 characters'
    );
}

if (emailInput) {
    setupRealTimeValidation(
        emailInput,
        validateEmail,
        document.getElementById('emailError'),
        'Please enter a valid email address'
    );
}

if (messageInput) {
    setupRealTimeValidation(
        messageInput,
        validateMessage,
        document.getElementById('messageError'),
        'Message must be at least 10 characters'
    );
}

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate name
        if (!validateName(nameInput.value)) {
            document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
            nameInput.style.borderColor = '#dc3545';
            isValid = false;
        }
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = '#dc3545';
            isValid = false;
        }
        
        // Validate message
        if (!validateMessage(messageInput.value)) {
            document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
            messageInput.style.borderColor = '#dc3545';
            isValid = false;
        }
        
        if (isValid) {
            // In a real application, you would send the data to a server
            console.log('Form submission:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Reset border colors
            nameInput.style.borderColor = '#e1e4e8';
            emailInput.style.borderColor = '#e1e4e8';
            messageInput.style.borderColor = '#e1e4e8';
        }
    });
}

// CTA Button scroll to features
const ctaButton = document.querySelector('.btn-primary');
if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#features') {
            e.preventDefault();
            const featuresSection = document.getElementById('features');
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = featuresSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}