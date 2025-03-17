document.addEventListener("DOMContentLoaded", function () {
    let passwordTable = document.getElementById("passwordTable");
    let searchInput = document.getElementById("search");
    let sortSelect = document.getElementById("sort");

    // Theme toggle
    document.getElementById("themeToggle").addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        // Save theme preference in localStorage
        let theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
        localStorage.setItem("theme", theme);

        // Update button icon
        this.textContent = theme === "dark" ? "☀️" : "🌙";
    });

    // Load theme preference from localStorage
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        document.getElementById("themeToggle").textContent = "☀️";
    } else {
        document.getElementById("themeToggle").textContent = "🌙";
    }

    // Load theme preference from localStorage
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }


    function displayPasswords(searchQuery = "", sortOrder = "asc") {
        let savedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];

        if (savedPasswords.length === 0) {
            passwordTable.innerHTML = `<tr><td colspan="4">No passwords saved.</td></tr>`;
            return;
        }

        // Filter passwords based on search query
        if (searchQuery) {
            savedPasswords = savedPasswords.filter(item =>
                item.website.toLowerCase().includes(searchQuery)
            );
        }

        // Sort passwords alphabetically
        savedPasswords.sort((a, b) => {
            let nameA = a.website.toLowerCase();
            let nameB = b.website.toLowerCase();
            return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });

        passwordTable.innerHTML = ""; // Clear table before inserting

        savedPasswords.forEach((item, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.website}</td>
                <td>${item.username}</td>
                <td>
                    <span class="masked-password" id="pass${index}">••••••</span>
                    <button onclick="togglePassword(${index}, '${item.password}')">👁️</button>
                </td>
                <td>
                    <button onclick="copyPassword('${item.password}')">📋 Copy</button>
                    <button onclick="deletePassword(${index})">🗑 Delete</button>
                </td>
            `;
            passwordTable.appendChild(row);
        });
    }

    // Search input event
    searchInput.addEventListener("input", function () {
        displayPasswords(this.value.toLowerCase(), sortSelect.value);
    });

    // Sort by name event
    sortSelect.addEventListener("change", function () {
        displayPasswords(searchInput.value.toLowerCase(), this.value);
    });

    // Toggle password visibility
    window.togglePassword = function (index, actualPassword) {
        let passSpan = document.getElementById(`pass${index}`);
        passSpan.textContent = passSpan.textContent.includes("•") ? actualPassword : "••••••";
    };

    // Copy password to clipboard
    window.copyPassword = function (password) {
        navigator.clipboard.writeText(password).then(() => {
            alert("Password copied to clipboard!");
        });
    };

    // Delete password
    window.deletePassword = function (index) {
        let savedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];
        savedPasswords.splice(index, 1);
        localStorage.setItem("passwords", JSON.stringify(savedPasswords));
        displayPasswords(searchInput.value.toLowerCase(), sortSelect.value);
    };

    displayPasswords(); // ✅ Ensure saved passwords load on page refresh
});
