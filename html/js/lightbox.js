/* Lightweight lightbox — fullscreen image viewer */
(function () {
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img src="" alt="">';
  document.body.appendChild(box);

  var img = box.querySelector('img');

  function open(src, alt) {
    img.src = src;
    img.alt = alt || '';
    box.classList.add('active');
  }

  function close() {
    box.classList.remove('active');
    img.src = '';
  }

  box.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  document.querySelectorAll('img[data-lightbox]').forEach(function (el) {
    el.addEventListener('click', function () {
      open(el.dataset.lightbox || el.src, el.alt);
    });
  });
})();
