document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.querySelector("#menu_checkbox");
    const primaryNav = document.querySelector(".nav");
    const navToggleButton = document.querySelector(".nav-toggle");

    checkbox.addEventListener("change", () => {
        const isOpen = checkbox.checked;

        primaryNav.setAttribute("data-visible", isOpen);
        navToggleButton.setAttribute("aria-expanded", isOpen);
    });
});
