document.addEventListener("DOMContentLoaded", () => {

  const filters = document.querySelectorAll('.filter-group');

  /* MOBILE TOGGLE FILTERS*/
  filters.forEach(f => {
      const header = f.querySelector('.filter-header');
      const opts = f.querySelector('.filter-options');

      //if markup is missing, skip 
      if (!header || !opts) return;

      header.addEventListener('click', () => {
          if (window.innerWidth < 900) {

              const open = opts.classList.contains("open");

              //close all groups first
              document.querySelectorAll(".filter-options").forEach(o => {
                  o.classList.remove("open");
              });

              //if was not open open it 
              if (!open) opts.classList.add("open");
          }
      });
  });

  /*CLOSE ON OUTSIDE CLICK */
  document.addEventListener('click', e => {
      if (window.innerWidth < 900) {
        //if the click is not inside a filter group close it 
          if (!e.target.closest('.filter-group')) {
              document.querySelectorAll('.filter-options')
                  .forEach(o => o.classList.remove("open"));
          }
      }
  });
});
