document.addEventListener("DOMContentLoaded", () => {

  const filters = document.querySelectorAll('.filter-group');

  /* --------------------------
     MOBILE TOGGLE FILTERS
  -----------------------------*/
  filters.forEach(f => {
      const header = f.querySelector('.filter-header');
      const opts = f.querySelector('.filter-options');

      if (!header || !opts) return;

      header.addEventListener('click', () => {
          if (window.innerWidth < 900) {

              const open = opts.classList.contains("open");

              document.querySelectorAll(".filter-options").forEach(o => {
                  o.classList.remove("open");
              });

              if (!open) opts.classList.add("open");
          }
      });
  });

  document.addEventListener('click', e => {
      if (window.innerWidth < 900) {
          if (!e.target.closest('.filter-group')) {
              document.querySelectorAll('.filter-options')
                  .forEach(o => o.classList.remove("open"));
          }
      }
  });

  
    /* ============================
       ABOUT PAGE – STATS COUNTERS
    ============================ */
    const counters = document.querySelectorAll(".stat-item h3");

    if (counters.length) {
        const duration = 2000;

        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/,/g, ''));
            let start = null;

            const updateCounter = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const current = Math.min(
                    Math.floor((progress / duration) * target),
                    target
                );
                counter.textContent = current.toLocaleString();

                if (progress < duration) {
                    requestAnimationFrame(updateCounter);
                }
            };

            requestAnimationFrame(updateCounter);
        });
    }



        const fadeSections = document.querySelectorAll(".fade-section");

        if (fadeSections.length) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              entry.target.classList.toggle("is-visible", entry.isIntersecting);
            });
          }, { threshold: 0.2 });
      
          fadeSections.forEach(sec => observer.observe(sec));
        }

 
});
