document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Toggle mobile navigation
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // --- NEW and IMPORTANT: Scroll Animation Logic ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // When the element is in view, add the 'visible' class to trigger the animation
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15 // Trigger when 15% of the element is visible
  });

  // Get all sections, add the 'hidden' class to prepare them for animation
  const sectionsToAnimate = document.querySelectorAll('section');
  sectionsToAnimate.forEach((section) => {
    section.classList.add('hidden');
    observer.observe(section); // Start observing the section
  });

  // --- Hide Nav on Scroll Down, Show on Scroll Up ---
  let lastScrollTop = 0;
  const navbar = document.querySelector('nav');
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) { // Add a buffer
      // Scroll Down
      navbar.style.top = '-80px'; // Hide navbar
    } else {
      // Scroll Up
      navbar.style.top = '0'; // Show navbar
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, false);
});
