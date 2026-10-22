(() => {
  'use strict';
  if (location.hostname !== 'quri.omnicamp.us') {
    alert('Quriのページで実行してください。');
    return;
  }
  const id = 'quri-title-fix-style';
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
    alert('Quriタイトル表示補正を解除しました。');
    return;
  }
  const selectors = [];
  const candidates = [...document.querySelectorAll('button, a[href]')]
    .filter(el => {
      const text = el.innerText || '';
      return /(?:PDF|Notebook|NOTEBOOK|外部リンク|LINK)/.test(text) &&
             text.length < 700 &&
             !el.getAttribute('aria-label')?.includes('ダウンロード');
    });
  let count = 0;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = `
    .quri-title-fix-target,
    .quri-title-fix-target * {
      text-overflow: clip !important;
      -webkit-line-clamp: unset !important;
      line-clamp: unset !important;
      max-height: none !important;
    }
    .quri-title-fix-target { height: auto !important; min-height: 0 !important; }
    .quri-title-fix-target :is(span, p, div, h2, h3, h4) {
      white-space: normal !important;
      overflow-wrap: anywhere !important;
      overflow: visible !important;
      min-width: 0 !important;
    }
  `;
  for (const candidate of candidates) {
    candidate.classList.add('quri-title-fix-target');
    count++;
  }
  document.head.appendChild(style);
  alert(`Quriの資料カード ${count} 件にタイトル表示補正を適用しました。\n再度実行すると解除します。`);
})();
