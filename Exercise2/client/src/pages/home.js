async function fetchCourses() {
  const res = await fetch("http://localhost:5000/api/courses");
  if (!res.ok) throw new Error("Failed to load courses");
  return res.json();
}

export async function loadHome(container) {

    container.innerHTML = `
      <main class="home-page">
  
        <section class="hero">
          <div class="container flex">
            <div class="hero-content">
              <h1>Build Your <span>Future, <br>Choose </span>Your Computer Science Course</h1>
              <p>Watch Video, Read books and practice with hands-on programming exercises</p>
              <div class="buttons">
                <a href="/courses" data-link class="btn-primary flex">View Courses</a>
                <a href="/register" data-link class="btn-outline flex">Register Now</a>
              </div>
            </div>
          </div>
        </section>
  
        <section class="fade-section">
          <section class="two-column-section main-about-preview">
            <div class="section-container">
              <div class="section-left">
                <span class="section-label">About Us</span>
                <h2>Our e-Learning Platform</h2>
                <p>
                  Our goal is to create a fully functional, static yet dynamically-behaving website that showcases
                  the e-learning service and allows basic user data collection and management entirely in the browser. 
                  We use HTML5 for structure, CSS3 for appearance and layout, and JavaScript for interactivity and logic.
                </p>
  
                <div class="preview-cards">
                  <a href="/courses" data-link class="preview-card">
                    <div class="card-icon">
                      <img src="/assets/img/icons/learning.png" alt="Courses">
                    </div>
                    <div>
                      <h3>Course Categories</h3>
                      <p>We offer categories in IT courses such as programming, networks, security, and databases.</p>
                    </div>
                  </a>
  
                  <a href="/books" data-link class="preview-card">
                    <div class="card-icon">
                      <img src="/assets/img/icons/open-book.png" alt="Books & Videos">
                    </div>
                    <div>
                      <h3>Books and Videos</h3>
                      <p>Users can explore lists of books and videos, view descriptions, and select materials for study.</p>
                    </div>
                  </a>
                </div>
              </div>
  
              <div class="section-right about-preview-image">
                <img
                  src="/assets/img/ebout_main_900.jpg"
                  srcset="
                    /assets/img/ebout_main_480.jpg 480w,
                    /assets/img/ebout_main_900.jpg 900w,
                    /assets/img/ebout_main_1400.jpg 1400w
                  "
                  sizes="(max-width: 600px) 90vw, (max-width: 1024px) 45vw, 500px"
                  alt="About preview"
                  loading="lazy"
                />
                <a href="/about" data-link class="btn-primary">Learn More</a>
              </div>
            </div>
          </section>
        </section>
  
        <section class="fade-section two-column-section recommended-categories">
          <div class="section-container">
            <div class="section-left categories-left">
              <h1>Recommended Categories</h1>
              <p>
                Explore some of our most popular learning paths, carefully selected to help you
                build strong foundations and in-demand skills.
              </p>
              <a href="/courses" data-link class="btn-primary">View All Categories</a>
            </div>
  
            <div class="section-right categories-right">
              <a href="/courses?category=programming" data-link class="category-link">
                <article class="category" data-category="programming">
                  <div class="category-icon">
                    <img src="/assets/img/icons/programming.png" alt="Programming">
                  </div>
                  <h3>Programming</h3>
                  <p>Learn HTML, CSS, JavaScript and build real-world applications.</p>
                </article>
              </a>
  
              <a href="/courses?category=ai" data-link class="category-link">
                <article class="category" data-category="ai">
                  <div class="category-icon">
                    <img src="/assets/img/icons/ai.png" alt="AI">
                  </div>
                  <h3>Artificial Intelligence</h3>
                  <p>Understand machine learning, neural networks and AI fundamentals.</p>
                </article>
              </a>
  
              <a href="/courses?category=data" data-link class="category-link">
                <article class="category" data-category="data">
                  <div class="category-icon">
                    <img src="/assets/img/icons/data.png" alt="Data">
                  </div>
                  <h3>Data Science</h3>
                  <p>Analyze, visualize and extract insights from complex datasets.</p>
                </article>
              </a>
  
              <a href="/courses?category=security" data-link class="category-link">
                <article class="category" data-category="security">
                  <div class="category-icon">
                    <img src="/assets/img/icons/security.png" alt="Security">
                  </div>
                  <h3>Cyber Security</h3>
                  <p>Learn how to protect systems, networks and digital information.</p>
                </article>
              </a>
            </div>
          </div>
        </section>
  
        <section class="fade-section featured-courses">
          <h1>Recommended Courses</h1>
          <p>One course for each category</p>
  
          <div class="slider">
            <button class="slider-btn prev" type="button">‹</button>
            <div class="slider-viewport">
              <div id="featured-courses-main" class="slider-track"></div>
            </div>
            <button class="slider-btn next" type="button">›</button>
          </div>
          <a href="/courses" data-link class="btn-primary">Explore</a>
        </section>
  
      </main>
    `;

    document.body.classList.add("page-loaded");

    /* FADE-IN SECTIONS*/
    const fadeSections = document.querySelectorAll(".fade-section");
    if (fadeSections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle("is-visible", entry.isIntersecting);
            });
        }, { threshold: 0.2 });

        fadeSections.forEach(sec => observer.observe(sec));
    }

    /*  CATEGORY CARDS CLICK */
    const categoryCards = document.querySelectorAll(".category");
    categoryCards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
            const categoryKey = card.dataset.category;
            window.location.hash = `/courses?category=${categoryKey}`;
          });
    });

    /* FEATURED COURSES */
    const featuredCoursesEl = document.getElementById("featured-courses-main");
    if (!featuredCoursesEl) {
        console.error("featuredCoursesEl not found!");
        return;
    }
    console.log("featuredCoursesEl found");

    let allCourses = [];
    try {
        allCourses = await fetchCourses();
        console.log("allCourses fetched:", allCourses);
    } catch (err) {
        console.error("Failed to fetch courses:", err);
        featuredCoursesEl.innerHTML = "<p>Unable to load courses</p>";
        return;
    }
   //remove duplicates by _id
const uniqueCourses = [];
const seen = new Set();

for (const c of allCourses) {
    if (!seen.has(c._id)) {
        uniqueCourses.push(c);
        seen.add(c._id);
    }
}

//pick up 11 courses one per category 
const picked = [];
const preferred = ["programming", "networks", "security", "databases", "core", "mathematics", "systems", "ai", "engineering", "design", "data"];

for (const cat of preferred) {
    const found = uniqueCourses.find(c => c.category === cat);
    if (found) picked.push(found);
    if (picked.length === 11) break;
}


    //render slider cards
    function renderFeaturedCourses(items) {
        featuredCoursesEl.innerHTML = items.map(c => `
            <div class="course-card main-page-card" data-id="${c._id}">
                <div class="main-page">
                    <img src="assets/img/courses/${c._id}.png" alt="${c.title}">
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

    /* FEATURED COURSES SLIDER */
    const prevBtn = document.querySelector(".slider-btn.prev");
    const nextBtn = document.querySelector(".slider-btn.next");

    //scroll by one card width 
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
