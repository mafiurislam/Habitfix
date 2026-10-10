/**
 * HABIT FIX WELLNESS - Main JavaScript
 * Raju Raut | Wellness Coach
 * Modern Interactive Animations, Smooth Scroll Reveals, Tab Switching
 */

(function ($) {
  'use strict';

  $(document).ready(function () {
    
    // 1. Sticky Header scroll effect
    const $header = $('.site-header');
    function updateHeader() {
      if ($(window).scrollTop() > 30) {
        $header.addClass('scrolled');
      } else {
        $header.removeClass('scrolled');
      }
    }
    $(window).on('scroll', updateHeader);
    updateHeader();

    // 2. Mobile Navbar auto-close on link click (excluding dropdown toggles)
    $(document).on('click', '.navbar-nav .nav-link:not(.dropdown-toggle), .header-dropdown-item, .mobile-drawer-cta-group a', function () {
      if ($('.navbar-collapse').hasClass('show')) {
        $('.header-hamburger-btn').click();
      }
    });

    // Mobile dropdown accordion toggling
    $('.header-nav-list .dropdown-toggle').on('click', function (e) {
      if (window.innerWidth < 992) {
        e.preventDefault();
        e.stopPropagation();
        const $parent = $(this).closest('.dropdown');
        const $menu = $parent.find('> .dropdown-menu');
        const isOpen = $parent.hasClass('show');

        // Close other sibling dropdowns for clean accordion behavior
        $('.header-nav-list .dropdown').not($parent).removeClass('show').find('> .dropdown-menu').removeClass('show');
        $('.header-nav-list .dropdown').not($parent).find('> .dropdown-toggle').attr('aria-expanded', 'false');

        if (isOpen) {
          $parent.removeClass('show');
          $menu.removeClass('show');
          $(this).attr('aria-expanded', 'false');
        } else {
          $parent.addClass('show');
          $menu.addClass('show');
          $(this).attr('aria-expanded', 'true');
        }
      }
    });

    // 3. Smooth scrolling for internal anchor links
    $('a[href^="#"]:not([href="#"]):not([data-bs-toggle])').on('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = $(targetId);
      if (target.length) {
        e.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top - 90
        }, 700);
      }
    });

    // 4. Scroll Reveal Animations via IntersectionObserver
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      document.querySelectorAll('.reveal-on-scroll, .reveal-fade-left, .reveal-fade-right, .reveal-zoom-in').forEach(el => {
        revealObserver.observe(el);
      });
    } else {
      // Fallback for older browsers
      $('.reveal-on-scroll, .reveal-fade-left, .reveal-fade-right, .reveal-zoom-in').addClass('is-revealed');
    }

    // 5. Interactive Metric Visualizer for Body & Wellness Education Matrix
    $('.matrix-tab-btn').on('click', function (e) {
      e.preventDefault();
      const metric = $(this).data('metric');
      $('.matrix-tab-btn').removeClass('active');
      $(this).addClass('active');

      $('.metric-detail-view').addClass('d-none');
      $(`#metric-${metric}`).removeClass('d-none').hide().fadeIn(350);
    });

    // 6. Language Switcher Toast Notice
    window.setLanguage = function (lang) {
      let langName = 'English';
      if (lang === 'hi') langName = 'हिन्दी (Hindi)';
      if (lang === 'bn') langName = 'বাংলা (Bengali)';

      const toastHtml = `
        <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1090;">
          <div class="toast show align-items-center text-bg-light border-0 shadow-lg" role="alert">
            <div class="d-flex p-2">
              <div class="toast-body">
                <i class="fa-solid fa-language text-success fs-5 me-2"></i>
                Language preference set to <strong>${langName}</strong>. All coaching consultations are available in this language!
              </div>
              <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
          </div>
        </div>
      `;
      $('body').append(toastHtml);
      setTimeout(function () {
        $('.toast-container').fadeOut(400, function () { $(this).remove(); });
      }, 4000);
    };

    // 7. Interactive Feedback on Floating Contact Buttons
    $('#floatingWhatsAppBtn').on('click', function () {
      console.log('User connected with Coach Raju on WhatsApp (+91 90512 31155)');
    });

    $('#floatingCallBtn').on('click', function () {
      console.log('User initiated phone call to Coach Raju (9051231155)');
    });

  });

})(jQuery);
