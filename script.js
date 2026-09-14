// =========================================================
// Rishab Batra — Portfolio JavaScript
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const year = document.getElementById("year");

    // Current year in footer
    year.textContent = new Date().getFullYear();

    // Mobile navigation
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close mobile menu after clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    // Highlight the navigation item for the section currently visible
    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navItems.forEach((item) => {
                        item.classList.toggle(
                            "active",
                            item.getAttribute("href") === `#${entry.target.id}`
                        );
                    });
                }
            });
        },
        {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    // Reveal sections as they enter the viewport
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("visible"));
    }
});
