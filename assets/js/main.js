

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
    const isMobileTag = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobileTag) {
      const cont = document.getElementById('myCanvasContainer');
      if (cont) cont.style.display = 'none';
      return;
    }
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
      const myCanvasContainer = document.getElementById('myCanvasContainer');
      if (myCanvasContainer) myCanvasContainer.style.display='none';
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
    } else {
      // Desktop: initialize to OFF unless saved state is ON
      if (savedPlaybackState === 'on') {
        on.style.display = 'inline';
        off.style.display = 'none';
        soundCloud.style.color = '#08fdd8';
        if (savedCurrentTime) {
          myAudio.currentTime = savedCurrentTime;
        }
        // Attempt to play, but if blocked, it will require user interaction
        myAudio.play().catch(e => console.log("Autoplay prevented on load: ", e));
      } else {
        myAudio.pause();
        on.style.display = 'none';
        off.style.display = 'inline';
        soundCloud.style.color = '#f50057';
        localStorage.setItem('musicPlaybackState', 'off');
      }
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

  // Add lazy loading to images without loading attribute (non-header)
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img:not([loading])').forEach((img) => {
      if (!img.closest('header')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  });

 const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

// mouse influence
let mouse = { x: w/2, y: h/2 };
window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// create particles
const particles = [];
for (let i = 0; i < 800; i++) {
  particles.push({
    x: Math.random()*w,
    y: Math.random()*h,
    vx: 0,
    vy: 0
  });
}

function draw() {
  // clear instead of black overlay
  ctx.clearRect(0,0,w,h);

  ctx.strokeStyle = 'rgba(255,0,0,0.7)';
  ctx.lineWidth = 1;

  for (let p of particles) {
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;
    let dist = Math.sqrt(dx*dx+dy*dy) + 0.001;
    let force = 300 / dist;
    let angle = Math.atan2(dy, dx) + Math.sin(Date.now()*0.001)*0.2;

    p.vx += Math.cos(angle)*force*0.01;
    p.vy += Math.sin(angle)*force*0.01;

    p.vx *= 0.95;
    p.vy *= 0.95;

    p.x += p.vx;
    p.y += p.vy;

    if(p.x<0 || p.x>w || p.y<0 || p.y>h){
      p.x = Math.random()*w;
      p.y = Math.random()*h;
      p.vx = p.vy = 0;
    }

    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x - p.vx*2, p.y - p.vy*2);
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}
draw();


