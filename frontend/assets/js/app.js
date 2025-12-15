document.addEventListener("DOMContentLoaded", () => {
    
   const fadeSections = document.querySelectorAll(".fade-section");

  if (fadeSections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    }, { threshold: 0.2 });

    fadeSections.forEach(sec => observer.observe(sec));
  }
        

   
    if(window.location.pathname.includes("index.html")) {


        //click in cateogiry boxes
        const categoryCards = document.querySelectorAll(".category");

        categoryCards.forEach(card => {
            card.style.cursor= "pointer";
            card.addEventListener("click" ,() =>{
                const categoryKey = card.dataset.category;
                window.location.href = `courses.html?category=${categoryKey}`;
            });
        });



        if (typeof COURSES !== "undefined") {
          const featuredCoursesEl = document.getElementById("featured-courses-main");
          if (featuredCoursesEl) {
              const preferred = ["programming", "networks", "security", "databases", "core", "mathematics", "systems", "ai", "engineering", "design", "data"];
      
              // pick one course per preferred category
              const uniqueCourses = [];
              const seen = new Set();
              for (const c of COURSES) {
                  if (!seen.has(c.id)) {
                      uniqueCourses.push(c);
                      seen.add(c.id);
                  }
              }
      
              const picked = [];
              for (const cat of preferred) {
                  const found = uniqueCourses.find(c => c.category === cat);
                  if (found) picked.push(found);
                  if (picked.length === 11) break;
              }
      
              // render the courses using the same structure as courses.html
              function renderFeaturedCourses(items) {
                  featuredCoursesEl.innerHTML = items.map(c => `
                      <div class="course-card main-page-card" data-id="${c.id}">
                          <div class="main-page">
                              <img src="assets/img/courses/${c.image}" alt="${c.title}">
                          </div>
                          <div class="card-header">
                              <h3 class="main-course-title">${c.title}</h3>
                              <div class="course-category-icon">
                                  <img src="assets/img/icons/${c.category}.png" alt="${c.category}">
                              </div>
                          </div>
                      </div>
                  `).join('');
      
                  featuredCoursesEl.querySelectorAll('.course-card').forEach(card => {
                      card.addEventListener('click', () => {
                          window.location.href = `course-details.html?id=${card.dataset.id}`;
                      });
                  });
              }
      
              renderFeaturedCourses(picked);
      
              // slider buttons (optional, keep existing)
              const prevBtn = document.querySelector(".slider-btn.prev");
              const nextBtn = document.querySelector(".slider-btn.next");
      
              function scrollCourseCard(d) {
                  const card = featuredCoursesEl.querySelector(".course-card");
                  if (!card) return;
                  const gap = 16;
                  const amount = card.getBoundingClientRect().width + gap;
                  featuredCoursesEl.scrollBy({ left: d * amount, behavior: "smooth" });
              }
      
              prevBtn?.addEventListener("click", () => scrollCourseCard(-1));
              nextBtn?.addEventListener("click", () => scrollCourseCard(1));
          }
      }
      
    
}

});


