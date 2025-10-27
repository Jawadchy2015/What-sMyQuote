// Wait for the entire HTML document to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Select all the elements we need to control ---
    
    // Form Containers
    const loginFormContainer = document.getElementById('loginFormContainer');
    const signupFormContainer = document.getElementById('signupFormContainer');

    // Bottom "Login/Signup With" text
    const lsHeading = document.getElementById('lsHeading');

    // Large Screen Toggles
    const largeLoginBtn = document.getElementById('largeLoginBtn');
    const largeSignupBtn = document.getElementById('largeSignupBtn');

    // Small Screen Toggle
    const smallScreenToggle = document.getElementById('smallScreenToggle');
    
    
    // --- 2. Create functions to show/hide the forms ---

    function showLogin() {
        // Show login form, hide signup form
        loginFormContainer.classList.remove('d-none');
        signupFormContainer.classList.add('d-none');
        
        // Update "LOGIN/SIGNUP WITH" text
        lsHeading.textContent = 'LOGIN WITH';
        
        // Update Large Screen Buttons state
        largeLoginBtn.classList.add('activeBtn');
        largeSignupBtn.classList.remove('activeBtn');
        
        // Update Small Screen Toggle state
        if (smallScreenToggle) {
            smallScreenToggle.checked = false; // 'false' is the login state
        }
    }

    function showSignup() {
        // Hide login form, show signup form
        loginFormContainer.classList.add('d-none');
        signupFormContainer.classList.remove('d-none');

        // Update "LOGIN/SIGNUP WITH" text
        lsHeading.textContent = 'SIGN UP WITH';

        // Update Large Screen Buttons state
        largeLoginBtn.classList.remove('activeBtn');
        largeSignupBtn.classList.add('activeBtn');

        // Update Small Screen Toggle state
        if (smallScreenToggle) {
            smallScreenToggle.checked = true; // 'true' is the signup state
        }
    }
    
    
    // --- 3. Attach Event Listeners to the buttons ---

    // When clicking the large 'Login' button
    largeLoginBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Stop the '#' link from jumping the page
        showLogin();
    });

    // When clicking the large 'Signup' button
    largeSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSignup();
    });

    // When clicking the small screen toggle switch
    smallScreenToggle.addEventListener('change', () => {
        if (smallScreenToggle.checked) {
            // Checkbox is checked (moves to Signup)
            showSignup();
        } else {
            // Checkbox is unchecked (moves to Login)
            showLogin();
        }
    });

});