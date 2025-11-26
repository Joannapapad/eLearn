async function loadlayout() {
    const header = await fetch("../../../frontend/components/header.html").then(res => res.text());
    //const footer = await fetch("../../../frontend/components/footer.html").then(res => res.text());

    document.querySelector("header").innerHTML = header;
    //document.querySelector("footer").innerHTML = footer;
}

loadlayout();



document.body.addEventListener('click', (event) => {

    // This now detects clicks on the checkbox, label, or divs inside
    const navToggle = event.target.closest('button.nav-toggle');

    if (!navToggle) return;

    const primaryNav = document.querySelector('.nav');
    const visibility = primaryNav.getAttribute('data-visible') === "true";

    primaryNav.setAttribute("data-visible", !visibility);
    navToggle.setAttribute("aria-expanded", !visibility);

});
