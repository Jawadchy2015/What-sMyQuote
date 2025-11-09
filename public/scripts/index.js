// Wait for the entire HTML document to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Select all the elements we need to control ---
    
    // Form Containers
    const loginFormContainer = document.getElementById('loginFormContainer');
    const signupFormContainer = document.getElementById('signupFormContainer');
	const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Bottom "Login/Signup With" text
    const lsHeading = document.getElementById('lsHeading');

    // Large Screen Toggles
    const largeLoginBtn = document.getElementById('largeLoginBtn');
    const largeSignupBtn = document.getElementById('largeSignupBtn');
    const signupBtn = document.getElementById('signUpNewUser');

    // Small Screen Toggle
    // const smallScreenToggle = document.getElementById('smallScreenToggle');
    
	// Handle login
	loginForm.addEventListener('submit', async (e) => {
		e.preventDefault(); 
		const email = loginForm.querySelector('input[type="email"]').value;
		const password = loginForm.querySelector('input[type="password"]').value;

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: email, password: password })
			});
			
			const data = await response.json();

			if (response.ok) {
				// --- ⬇️ THIS IS THE CHANGED PART ⬇️ ---
				// NO localStorage.setItem() needed!
				// Just redirect to the dashboard. The browser will
				// automatically send the cookie with this new request.
				window.location.href = '/dashboard'; 
			} else {
				alert('Login failed: ' + data.message);
			}
		} catch (error) {
			console.error('Login error:', error);
			alert('An error occurred during login.');
		}
	});
	// --- Handle Signup Form Submission ---
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get values from the signup form
        const username = signupForm.querySelector('input[placeholder="Enter Username"]').value;
        const email = signupForm.querySelector('input[placeholder="Enter Email"]').value;
        const password = signupForm.querySelector('input[placeholder="Create Password"]').value;

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, email: email, password: password })
            });
            
            const data = await response.json();

            if (response.ok) {
                // Signup successful!
                alert('Signup successful! Please log in.');
                // You can now automatically switch them to the login form
                showLogin(); // Assumes you have this function from the previous step
            } else {
                // Signup failed
                alert('Signup failed: ' + data.message);
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during signup.');
        }
    });
    
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
        // if (smallScreenToggle) {
        //     smallScreenToggle.checked = false; // 'false' is the login state
        // }
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
        // if (smallScreenToggle) {
        //     smallScreenToggle.checked = true; // 'true' is the signup state
        // }
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
    // smallScreenToggle.addEventListener('change', () => {
    //     if (smallScreenToggle.checked) {
    //         // Checkbox is checked (moves to Signup)
    //         showSignup();
    //     } else {
    //         // Checkbox is unchecked (moves to Login)
    //         showLogin();
    //     }
    // });

});