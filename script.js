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
        // Unobserve agar animasi hanya jalan 1x (tidak repeat setiap di-scroll naik-turun)
        observer.unobserve(entry.target); 
      }
    });
  }, {
    root: null,
    threshold: 0.15, // Trigger saat 15% elemen terlihat di layar
    rootMargin: "0px 0px -50px 0px" // Trigger sedikit sebelum elemen benar-benar masuk layar
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------- Product Data & Slider ---------- */
  // KAMU BISA MENAMBAH ATAU MENGUBAH MENU DI SINI:
  const productsData = [
    {
      title: "Cafe Latte",
      desc: "Perpaduan Espresso dan Susu segar. Cocok untuk yang kurang suka manis.",
      price: "Rp. 15.000",
      img: "assets/images/NakaActivity1.png" // Ganti path foto produk nanti
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
    // 1. Render HTML Cards dari array di atas
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

    // 2. Render Dots
    const cardNodes = slider.querySelectorAll('.product-card');
    dotsContainer.innerHTML = productsData.map((_, i) => `<div class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`).join('');
    const dots = dotsContainer.querySelectorAll('.dot');

    // 3. Logika Scroll Horizontal dgn Mouse (Drag)
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.style.scrollSnapType = 'none'; // Matikan snap sementara
      slider.style.scrollBehavior = 'auto'; // Matikan smooth sementara
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => { isDown = false; });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.style.scrollSnapType = 'x mandatory'; // Nyalakan snap kembali
      slider.style.scrollBehavior = 'smooth';      // Nyalakan smooth kembali
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // Kecepatan geser
      slider.scrollLeft = scrollLeft - walk;
    });

    // 4. Sinkronisasi Klik Dot & Scroll
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = dot.dataset.index;
        const targetCard = cardNodes[index];
        slider.scrollTo({ left: targetCard.offsetLeft - slider.parentElement.offsetLeft, behavior: 'smooth' });
      });
    });

    slider.addEventListener('scroll', () => {
      const scrollPos = slider.scrollLeft;
      const cardWidth = cardNodes[0].offsetWidth + 24; // lebar card + ukuran gap
      const index = Math.round(scrollPos / cardWidth);
      dots.forEach(d => d.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }, { passive: true });
  }

  /* ---------- Initial Calls ---------- */
  handleScroll();
})();
