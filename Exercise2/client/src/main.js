
// CSS imports 
import "/assets/css/reset.css";
import "/assets/css/theme.css";
import "/assets/css/menu.css";
import "/assets/css/components.css";
import "/assets/css/layout.css";

import { renderNavbar } from "./components/navbar.js";
import { renderFooter } from "./components/footer.js";

import { loadHome } from "./pages/home.js";
import { loadCourses } from "./pages/courses.js";
import { loadBooks } from "./pages/books.js";
import { loadBookDetails } from "./pages/book-details.js";
import { loadCourseDetails } from "./pages/course-details.js";
import { loadRegister } from "./pages/register.js";
import { loadAbout } from "./pages/about.js";

// Initialize the app once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Main layout containers
  const app = document.getElementById("app");
  const nav = document.getElementById("navbar");
  const footer = document.getElementById("footer");

  // Render shared UI components
  renderNavbar(nav);
  renderFooter(footer);

  /*
   Route table (hash-based SPA)
   Each route maps to a page loader function.
  */
  const routes = {
    "/": () => loadHome(app),
    "/courses": () => loadCourses(app),
    "/books": () => loadBooks(app),
    "/book/:id": (id) => loadBookDetails(app, id),
    "/course/:id": (id) => loadCourseDetails(app, id),
    "/register": () => loadRegister(app),
    "/about": () => loadAbout(app),
  };

  /*
    Basic router:
    - Reads window.location.hash
    - Matches it against known routes (including dynamic params)
   */
   
  async function router() {
    // Remove the leading "#" and fallback to home route
    const hash = window.location.hash.slice(1) || "/";
    const [path, queryString] = hash.split("?");

    // Parse query parameters into a URLSearchParams object
    const query = new URLSearchParams(queryString);

    // Try to match current path with any registered route pattern
    for (let route of Object.keys(routes)) {
      // Convert "/course/:id" into a regex
      const pattern = new RegExp("^" + route.replace(/:\w+/g, "([^/]+)") + "$");
      const match = path.match(pattern);

      if (match) {
        // Extract dynamic params
        const params = match.slice(1);

        // Pass params and query to the page loader
        // (pages that don't need query can simply ignore it)
        await routes[route](...params, query);
        return;
      }
    }

  
  }

  /*
    SPA navigation:
    Any link with data-link will be handled internally (no full page reload).
    We update the hash and let the router render the correct page.
   */
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      window.location.hash = e.target.getAttribute("href");
    }
  });

  // Re-render page on route changes
  window.addEventListener("hashchange", router);

  // Initial route render
  router();
});
