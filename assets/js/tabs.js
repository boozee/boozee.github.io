function setupTabListeners() {
  const buttons = [...document.querySelectorAll('.tab-button')];
  const panels  = [...document.querySelectorAll('.tab-content')];
  if (!buttons.length || !panels.length) return;

  function activate(name) {
    buttons.forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    panels.forEach(p => p.classList.toggle('is-active', p.id === name));
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      activate(btn.dataset.tab);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupTabListeners();
});

// Reinitialize tab listeners after PJAX content swap
document.addEventListener('pjax:ready', setupTabListeners);
