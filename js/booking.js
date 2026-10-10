/**
 * HABIT FIX WELLNESS - Timezone-Aware Consultation Booking
 * Raju Raut | Wellness Coach
 */

(function ($) {
  'use strict';

  $(document).ready(function () {
    const $bookingForm = $('#consultationBookingForm');
    if (!$bookingForm.length) return;

    // Detect user's local timezone
    try {
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (userTz) {
        $('#userDetectedTz').text(userTz);
        // If timezone exists in select options, select it
        if ($('#timezoneSelector option[value="' + userTz + '"]').length) {
          $('#timezoneSelector').val(userTz);
        }
      }
    } catch (e) {
      console.log('Timezone detection error:', e);
    }

    // Populate min date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowIso = tomorrow.toISOString().split('T')[0];
    $('#bookingDateInput').attr('min', tomorrowIso).val(tomorrowIso);

    // Pre-populate if redirected from BMI Calculator or Program Pages
    const urlParams = new URLSearchParams(window.location.search);
    const paramBmi = urlParams.get('bmi');
    const paramCategory = urlParams.get('category');
    const paramProgram = urlParams.get('program');

    if (paramBmi) {
      const bmiNote = `Calculated BMI on website: ${paramBmi} (${paramCategory || 'General'}). Looking for tailored weight/lifestyle habit coaching.`;
      const currentNotes = $('#bookNotes').val();
      $('#bookNotes').val(currentNotes ? currentNotes + '\n' + bmiNote : bmiNote);
      $('#consultationTypeSelect').val('1-on-1 Lifestyle Coaching');
    } else if (paramProgram) {
      $('#consultationTypeSelect').val(paramProgram);
    }

    // Slot click selection
    $(document).on('click', '.time-slot-btn', function () {
      $('.time-slot-btn').removeClass('btn-primary-wellness active').addClass('btn-outline-wellness');
      $(this).removeClass('btn-outline-wellness').addClass('btn-primary-wellness active');
      $('#selectedTimeSlot').val($(this).data('slot'));
    });

    // Booking Submission
    $bookingForm.on('submit', function (e) {
      e.preventDefault();

      const consultationType = $('#consultationTypeSelect').val();
      const date = $('#bookingDateInput').val();
      const time = $('#selectedTimeSlot').val();
      const timezone = $('#timezoneSelector').val() || 'Asia/Kolkata (IST)';
      const name = $('#bookName').val();
      const email = $('#bookEmail').val();
      const phone = $('#bookPhone').val();
      const notes = $('#bookNotes').val();

      if (!time) {
        alert('Please choose a preferred consultation time slot.');
        return;
      }

      // Format WhatsApp confirmation text
      const waMsg = encodeURIComponent(
        `*New Consultation Booking Request*\n` +
        `------------------------------------\n` +
        `👤 *Client:* ${name}\n` +
        `📋 *Type:* ${consultationType}\n` +
        `🗓️ *Date:* ${date}\n` +
        `⏰ *Time Slot:* ${time}\n` +
        `🌍 *Timezone:* ${timezone}\n` +
        `📧 *Email:* ${email}\n` +
        `📱 *Phone/WhatsApp:* ${phone}\n` +
        (notes ? `📝 *Topic/Notes:* ${notes}\n` : '') +
        `------------------------------------\n` +
        `Hi Coach Raju, I would like to confirm my consultation with you.`
      );

      const waBookingUrl = `https://wa.me/919051231155?text=${waMsg}`;

      // Populate Confirmation Modal
      $('#confirmClientName').text(name);
      $('#confirmType').text(consultationType);
      $('#confirmDateTime').text(`${date} at ${time} (${timezone})`);
      $('#confirmWhatsAppBtn').attr('href', waBookingUrl);

      const modalEl = document.getElementById('bookingConfirmationModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      } else {
        window.open(waBookingUrl, '_blank');
      }
    });
  });

})(jQuery);
