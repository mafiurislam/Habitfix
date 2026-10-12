/**
 * HABIT FIX WELLNESS - Transformation Gallery JavaScript
 * Filter tabs & Lightbox Viewer
 */

(function ($) {
  'use strict';

  $(document).ready(function () {
    // Category Filtering for Gallery Page
    $('.gallery-filter-btn').on('click', function () {
      $('.gallery-filter-btn').removeClass('active');
      $(this).addClass('active');

      const filterValue = $(this).data('filter');

      if (filterValue === 'all') {
        $('.gallery-item').fadeIn(300);
      } else {
        $('.gallery-item').hide();
        $('.gallery-item').filter(function () {
          const cats = ($(this).data('category') || '').toString().split(/\s+/);
          return cats.includes(filterValue);
        }).fadeIn(300);
      }
    });

    // Category Filtering for Homepage Transformations Section
    $('.transformations-filter-btn').on('click', function () {
      $('.transformations-filter-btn').removeClass('active');
      $(this).addClass('active');

      const filterValue = $(this).data('filter');

      if (filterValue === 'all') {
        $('.transformation-card-col').fadeIn(300);
      } else {
        $('.transformation-card-col').hide();
        $('.transformation-card-col').filter(function () {
          const cats = ($(this).data('category') || '').toString().split(/\s+/);
          return cats.includes(filterValue);
        }).fadeIn(300);
      }
    });

    // Lightbox Modal Trigger (delegated on whole card)
    $(document).on('click', '.transformation-card, .open-transformation-modal', function (e) {
      e.preventDefault();
      const $card = $(this).closest('.transformation-card');
      const imgSrc = $card.find('.transformation-img-container img').attr('src') || $card.find('img').attr('src');
      const title = $card.find('.transformation-title').text().trim();
      const duration = $card.find('.transformation-badge-duration').text().trim();
      const habits = $card.find('.habit-tags').html();
      const quote = $card.data('quote') || $card.find('.transformation-quote').text().trim() || 'Transforming health and vitality through consistent daily habit shifts with Coach Raju Raut.';
      const clientInfo = $card.find('.transformation-client-info').text().trim();

      $('#lightboxImg').attr('src', imgSrc);
      $('#lightboxTitle').text(title);
      $('#lightboxDuration').text(duration);
      $('#lightboxHabits').html(habits);
      $('#lightboxQuote').text('"' + quote.replace(/^["']|["']$/g, '') + '"');
      $('#lightboxClientInfo').text(clientInfo);

      const modalEl = document.getElementById('transformationLightboxModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
      }
    });
  });

})(jQuery);
