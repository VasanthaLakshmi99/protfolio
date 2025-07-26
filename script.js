document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

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

  // --- SCROLL ANIMATION LOGIC ---
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // --- NEW: Staggered animation logic for skill cards ---
        if (entry.target.id === 'skills') {
          const skillCards = entry.target.querySelectorAll('.skill-card');
          skillCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 100}ms`;
          });
        }

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15 
  });

  animatedElements.forEach((el) => observer.observe(el));

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
