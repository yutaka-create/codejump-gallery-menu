/* ===== js / main.js ===== */

// --------------------------------------------------------
// メイン実行ファイル
// --------------------------------------------------------

import { initHamburger } from './hamburger.js';
import { initHeaderScroll } from './header-scroll.js';
import { initMvScroll } from './mv-scroll.js';
import { initIntersection } from './intersection.js';
import { initAccessBg } from './access-bg.js';
import { initSideNav } from './side-nav.js';
import { initPageTop } from './page-top.js';


document.addEventListener('DOMContentLoaded', () => {
  // ハンバーガーメニュー
  initHamburger();

  // ヘッダー表示・非表示
  initHeaderScroll();

  // メインビジュアルのスクロール拡大・縮小
  initMvScroll();

  // スクロール連動アニメーション
  initIntersection();

  // ACCESS背景の表示・非表示
  initAccessBg();

  // サイドナビの表示・非表示
  initSideNav();

  // ページトップ戻るボタン
  initPageTop();
});