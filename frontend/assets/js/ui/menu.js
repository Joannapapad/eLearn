async function loadlayout() {
    const headerHTML = await fetch("../frontend/components/header.html")
        .then(res => res.text());

    document.querySelector("header").innerHTML = headerHTML;

    initNavMenu();
}

loadlayout();

function initNavMenu() {
    const checkbox = document.querySelector("#menu_checkbox");
    const primaryNav = document.querySelector(".nav");
    const navToggleButton = document.querySelector(".nav-toggle");

    if (!checkbox || !primaryNav || !navToggleButton) {
        console.error("Menu elements not found");
        return;
    }

    checkbox.addEventListener("change", () => {
        const isOpen = checkbox.checked;

        primaryNav.setAttribute("data-visible", isOpen);
        navToggleButton.setAttribute("aria-expanded", isOpen);
    });
}
