document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded fired for tabs.js');
  const buttons = [...document.querySelectorAll('.tab-button')];
  const panels  = [...document.querySelectorAll('.tab-content')];
  console.log('Buttons found:', buttons.length);
  console.log('Panels found:', panels.length);
  if (!buttons.length || !panels.length) return;

  function activate(name) {
    console.log('Activating tab:', name);
    buttons.forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    panels.forEach(p => p.classList.toggle('is-active', p.id === name));
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      console.log('Button clicked:', btn.dataset.tab);
      activate(btn.dataset.tab);
    });
  });
});
