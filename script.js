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

    if (!typingText) {
        return;
    }

    const currentRole = roles[roleIndex];


    /* =========================
       TYPING
    ========================= */

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;


        if (charIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1600);

            return;
        }


        setTimeout(typeEffect, 70);

        return;
    }


    /* =========================
       DELETING
    ========================= */

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


typeEffect();


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");

const navItems =
    document.querySelectorAll(".nav-link");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");

        navLinks.classList.toggle("open");

    });

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

navItems.forEach(link => {

    link.addEventListener("click", () => {

        if (menuToggle) {
            menuToggle.classList.remove("active");
        }

        if (navLinks) {
            navLinks.classList.remove("open");
        }

    });

});


/* =========================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", event => {

    if (!navLinks || !menuToggle) {
        return;
    }


    if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {

        navLinks.classList.remove("open");

        menuToggle.classList.remove("active");

    }

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");


function updateActiveNav() {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionBottom =
            sectionTop + section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
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
    updateActiveNav,
    { passive: true }
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
   PROJECT CARD 3D TILT
========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(card => {


    card.addEventListener("mousemove", event => {

        /* Disable tilt on touch-sized screens */

        if (window.innerWidth <= 700) {
            return;
        }


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
            ((y - centerY) / centerY) * -2.5;

        const rotateY =
            ((x - centerX) / centerX) * 2.5;


        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg)";

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

    if (window.innerWidth > 900) {

        if (navLinks) {
            navLinks.classList.remove("open");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");
        }

    }

});


/* =========================================================
   INITIAL NAVIGATION CHECK
========================================================= */

updateActiveNav();