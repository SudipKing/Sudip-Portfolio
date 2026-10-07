// Links with a data-placeholder attribute are not filled in yet.
document.querySelectorAll('[data-placeholder]').forEach(function (el) {
  el.setAttribute('title', el.dataset.placeholder);
  el.setAttribute('aria-disabled', 'true');
  el.addEventListener('click', function (e) { e.preventDefault(); });
});