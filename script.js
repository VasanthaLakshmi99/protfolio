document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  // Toggle mobile navigation
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // --- NEW, SIMPLER SCROLL ANIMATION ---
  function checkAndAnimate() {
    const triggerBottom = window.innerHeight * 0.85; // Set the trigger point

    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top; // Get element's position

      if (elementTop < triggerBottom) {
        element.classList.add('visible');
      }
    });
  }

  // Run the check when the page loads and on every scroll
  window.addEventListener('scroll', checkAndAnimate);
  checkAndAnimate(); // Run once on load for elements already in view

  // --- Hide Nav on Scroll Down, Show on Scroll Up ---
  let lastScrollTop = 0;
  const navbar = document.querySelector('nav');
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.top = '-80px';
    } else {
      navbar.style.top = '0';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, false);
});
