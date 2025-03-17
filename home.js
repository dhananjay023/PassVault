document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scroll for "Get Started" Button
    document.getElementById("getStartedBtn").addEventListener("click", function () {
        document.getElementById("features").scrollIntoView({
            behavior: "smooth"
        });
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    if (themeToggle) {
        // Function to toggle dark mode
        function toggleDarkMode() {
            body.classList.toggle("dark-mode");
            updateIcon();
            saveTheme();
        }

        // Function to update the icon
        function updateIcon() {
            themeToggle.style.opacity = "0";  // Fade out effect
        
            setTimeout(() => {
                themeToggle.innerHTML = body.classList.contains("dark-mode") ? "☀️" : "🌙"; // Switch icon
                themeToggle.style.opacity = "1";  // Fade in effect
            }, 200);  // Small delay for smooth transition
        }
        
        

        // Function to save theme state
        function saveTheme() {
            localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
        }

        // Apply saved theme state
        if (localStorage.getItem("darkMode") === "enabled") {
            body.classList.add("dark-mode");
            updateIcon();
        }

        // Add click event listener
        themeToggle.addEventListener("click", toggleDarkMode);
    } else {
        console.warn("Dark mode toggle button not found!");
    }

    // GSAP Animations
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

    gsap.utils.toArray(".step").forEach((step, index) => {
        gsap.to(step, {
            scrollTrigger: { 
                trigger: step, 
                start: "top 85%", 
                toggleActions: "play none none reverse" 
            },
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.2,
            ease: "power2.out"
        });
    });

    gsap.utils.toArray(".stat").forEach((stat, index) => {
        gsap.to(stat, {
            scrollTrigger: { 
                trigger: stat, 
                start: "top 90%" 
            },
            opacity: 1,
            duration: 1,
            delay: index * 0.3,
            ease: "power2.out"
        });
    });

    // Counter Effect
    function animateCounter(id, target) {
        let count = { value: 0 };
        gsap.to(count, {
            value: target,
            duration: 3,
            ease: "power1.out",
            onUpdate: function () {
                document.getElementById(id).textContent = Math.floor(count.value);
            }
        });
    }

    // Start Counters When Stats Section is Reached
    ScrollTrigger.create({
        trigger: "#stats",
        start: "top 90%",
        onEnter: function () {
            animateCounter("passwordsCount", 500);
            animateCounter("usersCount", 1000);
        }
    });

});
