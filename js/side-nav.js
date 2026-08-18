/* ===== js / page-top.js ===== */

/**
 * ページトップ戻るボタンを制御する
 */
export function initPageTop() {
  const pageTopBtn = document.querySelector(".js-page-top");

  if (!pageTopBtn) return;

  const SHOW_THRESHOLD = 300;

  const mediaQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let isRunning = false;

  const updatePageTopVisibility = () => {
    const shouldShow = window.scrollY >= SHOW_THRESHOLD;

    pageTopBtn.classList.toggle("is-visible", shouldShow);
    pageTopBtn.disabled = !shouldShow;
  };

  const handleScroll = () => {
    if (isRunning) return;

    isRunning = true;

    window.requestAnimationFrame(() => {
      updatePageTopVisibility();
      isRunning = false;
    });
  };

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  pageTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: mediaQuery.matches ? "auto" : "smooth",
    });
  });

  updatePageTopVisibility();
}