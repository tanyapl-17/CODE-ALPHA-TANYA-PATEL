// Simple interactivity for buttons
console.log("Portfolio site loaded.");
function submitForm() {
  alert("Thank you! Your message has been sent.");
  return false; // prevent actual form submission
}
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
