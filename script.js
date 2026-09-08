/* =========================================================
   TYPING ANIMATION
========================================================= */

const roles = [
    "Data Analyst",
    "Power BI Developer",
    "Business Intelligence Analyst",
    "SQL & Python Enthusiast",
    "Machine Learning Enthusiast"
];

const typingText = document.getElementById("typing-text");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1600);

            return;
        }

        setTimeout(typeEffect, 75);

    } else {

        typingText.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) % roles.length;

            setTimeout(typeEffect, 400);

            return;
        }

        setTimeout(typeEffect, 40);
    }
}

typeEffect();


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");

const navItems =
    document.querySelectorAll(".nav-link");


menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");

    navLinks.classList.toggle("open");

});


/* Close menu after clicking a link */

navItems.forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");

        navLinks.classList.remove("open");

    });

});


/* Close menu if clicking outside */

document.addEventListener("click", event => {

    if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {

        navLinks.classList.remove("open");

        menuToggle.classList.remove("active");

    }

});


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections =
    document.querySelectorAll("section[id]");


function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   PROJECT CARD TILT
========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -3;

        const rotateY =
            ((x - centerX) / centerX) * 3;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(800px) rotateX(0) rotateY(0)";

    });

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const year =
    document.getElementById("year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   RESIZE RESET
========================================================= */

window.addEventListener("resize", () => {

    if (window.innerWidth > 800) {

        navLinks.classList.remove("open");

        menuToggle.classList.remove("active");

    }

});


/* =========================================================
   INITIAL NAV CHECK
========================================================= */

updateActiveNav();