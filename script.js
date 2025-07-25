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

  // --- Animation on Scroll ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Staggered animation for skill cards
        if (entry.target.classList.contains('skills-grid')) {
          const cards = entry.target.querySelectorAll('.skill-card');
          cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 100}ms`;
          });
        }
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the element is visible
  });

  // Observe all sections and grids that need animation
  const elementsToAnimate = document.querySelectorAll('section, .skills-grid');
  elementsToAnimate.forEach((el) => observer.observe(el));

  // --- Hide Nav on Scroll Down, Show on Scroll Up ---
  let lastScrollTop = 0;
  const navbar = document.querySelector('nav');
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      // Scroll Down
      navbar.style.top = '-80px'; // Hide navbar
    } else {
      // Scroll Up
      navbar.style.top = '0'; // Show navbar
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  }, false);

});
