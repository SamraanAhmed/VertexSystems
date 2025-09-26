// focus the collapsed content when expanded
document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const targetSelector = btn.getAttribute('href') || btn.dataset.bsTarget;
    const el = document.querySelector(targetSelector);
    // small timeout to let collapse finish
    setTimeout(() => {
      if (el && el.classList.contains('show')) {
        el.setAttribute('tabindex','-1');
        el.focus();
      }
    }, 350);
  });
});
