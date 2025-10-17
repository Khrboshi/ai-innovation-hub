// Small helper interactions
document.addEventListener('DOMContentLoaded', () => {
  // fill year in footer(s)
  const yrs = document.querySelectorAll('[id^=year]');
  yrs.forEach(el => el.textContent = new Date().getFullYear());

  // example: refresh posts button
  const refresh = document.getElementById('refresh-posts');
  if (refresh) refresh.addEventListener('click', () => alert('This is a placeholder. Connect an RSS/API in assets/js/blog-generator.js'));
});
