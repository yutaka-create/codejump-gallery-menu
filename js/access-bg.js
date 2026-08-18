/* ===== js / access-bg.js ===== */

export function initAccessBg() {
  const accessBg = document.querySelector(".js-access-bg");
  const accessTrigger = document.querySelector(".js-access-trigger");
  const contactTrigger = document.querySelector(".js-contact-trigger");

  if (!accessBg || !accessTrigger || !contactTrigger) return;

  let isRunning = false;

  const updateAccessBg = () => {
    const accessRect = accessTrigger.getBoundingClientRect();
    const contactRect = contactTrigger.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const shouldShow =
      accessRect.top <= viewportHeight &&
      contactRect.top > viewportHeight;

    accessBg.classList.toggle("is-active", shouldShow);
  };

  const requestUpdate = () => {
    if (isRunning) return;

    isRunning = true;

    requestAnimationFrame(() => {
      updateAccessBg();
      isRunning = false;
    });
  };

  updateAccessBg();

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}