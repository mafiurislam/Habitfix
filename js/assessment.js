/**
 * HABIT FIX WELLNESS - Free Wellness Assessment Logic
 * Raju Raut | Wellness Coach
 */

(function ($) {
  'use strict';

  $(document).ready(function () {
    const $form = $('#wellnessAssessmentForm');
    if (!$form.length) return;

    let currentStep = 1;
    const totalSteps = 3;

    function showStep(step) {
      $('.assessment-step').addClass('d-none');
      $(`#step-${step}`).removeClass('d-none');
      $('#stepCurrentNumber').text(step);
      
      const progressPercent = Math.round((step / totalSteps) * 100);
      $('#assessmentProgressBar').css('width', `${progressPercent}%`);

      if (step === 1) {
        $('#prevStepBtn').addClass('d-none');
      } else {
        $('#prevStepBtn').removeClass('d-none');
      }

      if (step === totalSteps) {
        $('#nextStepBtn').addClass('d-none');
        $('#submitAssessmentBtn').removeClass('d-none');
      } else {
        $('#nextStepBtn').removeClass('d-none');
        $('#submitAssessmentBtn').addClass('d-none');
      }

      // Scroll to top of assessment container
      $('html, body').animate({
        scrollTop: $('#assessmentContainer').offset().top - 100
      }, 300);
    }

    $('#nextStepBtn').on('click', function () {
      // Validate current step fields
      const $currentFields = $(`#step-${currentStep}`).find('input[required], select[required], textarea[required]');
      let valid = true;

      $currentFields.each(function () {
        if (!this.checkValidity()) {
          this.reportValidity();
          valid = false;
          return false;
        }
      });

      if (valid && currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
      }
    });

    $('#prevStepBtn').on('click', function () {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    });

    $form.on('submit', function (e) {
      e.preventDefault();

      const consentChecked = $('#consentCheckbox').is(':checked');
      if (!consentChecked) {
        alert('Please accept the consent checkbox to continue.');
        return;
      }

      // Collect Data
      const name = $('#clientName').val() || 'Friend';
      const country = $('#clientCountry').val() || 'Global';
      const ageRange = $('#clientAge').val() || 'Not specified';
      const language = $('#clientLang').val() || 'English';
      const email = $('#clientEmail').val() || '';
      const phone = $('#clientPhone').val() || '';
      const goal = $('input[name="wellnessGoal"]:checked').val() || 'General Wellness & Weight Management';
      const activity = $('#clientActivity').val() || 'Sedentary';
      const foodHabit = $('#clientFoodHabit').val() || 'Irregular';
      const hydration = $('#clientHydration').val() || '1-2 Liters';
      const sleep = $('#clientSleep').val() || '6-7 Hours';
      const challenge = $('#clientChallenge').val() || 'Consistency';
      const mainGoal = $('#clientMainGoalText').val() || '';

      // Calculate a wellness habit readiness score
      let score = 65;
      if (activity === 'Moderate (3-4x/week)' || activity === 'Regular Movement') score += 10;
      if (hydration === '2-3 Liters' || hydration === '3+ Liters') score += 10;
      if (sleep === '7-8 Hours Restful') score += 10;

      // Construct WhatsApp message text
      const waText = encodeURIComponent(
        `*Habit Fix Wellness Assessment Submission*\n` +
        `-----------------------------------------\n` +
        `👤 *Name:* ${name}\n` +
        `🌍 *Country:* ${country} | *Age:* ${ageRange}\n` +
        `🗣️ *Language:* ${language}\n` +
        `🎯 *Primary Goal:* ${goal}\n` +
        `🏃 *Activity Level:* ${activity}\n` +
        `💧 *Hydration:* ${hydration}\n` +
        `😴 *Sleep:* ${sleep}\n` +
        `⚠️ *Main Challenge:* ${challenge}\n` +
        (mainGoal ? `📝 *Specific Note:* ${mainGoal}\n` : '') +
        (phone ? `📱 *Phone:* ${phone}\n` : '') +
        `-----------------------------------------\n` +
        `Hi Coach Raju, I just completed my wellness assessment and would love your practical habit guidance!`
      );

      const waLink = `https://wa.me/919051231155?text=${waText}`;

      // Populate Result Screen
      $('#resultClientName').text(name);
      $('#resultScoreText').text(`${score}/100`);
      $('#resultGoalText').text(goal);
      $('#resultSummaryText').text(
        `Based on your input, your baseline lifestyle has great potential. With a structured focus on ${challenge.toLowerCase()} and steady daily routines, sustainable weight management and vitality are well within reach.`
      );
      $('#resultWhatsAppBtn').attr('href', waLink);

      // Hide form and show results
      $('#assessmentFormCard').addClass('d-none');
      $('#assessmentResultCard').removeClass('d-none');

      $('html, body').animate({
        scrollTop: $('#assessmentResultCard').offset().top - 100
      }, 400);
    });

    // Reset button
    $('#retakeAssessmentBtn').on('click', function () {
      $form[0].reset();
      currentStep = 1;
      showStep(1);
      $('#assessmentResultCard').addClass('d-none');
      $('#assessmentFormCard').removeClass('d-none');
    });
  });

})(jQuery);
