// Renders the "About Us" page into the given container element
export function loadAbout(container) {
  // Guard: if container is missing, do nothing to avoid runtime errors
  if (!container) return;

  // Inject the About page HTML (static content + responsive images)
  container.innerHTML = `
    <main class="about-us">

      <div class="about-container">
        <div class="about-text">
          <h1>About Us</h1>
          <h2>Empowering Learning, Anytime, Anywhere</h2>

          <!-- Short platform description -->
          <div class="boo">
            Our e-learning platform provides high-quality online courses to help students, professionals, and lifelong learners achieve their educational goals.
            We focus on interactive, engaging content that can be accessed anytime and anywhere, supporting a flexible and personalized learning experience.
          </div>
        </div>

        <!-- Responsive image: browser picks the best file based on screen size -->
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

      <!-- Statistics section (numbers will be animated by animateStats()) -->
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

      <!-- Creators / authors section -->
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

  // Start the counters animation after the DOM for this page is injected
  animateStats();
}

// Animates the stats numbers from 0 up to their target values
function animateStats() {
  // Select the <h3> elements that contain the target numbers
  const counters = document.querySelectorAll(".stat-item h3");
  if (!counters.length) return;

  // Total animation time (ms)
  const duration = 2000;

  counters.forEach(counter => {
    // Read the final number currently in the HTML (e.g., "25")
    const target = parseInt(counter.textContent, 10);

    // Will store the timestamp of the first animation frame
    let start = null;

    // Called on every animation frame
    function update(timestamp) {
      // Save initial timestamp (first frame) to measure elapsed time
      if (!start) start = timestamp;

      // How much time has passed since animation started
      const progress = timestamp - start;

      // Calculate current value based on progress and clamp to target
      const value = Math.min(
        Math.floor((progress / duration) * target),
        target
      );

      // Display the current animated number (localized format)
      counter.textContent = value.toLocaleString();

      // Keep animating until we reach the duration
      if (progress < duration) {
        requestAnimationFrame(update);
      }
    }

    // Reset counter to 0 before animation starts
    counter.textContent = "0";

    // Kick off the animation loop
    requestAnimationFrame(update);
  });
}
