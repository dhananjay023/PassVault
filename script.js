document.addEventListener("DOMContentLoaded", function () {
    loadPasswords(); // Load saved passwords from localStorage
    
});
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}

// **Toggle password visibility in input field**
function togglePassword() {
    let passwordField = document.getElementById("password");
    let eyeIcon = document.querySelector(".eye-icon i");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passwordField.type = "password";
        eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

// **Save password and update storage**
document.getElementById("password-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let website = document.getElementById("website").value.trim();
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (website && username && password) {
        let savedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];

        savedPasswords.push({ website, username, password });
        localStorage.setItem("passwords", JSON.stringify(savedPasswords));

        document.getElementById("password-form").reset();
        updateStrengthMeter(""); // Reset strength meter

        // **Trigger event for saved-passwords.js to update UI**
        localStorage.removeItem("passwordUpdate");
        localStorage.setItem("passwordUpdate", Date.now());
    }
});

// **Password Strength Meter**
document.getElementById("password").addEventListener("input", function () {
    updateStrengthMeter(this.value);
});

function updateStrengthMeter(password) {
    let strengthText = document.getElementById("password-strength-text");
    let strengthBar = document.getElementById("password-strength-bar");

    let strength = getPasswordStrength(password);

    if (strength === 0) {
        strengthText.innerText = "";
        strengthBar.style.width = "0%";
    } else if (strength === 1) {
        strengthText.innerText = "Weak";
        strengthBar.style.width = "33%";
        strengthBar.style.backgroundColor = "red";
    } else if (strength === 2) {
        strengthText.innerText = "Medium";
        strengthBar.style.width = "66%";
        strengthBar.style.backgroundColor = "orange";
    } else if (strength === 3) {
        strengthText.innerText = "Strong";
        strengthBar.style.width = "100%";
        strengthBar.style.backgroundColor = "green";
    }
}

// **Calculate password strength**
function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[\W]/)) strength++;
    return Math.min(strength, 3);
}
