/* ============================================================
   NAKA COFFEE — /order Interactive Scripts
   ============================================================ */

(() => {
  'use strict';

  // DOM References
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const zoomableImages = document.querySelectorAll('.zoomable');

  // Open Lightbox with specified image source and caption
  const openLightbox = (src, altText) => {
    if (!lightbox || !lightboxImg || !lightboxCaption) return;

    lightboxImg.src = src;
    lightboxCaption.textContent = altText || 'Panduan Pemesanan Naka Coffee';
    lightbox.classList.add('lightbox-modal--open');
    lightbox.setAttribute('aria-hidden', 'false');
    if (document.body) {
      document.body.style.overflow = 'hidden'; // Lock background scrolling
    }
  };

  // Close Lightbox
  const closeLightbox = () => {
    if (!lightbox) return;

    lightbox.classList.remove('lightbox-modal--open');
    lightbox.setAttribute('aria-hidden', 'true');
    if (document.body) {
      document.body.style.overflow = ''; // Unlock background scrolling
    }
    
    // Clear src to prevent flash of old image when opened next time
    setTimeout(() => {
      if (lightboxImg) lightboxImg.src = '';
    }, 300);
  };

  // Bind click event to all zoomable screenshot images
  if (zoomableImages && zoomableImages.length > 0) {
    zoomableImages.forEach((img) => {
      if (img) {
        img.addEventListener('click', (e) => {
          openLightbox(e.currentTarget.src, e.currentTarget.alt);
        });
      }
    });
  }

  // Bind close events
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    // Close when clicking the black background backdrop
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-modal')) {
        closeLightbox();
      }
    });
  }

  // Close when pressing Escape key
  if (document) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox && lightbox.classList.contains('lightbox-modal--open')) {
        closeLightbox();
      }
    });
  }

})();
