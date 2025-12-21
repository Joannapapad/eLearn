// src/components/footer.js

export function renderFooter(container) {
    if (!container) return;
  
    container.innerHTML = `
      <footer class="footer">
        <div class="footer-container">
  
          <section class="footer-section categories">
            <h3>Course Categories</h3>
            <ul>
              <li><a href="#" data-link>Programming</a></li>
              <li><a href="#" data-link>Networks</a></li>
              <li><a href="#" data-link>Security</a></li>
              <li><a href="#" data-link>Databases</a></li>
            </ul>
          </section>
  
          <section class="footer-section resources">
            <h3>Books & Videos</h3>
            <ul>
              <li><a href="#" data-link>Recommended Books</a></li>
              <li><a href="#" data-link>Recommended Videos</a></li>
              <li><a href="#" data-link>Course Guides</a></li>
            </ul>
          </section>
  
          <section class="footer-section contact">
            <h3>Contact</h3>
            <ul class="social-links">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
            <p>Email: <a href="mailto:info@elearn.com">info@elearn.com</a></p>
            <p><a href="#" data-link>Our Team</a></p>
          </section>
  
        </div>
  
        <div class="footer-bottom">
          <p>&copy; 2025 eLearn. All rights reserved.</p>
        </div>
      </footer>
    `;
  }
  