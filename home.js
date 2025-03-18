document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const menuIcon = menuToggle.querySelector("i"); // Get the icon
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    function toggleMenu() {
        const navLinks = document.querySelector(".nav-links");
        navLinks.classList.toggle("active");
    }
    // ✅ Get Started Button Smooth Scroll
    const getStartedBtn = document.getElementById("getStartedBtn");
    if (getStartedBtn) {
        getStartedBtn.addEventListener("click", function () {
            document.getElementById("features").scrollIntoView({ behavior: "smooth" });
        });
    }

    // ✅ Menu Toggle Functionality
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");

            // ✅ Optional: Toggle menu icon (☰ -> ✖)
            const menuIcon = menuToggle.querySelector("i");
            if (menuIcon) {
                menuIcon.classList.toggle("fa-bars");
                menuIcon.classList.toggle("fa-times");
            }
        });

        // ✅ Close menu when clicking a link
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");

                // ✅ Ensure menu icon resets to ☰
                const menuIcon = menuToggle.querySelector("i");
                if (menuIcon) {
                    menuIcon.classList.add("fa-bars");
                    menuIcon.classList.remove("fa-times");
                }
            });
        });
    } else {
        console.error("⚠️ Menu toggle or nav-links element not found.");
    }

    // ✅ Dark Mode Toggle
    if (themeToggle) {
        function toggleDarkMode() {
            body.classList.toggle("dark-mode");
            updateIcon();
            saveTheme();
        }

        function updateIcon() {
            themeToggle.style.opacity = "0"; // Fade out
            setTimeout(() => {
                themeToggle.innerHTML = body.classList.contains("dark-mode") ? "☀️" : "🌙";
                themeToggle.style.opacity = "1"; // Fade in
            }, 200);
        }

        function saveTheme() {
            localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
        }

        // ✅ Apply saved theme on load
        if (localStorage.getItem("darkMode") === "enabled") {
            body.classList.add("dark-mode");
            updateIcon();
        }

        themeToggle.addEventListener("click", toggleDarkMode);
    } else {
        console.warn("⚠️ Dark mode toggle not found.");
    }

    // ✅ GSAP Animations
    gsap.from(".hero-content", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out"
    });

    gsap.utils.toArray(".feature").forEach((feature, index) => {
        gsap.from(feature, {
            scrollTrigger: {
                trigger: "#features",
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out"
        });
    });

    gsap.utils.toArray(".feature, .step").forEach((element, index) => {
        gsap.to(element, {
            scrollTrigger: { trigger: element, start: "top 90%" },
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.3,
            ease: "power2.out"
        });
    });

    // ✅ Counter Animation
    const counters = document.querySelectorAll(".counter");
    const speed = 150; // Adjust speed

    counters.forEach(counter => {
        function updateCount() {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        }

        updateCount();
    });
});