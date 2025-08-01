// Smooth scrolling and animations
document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Add animate-on-scroll to various elements
  const animateElements = [
    '.project-card',
    '.skill-category',
    '.achievement-card',
    '.timeline-item',
    '.course-card',
    '.focus-card',
    '.path-phase'
  ];

  animateElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Back to top button
  const backToTopButton = document.createElement('button');
  backToTopButton.className = 'back-to-top';
  backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTopButton);

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Show/hide back to top button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  // Add stagger animation to lists
  document.querySelectorAll('.project-grid, .skills-grid, .achievements-grid').forEach(grid => {
    grid.classList.add('stagger-animation');
  });

  // Dropdown menu toggle
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdown = document.querySelector('.dropdown');
  
  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  }

  // Add active class to current navigation item
  const currentPath = window.location.pathname;
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Parallax effect for hero background
  const heroContainer = document.querySelector('.hero-container');
  if (heroContainer) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -0.5;
      heroContainer.style.transform = `translateY(${rate}px)`;
    });
  }

  // Mouse trail effect
  let mouseTrail = [];
  const trailLength = 20;

  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'mouse-trail-dot';
    document.body.appendChild(dot);
    mouseTrail.push(dot);
  }

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTrail() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    mouseTrail.forEach((dot, index) => {
      const scale = (trailLength - index) / trailLength;
      const delay = index * 0.05;
      
      setTimeout(() => {
        dot.style.left = currentX + 'px';
        dot.style.top = currentY + 'px';
        dot.style.transform = `translate(-50%, -50%) scale(${scale})`;
        dot.style.opacity = scale * 0.5;
      }, delay * 1000);
    });

    requestAnimationFrame(animateTrail);
  }

  // Uncomment to enable mouse trail
  // animateTrail();
});

// Add CSS for mouse trail
const style = document.createElement('style');
style.textContent = `
  .mouse-trail-dot {
    position: fixed;
    width: 8px;
    height: 8px;
    background: var(--accent-blue);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease-out;
    display: none; /* Hidden by default */
  }
`;
document.head.appendChild(style);