import { aboutGallerySlides } from '../data/about-gallery.js';

let disposeCurrentGallery;

function renderGallery(slides) {
  return `
    <figure class="journey-gallery">
      <div class="journey-gallery-frame">
        <img class="journey-gallery-image" data-gallery-image alt="" width="960" height="720" />
        <span class="journey-gallery-counter" data-gallery-counter></span>
        <button class="journey-gallery-control journey-gallery-previous" type="button" data-gallery-previous aria-label="Tampilkan dokumentasi sebelumnya">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button class="journey-gallery-control journey-gallery-next" type="button" data-gallery-next aria-label="Tampilkan dokumentasi berikutnya">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
        </button>
        <figcaption class="journey-gallery-caption" data-gallery-caption></figcaption>
      </div>
      <div class="journey-gallery-dots" role="group" aria-label="Pilih dokumentasi perjalanan">
        ${slides
          .map(
            (slide, index) => `
              <button class="journey-gallery-dot" type="button" data-gallery-dot="${index}" aria-label="Tampilkan slide ${index + 1}: ${slide.caption}" aria-pressed="${index === 0}"></button>`,
          )
          .join('')}
      </div>
    </figure>`;
}

export function initializeAboutGallery() {
  disposeCurrentGallery?.();

  const host = document.querySelector('[data-about-gallery]');
  if (!host || !aboutGallerySlides.length) return undefined;

  const slides = [...aboutGallerySlides].sort((a, b) => a.order - b.order);
  host.innerHTML = renderGallery(slides);

  const gallery = host.querySelector('.journey-gallery');
  const frame = host.querySelector('.journey-gallery-frame');
  const image = host.querySelector('[data-gallery-image]');
  const caption = host.querySelector('[data-gallery-caption]');
  const counter = host.querySelector('[data-gallery-counter]');
  const dots = [...host.querySelectorAll('[data-gallery-dot]')];
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const abortController = new AbortController();
  const { signal } = abortController;
  let activeIndex = 0;
  let timer;
  let transitionTimeout;
  let pointerInside = false;
  let focusInside = false;

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    const slide = slides[activeIndex];
    window.clearTimeout(transitionTimeout);
    image.classList.add('is-changing');

    transitionTimeout = window.setTimeout(() => {
      image.src = slide.image;
      image.alt = slide.alt;
      image.style.objectFit = slide.objectFit || 'cover';
      image.style.objectPosition = slide.objectPosition || 'center center';
      image.style.backgroundColor = slide.backgroundColor || 'transparent';
      frame.style.backgroundColor = slide.backgroundColor || '';
      frame.classList.toggle('has-contained-image', slide.objectFit === 'contain');
      caption.innerHTML = `<span>${slide.category}</span><strong>${slide.caption}</strong>`;
      counter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      dots.forEach((dot, dotIndex) => {
        const selected = dotIndex === activeIndex;
        dot.classList.toggle('is-active', selected);
        dot.setAttribute('aria-pressed', String(selected));
      });
      window.requestAnimationFrame(() => image.classList.remove('is-changing'));
    }, motionPreference.matches ? 0 : 280);
  }

  function stopTimer() {
    window.clearInterval(timer);
    timer = undefined;
  }

  function startTimer() {
    stopTimer();
    if (
      motionPreference.matches ||
      document.hidden ||
      pointerInside ||
      focusInside ||
      slides.length < 2
    ) {
      return;
    }

    timer = window.setInterval(() => showSlide(activeIndex + 1), 5000);
  }

  function selectSlide(index) {
    showSlide(index);
    startTimer();
  }

  const previous = host.querySelector('[data-gallery-previous]');
  const next = host.querySelector('[data-gallery-next]');
  previous.addEventListener('click', () => selectSlide(activeIndex - 1), { signal });
  next.addEventListener('click', () => selectSlide(activeIndex + 1), { signal });
  dots.forEach((dot) => {
    dot.addEventListener('click', () => selectSlide(Number(dot.dataset.galleryDot)), { signal });
  });

  gallery.addEventListener(
    'pointerenter',
    () => {
      pointerInside = true;
      stopTimer();
    },
    { signal },
  );
  gallery.addEventListener(
    'pointerleave',
    () => {
      pointerInside = false;
      startTimer();
    },
    { signal },
  );
  gallery.addEventListener(
    'focusin',
    () => {
      focusInside = true;
      stopTimer();
    },
    { signal },
  );
  gallery.addEventListener(
    'focusout',
    (event) => {
      if (gallery.contains(event.relatedTarget)) return;
      focusInside = false;
      startTimer();
    },
    { signal },
  );
  document.addEventListener(
    'visibilitychange',
    () => (document.hidden ? stopTimer() : startTimer()),
    { signal },
  );
  motionPreference.addEventListener(
    'change',
    () => (motionPreference.matches ? stopTimer() : startTimer()),
    { signal },
  );

  showSlide(0);
  startTimer();

  disposeCurrentGallery = () => {
    stopTimer();
    window.clearTimeout(transitionTimeout);
    abortController.abort();
    host.replaceChildren();
    disposeCurrentGallery = undefined;
  };

  return disposeCurrentGallery;
}
