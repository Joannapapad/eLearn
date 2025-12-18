document.addEventListener("DOMContentLoaded", () => {
  loadlayout();
});


async function loadlayout() {
    //fetch and inject the header HTML
    const headerHTML = await fetch("../frontend/components/header.html")
        .then(res => res.text());

    document.querySelector("header").innerHTML = headerHTML;

    //fetch and inject the footer HTML
    const footerHTML = await fetch("../frontend/components/footer.html")
    .then(res => res.text());

document.querySelector("footer").innerHTML = footerHTML;

    //after header/footer are injected, initialize interactions
    initNavMenu();
    initScrollHeader(); 
}


/*Monile menu open/close */
function initNavMenu() {

    //elements used for the menu
    const checkbox = document.querySelector("#menu_checkbox");
    const primaryNav = document.querySelector(".nav");
    const navToggleButton = document.querySelector(".nav-toggle");

    //if layout did not load correctly
    if (!checkbox || !primaryNav || !navToggleButton) {
        console.error("Menu elements not found");
        return;
    }

    //when the checkbox changes, open/close the navigation panel
    checkbox.addEventListener("change", () => {
        const isOpen = checkbox.checked;

        primaryNav.setAttribute("data-visible", isOpen);
        navToggleButton.setAttribute("aria-expanded", isOpen);
    });
}

function initScrollHeader() {
    const header = document.querySelector(".header");

    if (!header) {
        console.error("Header not found for scroll effect");
        return;
    }

    function handleScroll() {
        if (window.innerWidth > 800) {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        } else {
            // remove scroll styling if user shrinks the window
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); 
}