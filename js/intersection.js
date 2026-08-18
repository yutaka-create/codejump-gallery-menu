/* ===== js / intersection.js ===== */

/**
 * スクロール監視アニメーションを制御する
 *
 * data-animation属性の値に対応するUtilityクラスを追加し、
 * 対象が表示領域に入った際に一度だけアニメーションを実行する。
 */
export function initIntersection() {
  const targets = document.querySelectorAll(
    '.js-scroll-trigger[data-animation]'
  );

  if (targets.length === 0) return;

  if (!('IntersectionObserver' in window)) return;

  const animationClassMap = {
    'fade-up': 'u-fade-up',
    'reveal-left': 'u-reveal-left',
    'fade-left': 'u-fade-left',
    'fade-right': 'u-fade-right',
  };

  const validTargets = [];

  targets.forEach((target) => {
    const animationName = target.dataset.animation;
    const animationClass =
      animationClassMap[animationName];

    if (!animationClass) {
      console.warn(
        `未登録のスクロールアニメーションです: ${animationName}`,
        target
      );
      return;
    }

    target.classList.add(animationClass);
    validTargets.push(target);
  });

  if (validTargets.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-animated');
        observer.unobserve(entry.target);
      });
    },
    observerOptions
  );

  validTargets.forEach((target) => {
    observer.observe(target);
  });
}