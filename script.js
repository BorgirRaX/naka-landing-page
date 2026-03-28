/* ============================================================
   NAKA COFFEE — Scripts
   ============================================================ */

(() => {
  'use strict';

  /* ---------- DOM References ---------- */
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  /* ---------- Navbar Scroll Behavior ---------- */
  /* At top: solid white bg + logo1
     After scroll: transparent + backdrop blur + wider + logo2 + white links */
  const SCROLL_THRESHOLD = 50;

  const handleScroll = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---------- Mobile Menu Toggle ---------- */
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('navbar__links--open');
    navToggle.classList.toggle('navbar__toggle--open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  /* Close mobile menu when a link is clicked */
  navLinks.querySelectorAll('.navbar__link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('navbar__links--open');
      navToggle.classList.remove('navbar__toggle--open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Close mobile menu when clicking outside */
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('navbar__links--open')) {
      navLinks.classList.remove('navbar__links--open');
      navToggle.classList.remove('navbar__toggle--open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- Active Link Highlight on Scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = navLinks.querySelectorAll('.navbar__link');

  const highlightActiveLink = () => {
    const scrollY = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinkElements.forEach((link) => {
          link.classList.remove('navbar__link--active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('navbar__link--active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightActiveLink, { passive: true });

  /* ---------- Scroll Reveal Animations ---------- */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); 
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------- Parallax Effect ---------- */
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  const handleParallax = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax'));
      
      // Hero elements relate to topmost scroll
      if (el.closest('#hero')) {
        el.style.transform = `translateY(${scrollY * speed}px)`;
        return;
      }
      
      // Other elements relate to their visibility in viewport
      const parentRect = el.parentElement.getBoundingClientRect();
      const parentCenter = parentRect.top + (parentRect.height / 2);
      const viewportCenter = windowHeight / 2;
      
      if (parentRect.top < windowHeight && parentRect.bottom > 0) {
        // Pindahkan berdasarkan jarak pusat elemen ke pusat layar
        const offset = (parentCenter - viewportCenter) * speed;
        el.style.transform = `translateY(${offset}px)`;
      }
    });
  };

  // Panggil sekali agar posisi awal pas, lalu sinkronkan di tiap scroll
  handleParallax();
  window.addEventListener('scroll', handleParallax, { passive: true });

  /* ---------- Product Data & Slider ---------- */
  const productsData = [
    {
      title: "Cafe Latte",
      desc: "Perpaduan Espresso dan Susu segar. Cocok untuk yang kurang suka manis.",
      price: "Rp. 15.000",
      img: "assets/images/NakaActivity1.png"
    },
    {
      title: "Chocolatte",
      desc: "Perpaduan Espresso dan Susu segar. Cocok untuk yang kurang suka manis.",
      price: "Rp. 15.000",
      img: "assets/images/concrete-texture.png"
    },
    {
      title: "Es Kopi Susu Naka",
      desc: "Perpaduan Espresso dan Susu segar. Cocok untuk yang kurang suka manis.",
      price: "Rp. 15.000",
      img: "assets/images/NakaActivity1.png"
    },
    {
      title: "Americano",
      desc: "Perpaduan Espresso dan Susu segar. Cocok untuk yang kurang suka manis.",
      price: "Rp. 15.000",
      img: "assets/images/wood-texture.png"
    }
  ];

  const slider = document.getElementById('product-slider');
  const dotsContainer = document.getElementById('product-dots');

  if (slider && dotsContainer) {
    slider.innerHTML = productsData.map(val => `
      <div class="product-card">
        <img src="${val.img}" alt="${val.title}" class="product-card__img" draggable="false">
        <div class="product-card__content">
          <h4 class="product-card__title">${val.title}</h4>
          <p class="product-card__desc">${val.desc}</p>
          <span class="product-card__price">${val.price}</span>
        </div>
      </div>
    `).join('');

    const cardNodes = slider.querySelectorAll('.product-card');
    let dots = [];
    let cardsPerDot = 1;

    const renderDots = () => {
      if (cardNodes.length === 0) return;
      
      const sliderWidth = slider.clientWidth;
      const cardWidth = cardNodes[0].offsetWidth + 24;
      
      cardsPerDot = Math.max(1, Math.floor(sliderWidth / cardWidth));
      const dotCount = Math.ceil(cardNodes.length / cardsPerDot);
      
      dotsContainer.innerHTML = Array.from({length: dotCount}).map((_, i) => 
        `<div class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
      ).join('');
      
      dots = dotsContainer.querySelectorAll('.dot');
      
      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          const index = parseInt(dot.dataset.index);
          let targetIndex = index * cardsPerDot;
          if (targetIndex >= cardNodes.length) targetIndex = cardNodes.length - 1;
          
          const targetCard = cardNodes[targetIndex];
          if (targetCard) {
            slider.scrollTo({ left: targetCard.offsetLeft - slider.parentElement.offsetLeft, behavior: 'smooth' });
          }
        });
      });
    };

    renderDots();
    window.addEventListener('resize', renderDots);

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.style.scrollSnapType = 'none';
      slider.style.scrollBehavior = 'auto';
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => { isDown = false; });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.style.scrollSnapType = 'x mandatory';
      slider.style.scrollBehavior = 'smooth';
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('scroll', () => {
      if (dots.length === 0) return;
      
      const scrollPos = slider.scrollLeft;
      const cardWidth = cardNodes[0].offsetWidth + 24;
      
      const activeCardIndex = Math.round(scrollPos / cardWidth);
      let activeDotIndex = Math.floor(activeCardIndex / cardsPerDot);
      
      if (activeDotIndex >= dots.length) activeDotIndex = dots.length - 1;

      dots.forEach(d => d.classList.remove('active'));
      if (dots[activeDotIndex]) {
        dots[activeDotIndex].classList.add('active');
      }
    }, { passive: true });
  }

  /* ---------- Custom Toast Notification ---------- */
  const showToast = (message, isError = false) => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${isError ? 'toast--error' : ''}`;
    toast.innerText = message;
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('toast--show'), 10);
    setTimeout(() => {
      toast.classList.remove('toast--show');
      setTimeout(() => toast.remove(), 350);
    }, 3000);
  };

  /* ---------- Feedback Form (Anonymous) ---------- */
  const feedbackInput = document.querySelector('.feedback__input');
  const feedbackSubmit = document.querySelector('.feedback__submit');
  const feedbackBotcheck = document.querySelector('.feedback__botcheck');

  if (feedbackInput && feedbackSubmit) {
    feedbackSubmit.addEventListener('click', async () => {
      const message = feedbackInput.value.trim();
      
      if (!message) {
        showToast('Ups, pesan masih kosong! Silakan tulis sesuatu.', true);
        return;
      }

      // Ubah tombol jadi status loading
      const originalText = feedbackSubmit.innerText;
      feedbackSubmit.innerText = 'Mengirim...';
      feedbackSubmit.disabled = true;

      try {
        const payload = {
          access_key: '30d3f16a-feac-42a8-98d9-c294f89371fe', 
          subject: 'Kritik & Saran Baru - Website Naka Coffee',
          from_name: 'Pengunjung Anonim Naka', 
          message: message
        };

        // Web3Forms mewajibkan botcheck kosong (tidak ada) jika pengirim adalah manusia
        if (feedbackBotcheck && feedbackBotcheck.checked) {
          payload.botcheck = true;
        }

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message || 'API Error');
        }
        
        showToast('Terima kasih! Kritik & saran kamu berhasil dikirim secara anonim.');
        feedbackInput.value = ''; // Kosongkan input setelah sukses
        
        if (feedbackBotcheck) {
          feedbackBotcheck.checked = false;
        }
        
      } catch (error) {
        console.error('Submission Error:', error);
        showToast('Maaf, terjadi kesalahan saat mengirim pesan. Coba lagi nanti!', true);
      } finally {
        // Kembalikan status tombol seperti semula
        feedbackSubmit.innerText = originalText;
        feedbackSubmit.disabled = false;
      }
    });
  }

  /* ---------- Initial Calls ---------- */
  handleScroll();
})();
