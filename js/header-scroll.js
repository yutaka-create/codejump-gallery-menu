/* ===== js / header-scroll.js ===== */

/**
 * ヘッダーの表示・非表示を制御する
 */
export function initHeaderScroll() {
  const header = document.querySelector('.js-header');

  if (!header) return;

  let isRunning = false;

  const updateHeaderVisibility = () => {
    header.classList.toggle(
      'is-visible',
      window.scrollY >= 520
    );
  };

  const handleScroll = () => {
    if (isRunning) return;

    isRunning = true;

    window.requestAnimationFrame(() => {
      updateHeaderVisibility();
      isRunning = false;
    });
  };

  window.addEventListener('scroll', handleScroll, {
    passive: true,
  });

  updateHeaderVisibility();
}