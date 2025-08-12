document.addEventListener('DOMContentLoaded', function () {
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
});

function initTabs() {
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      document.querySelectorAll('.tab-button').forEach(b => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.tab-content').forEach(p => p.classList.toggle('is-active', p.id === tabId));
    });
  });
}

// run on first load
document.addEventListener('DOMContentLoaded', initTabs);
// run after PJAX swaps the main content
document.addEventListener('pjax:ready', initTabs);