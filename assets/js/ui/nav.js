document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("menu-toggle");
    const menu = document.getElementById("main-menu");

    toggleBtn.addEventListener("click", () => {
        const isVisible = menu.getAttribute("data-visible") === "true";

        menu.setAttribute("data-visible", !isVisible);
        toggleBtn.setAttribute("aria-expanded", !isVisible);

    });
});