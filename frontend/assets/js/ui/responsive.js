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
});
