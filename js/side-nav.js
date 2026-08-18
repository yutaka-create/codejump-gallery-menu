/* ===== js / side-nav.js ===== */
export function initSideNav() {
  const galleryTrigger = document.querySelector(".js-gallery-trigger");
  const accessTrigger = document.querySelector(".js-access-trigger");
  const sideNav = document.querySelector(".js-side-nav");

  if (!sideNav || !galleryTrigger || !accessTrigger) return;

  let isRunning = false;

  const updateSideNav = () => {
    const galleryRect = galleryTrigger.getBoundingClientRect();
    const accessRect = accessTrigger.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const shouldShow =
      galleryRect.top <= viewportHeight &&
      accessRect.top > viewportHeight;

    sideNav.classList.toggle("is-visible", shouldShow);
    sideNav.inert = !shouldShow;
  };

  const requestUpdate = () => {
    if (isRunning) return;

    isRunning = true;

    requestAnimationFrame(() => {
      updateSideNav();
      isRunning = false;
    });
  };

  updateSideNav();

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}
