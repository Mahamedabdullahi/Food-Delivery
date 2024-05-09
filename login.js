const form = document.getElementById('login-form');
        const errorMessage = document.querySelector('.error-message');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = form.username.value;
            const password = form.password.value;
            const authenticated = authentication(username, password);

            if (authenticated) {
                window.location.href = "order.html"; 
                // Redirect to the order page
            } else {
                // Display an error message
                errorMessage.textContent = "Invalid username or password. Please try again.";
                errorMessage.style.color = "black";
            }
        });
        
const authentication = (username, password) => {
    if (username === "mahamed" && password === "abdullahi") {
        return true;
    } else {
        return false;
    }
};
