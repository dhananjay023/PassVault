document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    navLinks.style.display = "none";

    function toggleMenu() {
        if (mobileQuery.matches) {
            navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
            updateMenuIcon();
        }
    }
    // ✅ Toggle Menu (Only in Mobile View)
    function toggleMenu() {
        if (navLinks.style.display === "none" || navLinks.style.display === "") {
            navLinks.style.display = "flex"; // Show menu
        } else {
            navLinks.style.display = "none"; // Hide menu
        }
        updateMenuIcon();
    }
    function updateMenuIcon() {
        const menuIcon = menuToggle.querySelector("i");
        if (menuIcon) {
            const isActive = navLinks.style.display === "flex";
            menuIcon.classList.toggle("fa-bars", !isActive);
            menuIcon.classList.toggle("fa-times", isActive);
        }
    }
    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMenu);
    }

    function handleResize() {
        if (mobileQuery.matches) {
            navLinks.style.display = "none"; // Hide menu in mobile
        } else {
            navLinks.style.display = "flex"; // Show menu in desktop
        }
        updateMenuIcon();
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Run on load to set the correct state
    // ✅ Close menu when clicking a link (Only in Mobile View)
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function () {
            if (mobileQuery.matches) {
                navLinks.style.display = "none";
                updateMenuIcon();
            }
        });
    });
    // ✅ Close menu if clicking outside (optional)
    document.addEventListener("click", function (event) {
        if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.style.display = "none";
            updateMenuIcon();
        }
    });
    // ✅ Get Started Smooth Scroll
    const getStartedBtn = document.getElementById("getStartedBtn");
    if (getStartedBtn) {
        getStartedBtn.addEventListener("click", function () {
            document.getElementById("features").scrollIntoView({ behavior: "smooth" });
        });
    }

    // ✅ Dark Mode Toggle
    function toggleDarkMode() {
        body.classList.toggle("dark-mode");
        updateDarkModeIcon();
        localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
    }

    function updateDarkModeIcon() {
        themeToggle.style.opacity = "0"; // Fade out
        setTimeout(() => {
            themeToggle.innerHTML = body.classList.contains("dark-mode") ? "☀️" : "🌙";
            themeToggle.style.opacity = "1"; // Fade in
        }, 200);
    }

    // ✅ Apply saved theme on load
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }
    updateDarkModeIcon();

    if (themeToggle) {
        themeToggle.addEventListener("click", toggleDarkMode);
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
            delay: index * 0.1,
            ease: "power2.out"
        });
    });

    // ✅ Counter Animation
    const counters = document.querySelectorAll(".counter");
    const speed = 150;

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
