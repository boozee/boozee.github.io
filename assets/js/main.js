(function () {
  const getMain = (root = document) =>
    root.querySelector("main#main, main#content, main[role='main'], main");

  function highlightNav() {
    const cur = location.pathname.replace(/\/$/, "");
    document.querySelectorAll("nav a").forEach(link => {
      const p = new URL(link.href, location.origin).pathname.replace(/\/$/, "");
      link.classList.toggle("active", p === cur);
    });
  }

  // Wait until body opacity transition finishes (fade-out), with a fallback
  function waitForFadeOut() {
    return new Promise(resolve => {
      const el = document.body;
      const done = () => {
        el.removeEventListener("transitionend", onEnd);
        resolve();
      };
      const onEnd = (e) => {
        if (e.propertyName === "opacity") done();
      };
      el.addEventListener("transitionend", onEnd, { once: true });
      // Fallback in case transitionend doesn't fire
      setTimeout(done, 220);
    });
  }

  async function fetchPage(url) {
    const res = await fetch(url, { headers: { "X-Requested-With": "pjax" } });
    if (!res.ok) throw new Error(`Fetch failed: ${  url}`);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    return { title: doc.title, main: getMain(doc) };
  }

  async function navigate(url, { push = true } = {}) {
    try {
      // 1) Fade out
      document.body.classList.add("pjax-out");
      await waitForFadeOut();

      // 2) Fetch & swap
      const { title, main } = await fetchPage(url);
      const cur = getMain(document);
      if (!cur || !main) { location.href = url; return; }
      cur.replaceWith(main);
      document.title = title || document.title;
      if (push) history.pushState({}, "", url);

      // re-init page scripts & nav
      document.dispatchEvent(new CustomEvent("pjax:ready"));
      highlightNav();
      setupTabListeners(); // Reinitialize tab listeners
      window.scrollTo(0, 0);

      // 3) Fade in (next frame so opacity transition applies)
      requestAnimationFrame(() => document.body.classList.remove("pjax-out"));
    } catch (e) {
      console.error(e);
      location.href = url; // hard fallback
    }
  }

  function isInternal(a) {
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return false;
    const u = new URL(a.href, location.href);
    return u.origin === location.origin;
  }
  function samePageHash(a) {
    return a.hash && a.origin === location.origin && a.pathname === location.pathname;
  }

  addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a || !isInternal(a)) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.hasAttribute("data-no-pjax") || samePageHash(a)) return;
    e.preventDefault();
    navigate(a.href, { push: true });
  });

  addEventListener("popstate", () => navigate(location.href, { push: false }));

  document.addEventListener("DOMContentLoaded", highlightNav);

  // Card toggle for touch users
  (() => {
    const card = document.querySelector('.card');
    if (!card) return; // Exit if card element is not found

    const panel = card.querySelector('.card-panel');
    const btn = card.querySelector('.card-toggle');

    // Show toggle button only on coarse pointers (touch)
    if (window.matchMedia('(pointer:coarse)').matches) {
      btn.style.display = 'inline-block';
      btn.addEventListener('click', _ => {
        const open = card.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open);
      });
    }

    // open state mirrors hover/focus behavior
    const ro = new MutationObserver(() => {
      panel.style.opacity = card.classList.contains('is-open') ? '1' : '';
      panel.style.transform = card.classList.contains('is-open') ? 'translateY(0)' : '';
    });
    ro.observe(card, {
      attributes: true,
      attributeFilter: ['class']
    });
  })();
})();
