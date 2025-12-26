document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Password validation (minimum 6 characters)
    function validatePassword(password) {
        return password.length >= 6;
    }

    // Real-time email validation
    emailInput.addEventListener('blur', function() {
        if (emailInput.value && !validateEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = '#dc3545';
        } else {
            emailError.textContent = '';
            emailInput.style.borderColor = '#e1e4e8';
        }
    });

    // Real-time password validation
    passwordInput.addEventListener('blur', function() {
        if (passwordInput.value && !validatePassword(passwordInput.value)) {
            passwordError.textContent = 'Password must be at least 6 characters';
            passwordInput.style.borderColor = '#dc3545';
        } else {
            passwordError.textContent = '';
            passwordInput.style.borderColor = '#e1e4e8';
        }
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = '#dc3545';
            isValid = false;
        }
        
        // Validate password
        if (!validatePassword(passwordInput.value)) {
            passwordError.textContent = 'Password must be at least 6 characters';
            passwordInput.style.borderColor = '#dc3545';
            isValid = false;
        }
        
        if (isValid) {
            // In a real application, you would send the data to a server for authentication
            console.log('Login attempt:', {
                email: emailInput.value,
                remember: document.getElementById('remember').checked
            });
            
            // Show success message (for demo purposes)
            alert('Login successful! (Demo)');
        }
    });
});