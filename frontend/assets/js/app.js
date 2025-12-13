document.addEventListener("DOMContentLoaded", () => {
    
    if(window.location.pathname.includes("index.html")) {
        const fadeSection = document.querySelector(".fade-section");
        if(fadeSection) {
            const observer = new IntersectionObserver((entries,obs) => {
                entries.forEach(entry=> {
                    if(entry.isIntersecting){
                        entry.target.classList.add("is-visible");
                    }else{
                        entry.target.classList.remove("is-visible");
    
                    }
                })
            }, {threshold:0.2});
            
            observer.observe(fadeSection);
        }

        //click in cateogiry boxes
        const categoryCards = document.querySelectorAll(".category");

        categoryCards.forEach(card => {
            card.style.cursor= "pointer";
            card.addEventListener("click" ,() =>{
                const categoryKey = card.dataset.category;
                window.location.href = `courses.html?category=${categoryKey}`;
            });
        });

    const recommendedCoursesEl = document.getElementById("featured-courses-main");
    if (!recommendedCoursesEl || typeof COURSES === "undefined") return;

    const preferred = ["programming", "networks", "security", "databases", "core", "mathematics", "systems" , "ai" , "engineering" , "design", "data"];

    // unique courses by id (για να μην έχεις διπλά)
    const uniqueCourses = [];
    const seen = new Set();
    for (const c of COURSES) {
      if (!seen.has(c.id)) {
        uniqueCourses.push(c);
        seen.add(c.id);
      }
    }

    // pick 1 from each category (μέχρι 7)
    const picked = [];
    const usedCategories = new Set();

    for (const cat of preferred) {
      const found = uniqueCourses.find(c => c.category === cat);
      if (found) {
        picked.push(found);
        usedCategories.add(found.category);
      }
      if (picked.length === 11) break;
    }

    // render
    function renderHomeCourses(items) {
      recommendedCoursesEl.innerHTML = items.map(c => `
        <article class="course-mini-card" data-id="${c.id}">
          <div class="course-mini-header course-${c.category}">
            <div class="course-mini-top">
              <span class="course-mini-cat">${c.category}</span>
              <span class="course-mini-pill">${c.level}</span>
            </div>
            <h3 class="course-mini-title">${c.title}</h3>
          </div>

          <div class="course-mini-body">
            <p class="course-mini-desc">${c.description}</p>
          </div>
        </article>
      `).join("");

      recommendedCoursesEl.querySelectorAll(".course-mini-card").forEach(card => {
        card.addEventListener("click", () => {
          const id = card.dataset.id;
          window.location.href = `course-details.html?id=${id}`;
        });
      });
    }

    renderHomeCourses(picked);

    const track = document.getElementById("featured-courses-main");
    const prevBtn = document.querySelector(".slider-btn.prev"); 
    const nextBtn = document.querySelector(".slider-btn.next");

    function scrollCourseCard(d) {
        const card = track.querySelector(".course-mini-card");
        if(!card) return;
        const gap = 16;
        const amount = card.getBoundingClientRect().width + gap;
        track.scrollBy({left: d * amount , behavior: "smooth"});
    }

    prevBtn?.addEventListener("click", ()=> scrollCourseCard(-1));
    nextBtn?.addEventListener("click", ()=> scrollCourseCard(1));

}
});


