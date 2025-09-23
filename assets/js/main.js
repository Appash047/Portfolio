

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Dark/Light Mode Toggle
   */
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');

  // Check for saved theme preference
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.body.classList.add(currentTheme);
  } else {
    // Default to light mode if no preference is saved
    document.body.classList.add('light-mode');
  }

  function toggleTheme() {
    if (document.body.classList.contains('light-mode')) {
      document.body.classList.replace('light-mode', 'dark-mode');
      localStorage.setItem('theme', 'dark-mode');
    } else {
      document.body.classList.replace('dark-mode', 'light-mode');
      localStorage.setItem('theme', 'light-mode');
    }
  }

  if (sunIcon) {
    sunIcon.addEventListener('click', toggleTheme);
  }

  if (moonIcon) {
    moonIcon.addEventListener('click', toggleTheme);
  }

  /**
   * Initiate TagCanvas
   */
  window.addEventListener('load', function() {
    try {
      TagCanvas.Start('myCanvas','iconList',{
        textColour: null,
        outlineThickness: 1,
        maxSpeed: 0.05,
        freezeActive: true,
        shuffleTags: true,
        shape: 'sphere',
        zoom: 0.9,
        noSelect: true,
        pinchZoom: true,
        wheelZoom: false
      });
    } catch(e) {
      // Fallback for browsers that don't support canvas
      document.getElementById('myCanvasContainer').style.display='none';
      console.log(e);
    }
  });

})();


const soundCloud = document.querySelector('.sound-cloud');
    const off = document.querySelector('#off');
    const on = document.querySelector('#on');
    const myAudio = document.querySelector('#myAudio');

    // start paused
    // myAudio.pause(); // Remove this line as we'll handle initial state with localStorage

    // Load sound state from localStorage on page load
    const savedPlaybackState = localStorage.getItem('musicPlaybackState');
    const savedCurrentTime = parseFloat(localStorage.getItem('musicCurrentTime'));

    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      // Always start OFF on mobile to prevent auto sound
      myAudio.pause();
      on.style.display = 'none';
      off.style.display = 'inline';
      soundCloud.style.color = '#f50057';
      localStorage.setItem('musicPlaybackState', 'off');
    } else if (savedPlaybackState === 'on') {
      myAudio.currentTime = savedCurrentTime || 0;
      myAudio.play().catch(e => console.log("Autoplay prevented: ", e));
      on.style.display = 'inline';
      off.style.display = 'none';
      soundCloud.style.color = '#08fdd8';
    } else {
      myAudio.pause();
      on.style.display = 'none';
      off.style.display = 'inline';
      soundCloud.style.color = '#f50057';
    }

    off.addEventListener('click', () => soundTrack('off'));
    on.addEventListener('click', () => soundTrack('on'));

    function soundTrack(state) {
      if (state === 'off') {
        on.style.display = 'inline';
        off.style.display = 'none';
        soundCloud.style.color = '#08fdd8';
        myAudio.play().catch(e => console.log("Autoplay prevented: ", e));
        localStorage.setItem('musicPlaybackState', 'on');
      } else {
        on.style.display = 'none';
        off.style.display = 'inline';
        soundCloud.style.color = '#f50057';
        myAudio.pause();
        localStorage.setItem('musicPlaybackState', 'off');
        localStorage.setItem('musicCurrentTime', myAudio.currentTime.toString()); // Save current time on pause
      }
    }

    // Save current playback time before the user navigates away or closes the tab
    window.addEventListener('beforeunload', () => {
      if (!myAudio.paused) {
        localStorage.setItem('musicCurrentTime', myAudio.currentTime.toString());
      }
    });
