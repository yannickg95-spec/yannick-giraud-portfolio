(function () {
  const css = `
    .project-gallery img { cursor: zoom-in; }

    #lightbox {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.93);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.18s ease;
    }
    #lightbox.open {
      opacity: 1;
      pointer-events: auto;
    }
    #lightbox img {
      max-width: 88vw;
      max-height: 88vh;
      object-fit: contain;
      display: block;
      user-select: none;
    }
    #lightbox-close {
      position: absolute;
      top: 1.25rem;
      right: 1.5rem;
      background: none;
      border: none;
      color: rgba(255,255,255,0.5);
      font-size: 1.6rem;
      line-height: 1;
      cursor: pointer;
      padding: 0.25rem 0.5rem;
      transition: color 0.15s;
    }
    #lightbox-close:hover { color: #fff; }
    #lightbox-prev, #lightbox-next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: rgba(255,255,255,0.35);
      font-size: 1.4rem;
      cursor: pointer;
      padding: 1rem 1.5rem;
      transition: color 0.15s;
    }
    #lightbox-prev:hover, #lightbox-next:hover { color: rgba(255,255,255,0.85); }
    #lightbox-prev { left: 1rem; }
    #lightbox-next { right: 1rem; }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const box      = document.createElement('div');
  box.id         = 'lightbox';
  box.innerHTML  = `
    <button id="lightbox-prev">&#8592;</button>
    <img src="" alt="" />
    <button id="lightbox-next">&#8594;</button>
    <button id="lightbox-close">&#10005;</button>
  `;
  document.body.appendChild(box);

  const boxImg = box.querySelector('img');
  let imgs     = [];
  let idx      = 0;

  function open(i) {
    idx = i;
    boxImg.src = imgs[idx].src;
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    box.classList.remove('open');
    document.body.style.overflow = '';
  }

  function prev() { open((idx - 1 + imgs.length) % imgs.length); }
  function next() { open((idx + 1) % imgs.length); }

  document.addEventListener('DOMContentLoaded', () => {
    imgs = Array.from(document.querySelectorAll('.project-gallery img'));
    imgs.forEach((img, i) => img.addEventListener('click', () => open(i)));
  });

  box.querySelector('#lightbox-close').addEventListener('click', close);
  box.querySelector('#lightbox-prev').addEventListener('click', prev);
  box.querySelector('#lightbox-next').addEventListener('click', next);

  box.addEventListener('click', e => { if (e.target === box) close(); });

  document.addEventListener('keydown', e => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });
})();
