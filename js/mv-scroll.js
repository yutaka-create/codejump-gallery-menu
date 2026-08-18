/* ===== js / mv-scroll.js ===== */

/**
 * スクロール量に応じてMV画像の横幅を変更する
 * PCでは拡大、SPでは縮小する
 */
export function initMvScroll() {
  const mv = document.querySelector('.js-mv');

  if (!mv) return;

  const mvItems = mv.querySelectorAll('.js-mv-item');

  if (mvItems.length === 0) return;

  const pcMedia = window.matchMedia('(min-width: 900px)');

  let isRunning = false;

  const updateMvSize = () => {
    const scrollY = window.scrollY;
    const changeAmount = scrollY / 10;

    const flexBasis = pcMedia.matches
      ? 100 / 3 + changeAmount
      : 100 - changeAmount;

    mvItems.forEach((item) => {
      item.style.flexBasis = `${flexBasis}%`;
    });
  };

  const requestUpdate = () => {
    if (isRunning) return;

    isRunning = true;

    window.requestAnimationFrame(() => {
      updateMvSize();
      isRunning = false;
    });
  };

  window.addEventListener('scroll', requestUpdate, {
    passive: true,
  });

  pcMedia.addEventListener('change', requestUpdate);
  window.addEventListener('pageshow', requestUpdate);

  updateMvSize();
}