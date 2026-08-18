/* ===== js / hamburger.js ===== */

/**
 * ハンバーガーメニューを制御する
 * メニュー開閉、ARIA属性更新、背景スクロール停止、
 * キーボード操作を管理する
 */
export function initHamburger() {
  const hamburger = document.querySelector('.js-hamburger');
  const menu = document.querySelector('.js-menu');
  const logoLink = document.querySelector('.js-menu-logo');
  const closeTriggers = document.querySelectorAll(
    '.js-menu-close-trigger'
  );

  if (!hamburger || !menu) return;

  const isMenuOpen = () =>
    hamburger.classList.contains('is-open');

  const getFocusableElements = () => [
    logoLink,
    hamburger,
    ...menu.querySelectorAll('a[href]'),
  ].filter(Boolean);

  const openMenu = () => {
    hamburger.classList.add('is-open');
    menu.classList.add('is-open');
    document.body.classList.add('is-menu-open');

    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'メニューを閉じる');
    menu.setAttribute('aria-hidden', 'false');
    menu.inert = false;
  };

  const closeMenu = ({ returnFocus = false } = {}) => {
    hamburger.classList.remove('is-open');
    menu.classList.remove('is-open');
    document.body.classList.remove('is-menu-open');

    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'メニューを開く');
    menu.setAttribute('aria-hidden', 'true');
    menu.inert = true;

    if (returnFocus) {
      hamburger.focus();
    }
  };

  const handleFocusTrap = (event) => {
    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (
      event.shiftKey &&
      document.activeElement === firstElement
    ) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (
      !event.shiftKey &&
      document.activeElement === lastElement
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  hamburger.addEventListener('click', () => {
    if (isMenuOpen()) {
      closeMenu();
      return;
    }

    openMenu();
  });

  closeTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      closeMenu({ returnFocus: true });
    });
  });

  document.addEventListener('keydown', (event) => {
    if (!isMenuOpen()) return;

    if (event.key === 'Escape') {
      closeMenu({ returnFocus: true });
      return;
    }

    if (event.key === 'Tab') {
      handleFocusTrap(event);
    }
  });
}