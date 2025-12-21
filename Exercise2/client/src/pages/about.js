export function loadAbout(container) {
  if (!container) return;

  container.innerHTML = `
    <main class="about-us">

      <div class="about-container">
        <div class="about-text">
          <h1>About Us</h1>
          <h2>Empowering Learning, Anytime, Anywhere</h2>
          <div class="boo">
            Our e-learning platform provides high-quality online courses to help students, professionals, and lifelong learners achieve their educational goals.
            We focus on interactive, engaging content that can be accessed anytime and anywhere, supporting a flexible and personalized learning experience.
          </div>
        </div>

        <div class="about-image">
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
        </div>
      </div>

      <div class="stats">
        <div class="stat-item">
          <h3>25</h3>
          <p>Courses Available</p>
        </div>
        <div class="stat-item two">
          <h3>20</h3>
          <p>Books Available</p>
        </div>
        <div class="stat-item three">
          <h3>13</h3>
          <p>Category</p>
        </div>
      </div>

      <section class="creators">
        <div class="creator">
          <div class="creator-info">
            <h3>Ioanna Papadakaki</h3>
            <p><strong>Email:</strong> p3220148@aueb.gr</p>
            <p><strong>Student ID:</strong> 3220148</p>
            <p>A passionate web developer who loves creating interactive learning experiences.</p>
          </div>
          <div class="creator-image">
            <img src="/assets/img/iwanna.jpg" alt="Ioanna Papadakaki">
          </div>
        </div>

        <div class="creator">
          <div class="creator-info">
            <h3>Fani Tsiokani</h3>
            <p><strong>Email:</strong> p3220214@aueb.gr</p>
            <p><strong>Student ID:</strong> 3220214</p>
            <p>Focused on UI/UX design and improving user experience in e-learning platforms.</p>
          </div>
          <div class="creator-image">
            <img src="/assets/img/theofani.jpg" alt="Fani Tsiokani">
          </div>
        </div>
      </section>

    </main>
  `;

  animateStats();
}

function animateStats() {
  const counters = document.querySelectorAll(".stat-item h3");
  if (!counters.length) return;

  const duration = 2000;

  counters.forEach(counter => {
    const target = parseInt(counter.textContent, 10);
    let start = null;

    function update(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const value = Math.min(
        Math.floor((progress / duration) * target),
        target
      );

      counter.textContent = value.toLocaleString();

      if (progress < duration) {
        requestAnimationFrame(update);
      }
    }

    counter.textContent = "0";
    requestAnimationFrame(update);
  });
}

