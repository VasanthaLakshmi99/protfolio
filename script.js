ddocument.addEventListener('DOMContentLoaded', function() {
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

      // Close mobile nav if it's open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
      
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});