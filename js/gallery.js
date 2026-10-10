/**
 * HABIT FIX WELLNESS - Transformation Gallery JavaScript
 * Filter tabs & Lightbox Viewer
 */

(function ($) {
  'use strict';

  $(document).ready(function () {
    // Category Filtering
    $('.gallery-filter-btn').on('click', function () {
      $('.gallery-filter-btn').removeClass('active');
      $(this).addClass('active');

      const filterValue = $(this).data('filter');

      if (filterValue === 'all') {
        $('.gallery-item').fadeIn(300);
      } else {
        $('.gallery-item').hide();
        $(`.gallery-item[data-category="${filterValue}"]`).fadeIn(300);
      }
    });

    // Lightbox Modal Trigger
    $('.open-transformation-modal').on('click', function (e) {
      e.preventDefault();
      const $card = $(this).closest('.transformation-card');
      const imgSrc = $card.find('.transformation-img-container img').attr('src');
      const title = $card.find('.transformation-title').text();
      const duration = $card.find('.transformation-badge-duration').text();
      const habits = $card.find('.habit-tags').html();
      const quote = $card.find('.transformation-quote').text();
      const clientInfo = $card.find('.transformation-client-info').text();

      $('#lightboxImg').attr('src', imgSrc);
      $('#lightboxTitle').text(title);
      $('#lightboxDuration').text(duration);
      $('#lightboxHabits').html(habits);
      $('#lightboxQuote').text(quote);
      $('#lightboxClientInfo').text(clientInfo);

      const modalEl = document.getElementById('transformationLightboxModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      }
    });
  });

})(jQuery);
