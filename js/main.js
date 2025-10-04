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