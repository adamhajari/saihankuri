(function () {
  function getFullResUrl(thumbnailSrc) {
    return thumbnailSrc.replace(/-\d+x\d+(\.[a-zA-Z]+)$/, '$1');
  }

  function buildViewer(images, startIndex) {
    var current = startIndex;

    var overlay = document.createElement('div');
    overlay.id = 'photo-viewer-overlay';
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:9999',
      'background:rgba(0,0,0,0.92)',
      'display:flex', 'align-items:center', 'justify-content:center',
      'flex-direction:column'
    ].join(';');

    var imgEl = document.createElement('img');
    imgEl.style.cssText = [
      'max-width:90vw', 'max-height:85vh',
      'object-fit:contain',
      'display:block',
      'transition:opacity 0.2s'
    ].join(';');

    var counter = document.createElement('div');
    counter.style.cssText = [
      'color:#ccc', 'font-family:sans-serif',
      'font-size:14px', 'margin-top:12px',
      'user-select:none'
    ].join(';');

    var nav = document.createElement('div');
    nav.style.cssText = [
      'position:fixed', 'bottom:0', 'left:0', 'right:0',
      'display:flex', 'justify-content:center', 'gap:24px',
      'padding:20px'
    ].join(';');

    function btn(label) {
      var b = document.createElement('button');
      b.textContent = label;
      b.style.cssText = [
        'background:rgba(255,255,255,0.15)',
        'color:#fff', 'border:1px solid rgba(255,255,255,0.3)',
        'padding:8px 24px', 'font-size:16px',
        'border-radius:4px', 'cursor:pointer',
        'font-family:sans-serif'
      ].join(';');
      b.onmouseover = function () { b.style.background = 'rgba(255,255,255,0.3)'; };
      b.onmouseout = function () { b.style.background = 'rgba(255,255,255,0.15)'; };
      return b;
    }

    var prevBtn = btn('← Prev');
    var nextBtn = btn('Next →');
    var closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = [
      'position:fixed', 'top:16px', 'right:20px',
      'background:none', 'border:none',
      'color:#fff', 'font-size:28px',
      'cursor:pointer', 'line-height:1',
      'padding:4px 8px'
    ].join(';');

    function show(idx) {
      current = (idx + images.length) % images.length;
      imgEl.style.opacity = '0';
      imgEl.src = images[current];
      imgEl.onload = function () { imgEl.style.opacity = '1'; };
      counter.textContent = (current + 1) + ' / ' + images.length;
      prevBtn.style.visibility = images.length > 1 ? 'visible' : 'hidden';
      nextBtn.style.visibility = images.length > 1 ? 'visible' : 'hidden';
    }

    prevBtn.onclick = function (e) { e.stopPropagation(); show(current - 1); };
    nextBtn.onclick = function (e) { e.stopPropagation(); show(current + 1); };
    closeBtn.onclick = close;
    overlay.onclick = close;
    imgEl.onclick = function (e) { e.stopPropagation(); };

    function close() {
      document.body.removeChild(overlay);
      document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    }
    document.addEventListener('keydown', onKey);

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);
    overlay.appendChild(closeBtn);
    overlay.appendChild(imgEl);
    overlay.appendChild(counter);
    overlay.appendChild(nav);
    document.body.appendChild(overlay);
    show(startIndex);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var items = document.querySelectorAll('.gallery-item a');
    if (!items.length) return;

    var images = [];
    items.forEach(function (a) {
      var img = a.querySelector('img');
      if (img) images.push(getFullResUrl(img.src));
    });

    items.forEach(function (a, idx) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        buildViewer(images, idx);
      });
    });
  });
})();
