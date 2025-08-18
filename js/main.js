(function () {
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Theme toggle with system preference
  const toggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  if (stored) document.documentElement.setAttribute('data-theme', stored);
  toggle?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    toggle.setAttribute('aria-pressed', String(next === 'dark'));
  });

  // Reduced motion respect (no JS animations required here)

  // Cookie consent
  const cookieKey = 'cookie-consent';
  function showCookieBanner() {
    if (localStorage.getItem(cookieKey)) return;
    const banner = document.createElement('div');
    banner.className = 'cookie-banner show';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.innerHTML = `
      <div>We use cookies for analytics to improve your experience. See our <a href="#" class="btn-link">privacy notice</a>.</div>
      <div class="cookie-actions">
        <button class="btn btn-secondary" id="cookieDecline">Decline</button>
        <button class="btn btn-primary" id="cookieAccept">Accept</button>
      </div>`;
    document.body.appendChild(banner);
    banner.querySelector('#cookieAccept').addEventListener('click', () => {
      localStorage.setItem(cookieKey, 'accepted');
      banner.remove();
      // Initialize analytics if configured
      // if (window.GA_MEASUREMENT_ID) { /* load GA */ }
    });
    banner.querySelector('#cookieDecline').addEventListener('click', () => {
      localStorage.setItem(cookieKey, 'declined');
      banner.remove();
    });
  }
  setTimeout(showCookieBanner, 800);

  // Optional: Attempt to load GitHub OG images dynamically if placeholders exist
  const ogTargets = [
    { id: 'project-myntra.png', repo: 'Saurabhsarate/Project-Myntra-Clone' },
    { id: 'project-super-mario.png', repo: 'Saurabhsarate/Project-Super-Mario' },
    { id: 'project-insureme.png', repo: 'Saurabhsarate/InsureMe-Insurance-Dashboard' },
    { id: 'project-netflix.png', repo: 'Saurabhsarate/Project-Netflix-Clone' },
    { id: 'project-student-dashboard.png', repo: 'Saurabhsarate/Project-StudentDashborad' },
    { id: 'project-student-portal.png', repo: 'Saurabhsarate/Student-Portal-App-' },
    { id: 'project-electricity-billing.png', repo: 'Saurabhsarate/Electricity-billing-system' },
    { id: 'project-shelfmaster.png', repo: 'Saurabhsarate/ShelfMaster-Pro' },
    { id: 'project-darknet-traffic.png', repo: 'Saurabhsarate/Darknet-traffic-detection-usind-FST-' },
    { id: 'project-food-ordering.png', repo: 'Saurabhsarate/web-application-on-food-ordering-system' }
  ];

  // Progressive enhancement: replace placeholders with OG images if CORS allows
  document.querySelectorAll('#projects img').forEach(img => {
    const file = img.getAttribute('src')?.split('/').pop();
    const target = ogTargets.find(t => file && file.endsWith(t.id));
    if (!target) return;
    const og = `https://opengraph.githubassets.com/1/${target.repo}`;
    // Try loading by creating a new Image
    const probe = new Image();
    probe.onload = () => { img.src = og; };
    probe.onerror = () => {}; // keep placeholder
    probe.src = og;
  });

  // Netlify form enhancement: AJAX submit fallback to function
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      if (form.getAttribute('data-netlify') === 'true') return; // allow Netlify handling on production
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        const res = await fetch('/.netlify/functions/contact-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Request failed');
        alert('Thanks! I will get back to you soon.');
        form.reset();
      } catch (err) {
        location.href = `mailto:saurabhsarate.01@outlook.com?subject=Contact%20from%20Portfolio&body=${encodeURIComponent(data.message || '')}`;
      }
    });
  }
})();