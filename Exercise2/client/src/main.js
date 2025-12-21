// CSS (τώρα με σωστά μονοπάτια για Vite)
import '/assets/css/reset.css';
import '/assets/css/theme.css';
import '/assets/css/menu.css';
import '/assets/css/components.css';
import '/assets/css/layout.css';



import { renderNavbar } from "./components/navbar.js";
import { renderFooter } from "./components/footer.js";

import { loadHome } from "./pages/home.js";
import { loadCourses } from "./pages/courses.js";

import { loadBooks } from "./pages/books.js";
import { loadCourseDetails } from "./pages/course-details.js";
import { loadRegister } from "./pages/register.js";
import { loadAbout } from "./pages/about.js";

// Αρχικοποίηση UI components
document.addEventListener('DOMContentLoaded', () => {

    
    const app = document.getElementById("app");
    const nav = document.getElementById("navbar");
    const footer = document.getElementById("footer");

    renderNavbar(nav);
    renderFooter(footer);
    
    // Router
    const routes = {
        '/': () => loadHome(app),
        '/courses': () => loadCourses(app),
        '/books': () => loadBooks(app),
        '/course/:id': (id) => loadCourseDetails(app, id),
        '/register': () => loadRegister(app),
        '/about': () => loadAbout(app)
    };
    
    async function router() {
      const hash = window.location.hash.slice(1) || '/';
      for (let route of Object.keys(routes)) {
        const pattern = new RegExp('^' + route.replace(/:\w+/g, '([^/]+)') + '$');
        const match = hash.match(pattern);
        if (match) {
          const params = match.slice(1);
          await routes[route](...params); // pass id to loadCourseDetails
          return;
        }
      }
      app.innerHTML = "<h2>Page not found</h2>";
    }
    
    
    
    
    
      
    
    // SPA navigation
    document.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            window.location.hash = e.target.getAttribute('href');
        }
    });
    
    window.addEventListener("hashchange", router);
    router();
});