const cursor = document.querySelector('.cursor');
const toggleButton = document.querySelector('.nav__toggle-cursor');
let isCustomCursor = true;  // Start with custom cursor active
const cursorcircle = document.querySelector('.cursor');  // New: Select the image
const cursorIcon = document.querySelector('.cursorico');  // New: Select the image

// Existing mouse move logic
document.addEventListener('mousemove', (e) => {
  if (isCustomCursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});
// New toggle logic
toggleButton.addEventListener('click', () => {
  isCustomCursor = !isCustomCursor;
  if (isCustomCursor) {
    cursorIcon.style.opacity = '1'; // Hide image when custom cursor is active
    cursorcircle.style.opacity = '1'; 
  } else {
    cursorcircle.style.opacity = '0';  // Show image when normal cursor is active
    cursorIcon.style.opacity = '0';
  }
});

//animations:
// ...existing code...

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.4,  // Trigger when 10% of element is visible
  rootMargin: '0px 0px -50px 0px'  // Adjust trigger point
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add specific animation based on the element
      if (entry.target.classList.contains('hero')) {
        entry.target.classList.add('animate-slide-down');
      } else if (entry.target.classList.contains('product-highlights')) {
        entry.target.classList.add('animate-fade');
      } else if (entry.target.classList.contains('feature-callout')) {
        entry.target.classList.add('animate-slide-left');
      } else if (entry.target.classList.contains('section2')) {
        entry.target.classList.add('animate-scale');
      } else if (entry.target.classList.contains('tech-specs')) {
        entry.target.classList.add('animate-slide-up');
      } else if (entry.target.classList.contains('section3')) {
        entry.target.classList.add('animate-slide-right');
      }
      observer.unobserve(entry.target);  // Stop observing after animation
    }
  });
}, observerOptions);

// Observe sections (no default classes added here)
observer.observe(document.querySelector('.hero'));
observer.observe(document.querySelector('.product-highlights'));
observer.observe(document.querySelector('.feature-callout'));
observer.observe(document.querySelector('.section2'));
observer.observe(document.querySelector('.tech-specs'));
observer.observe(document.querySelector('.section3'));

// ...existing code...