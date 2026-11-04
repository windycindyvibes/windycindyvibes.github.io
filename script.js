// Restore the saved light/dark preference as early as possible.
try {
  const saved = localStorage.getItem('portfolio-theme');
  document.documentElement.dataset.theme = saved === 'dark' || saved === 'light'
    ? saved
    : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
} catch (e) {
  // Storage may be blocked; the default light theme still works.
}

// Wait for the HTML buttons and PDF viewer to exist.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('themeToggle');
  function updateThemeButton() {
    const dark = document.documentElement.dataset.theme === 'dark';
    if (!toggle) return;
    toggle.textContent = dark ? '☀' : '☾';
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.setAttribute('aria-pressed', String(dark));
  }
  if (toggle) {
    updateThemeButton();
    toggle.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('portfolio-theme', next); } catch (e) { /* Ignore blocked storage. */ }
      updateThemeButton();
    });
  }

  // Switch the embedded viewer and external link between the two PDF files.
  const portfolioTabs = Array.from(document.querySelectorAll('.portfolio-tab'));
  if (portfolioTabs.length) {
    const portfolioFrame = document.getElementById('portfolio-frame');
    const portfolioOpen = document.getElementById('portfolio-open');
    const portfolioHeading = document.getElementById('selected-season-heading');
    const portfolioPreview = document.getElementById('portfolio-preview');

    function selectPortfolio(tab) {
      const season = tab.dataset.season;
      const path = `docs/robotics-portfolio-${season}.pdf`;
      portfolioTabs.forEach(t => {
        t.setAttribute('aria-selected', String(t === tab));
        t.tabIndex = t === tab ? 0 : -1;
      });
      portfolioHeading.textContent = `${season.replace('-', '–')} Portfolio`;
      portfolioOpen.href = path;
      portfolioOpen.textContent = `Open ${season.replace('-', '–')} PDF ↗`;
      portfolioFrame.src = `${path}#view=FitH`;
      portfolioFrame.title = `${season.replace('-', '–')} robotics team portfolio PDF preview`;
      portfolioPreview.setAttribute('aria-labelledby', tab.id);
    }

    portfolioTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectPortfolio(tab));
      tab.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? portfolioTabs.length - 1 :
          (index + (event.key === 'ArrowRight' ? 1 : -1) + portfolioTabs.length) % portfolioTabs.length;
        selectPortfolio(portfolioTabs[nextIndex]);
        portfolioTabs[nextIndex].focus();
      });
    });
    const initialTab = document.querySelector('.portfolio-tab[aria-selected="true"]') || portfolioTabs[0];
    if (initialTab) selectPortfolio(initialTab);
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
