/**
 * HABIT FIX WELLNESS - Advanced BMI & Body Metrics Calculator
 * Coach Raju Raut | habitfixwellness.com
 * Metric & Imperial Units, Live Sliders, BMR, TDEE, Water Target,
 * Ideal Weight Range, WHO & Asian Guidelines, WhatsApp & Booking Integration
 */

(function ($) {
  'use strict';

  $(document).ready(function () {
    // State
    let unit = 'metric'; // 'metric' or 'imperial'
    let gender = 'male';

    // Elements
    const $unitMetric = $('#unitMetric');
    const $unitImperial = $('#unitImperial');
    const $metricInputs = $('#metricInputs');
    const $imperialInputs = $('#imperialInputs');

    // Metric Inputs
    const $heightCm = $('#heightCm');
    const $heightCmSlider = $('#heightCmSlider');
    const $heightCmBadge = $('#heightCmBadge');

    const $weightKg = $('#weightKg');
    const $weightKgSlider = $('#weightKgSlider');
    const $weightKgBadge = $('#weightKgBadge');

    // Imperial Inputs
    const $heightFt = $('#heightFt');
    const $heightIn = $('#heightIn');
    const $weightLbs = $('#weightLbs');
    const $weightLbsSlider = $('#weightLbsSlider');
    const $weightLbsBadge = $('#weightLbsBadge');

    // Other inputs
    const $ageInput = $('#userAge');
    const $activityLevel = $('#activityLevel');

    // Result elements
    const $bmiScore = $('#bmiScore');
    const $bmiCategoryBadge = $('#bmiCategoryBadge');
    const $bmiCategoryText = $('#bmiCategoryText');
    const $bmiMarker = $('#bmiMarker');
    const $idealWeightVal = $('#idealWeightVal');
    const $weightDiffVal = $('#weightDiffVal');
    const $calorieTargetVal = $('#calorieTargetVal');
    const $waterTargetVal = $('#waterTargetVal');
    const $coachAdviceText = $('#coachAdviceText');
    const $asianCutoffNotice = $('#asianCutoffNotice');
    const $bmiBookBtn = $('#bmiBookBtn');
    const $bmiWhatsAppBtn = $('#bmiWhatsAppBtn');

    // 1. Unit Switching
    $unitMetric.on('click', function () {
      if (unit === 'metric') return;
      unit = 'metric';
      $unitImperial.removeClass('active');
      $unitMetric.addClass('active');
      $imperialInputs.addClass('d-none');
      $metricInputs.removeClass('d-none');

      // Convert current imperial to metric
      const ft = parseFloat($heightFt.val()) || 5;
      const inch = parseFloat($heightIn.val()) || 9;
      const lbs = parseFloat($weightLbs.val()) || 154;

      const totalInches = (ft * 12) + inch;
      const cm = Math.round(totalInches * 2.54);
      const kg = Math.round(lbs / 2.20462);

      $heightCm.val(cm);
      $heightCmSlider.val(cm);
      $heightCmBadge.text(cm + ' cm');

      $weightKg.val(kg);
      $weightKgSlider.val(kg);
      $weightKgBadge.text(kg + ' kg');

      calculateBMI();
    });

    $unitImperial.on('click', function () {
      if (unit === 'imperial') return;
      unit = 'imperial';
      $unitMetric.removeClass('active');
      $unitImperial.addClass('active');
      $metricInputs.addClass('d-none');
      $imperialInputs.removeClass('d-none');

      // Convert current metric to imperial
      const cm = parseFloat($heightCm.val()) || 175;
      const kg = parseFloat($weightKg.val()) || 70;

      const totalInches = cm / 2.54;
      const ft = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      const lbs = Math.round(kg * 2.20462);

      $heightFt.val(ft);
      $heightIn.val(inches);

      $weightLbs.val(lbs);
      $weightLbsSlider.val(lbs);
      $weightLbsBadge.text(lbs + ' lbs');

      calculateBMI();
    });

    // 2. Gender Selection
    $('.bmi-gender-btn').on('click', function () {
      $('.bmi-gender-btn').removeClass('active');
      $(this).addClass('active');
      gender = $(this).data('gender');
      calculateBMI();
    });

    // 3. Metric Sliders Sync
    $heightCmSlider.on('input', function () {
      const val = $(this).val();
      $heightCm.val(val);
      $heightCmBadge.text(val + ' cm');
      calculateBMI();
    });

    $heightCm.on('input', function () {
      let val = parseFloat($(this).val());
      if (val < 100) val = 100;
      if (val > 240) val = 240;
      $heightCmSlider.val(val);
      $heightCmBadge.text(val + ' cm');
      calculateBMI();
    });

    $weightKgSlider.on('input', function () {
      const val = $(this).val();
      $weightKg.val(val);
      $weightKgBadge.text(val + ' kg');
      calculateBMI();
    });

    $weightKg.on('input', function () {
      let val = parseFloat($(this).val());
      if (val < 30) val = 30;
      if (val > 220) val = 220;
      $weightKgSlider.val(val);
      $weightKgBadge.text(val + ' kg');
      calculateBMI();
    });

    // 4. Imperial Sliders Sync
    $weightLbsSlider.on('input', function () {
      const val = $(this).val();
      $weightLbs.val(val);
      $weightLbsBadge.text(val + ' lbs');
      calculateBMI();
    });

    $weightLbs.on('input', function () {
      let val = parseFloat($(this).val());
      if (val < 66) val = 66;
      if (val > 480) val = 480;
      $weightLbsSlider.val(val);
      $weightLbsBadge.text(val + ' lbs');
      calculateBMI();
    });

    $heightFt.on('change', calculateBMI);
    $heightIn.on('change', calculateBMI);
    $ageInput.on('input', calculateBMI);
    $activityLevel.on('change', calculateBMI);

    // 5. Core Calculation Engine
    function calculateBMI() {
      let weightInKg = 0;
      let heightInM = 0;
      let heightInCm = 0;
      const age = parseInt($ageInput.val(), 10) || 30;
      const activityMult = parseFloat($activityLevel.val()) || 1.375;

      if (unit === 'metric') {
        heightInCm = parseFloat($heightCm.val()) || 175;
        weightInKg = parseFloat($weightKg.val()) || 70;
        heightInM = heightInCm / 100;
      } else {
        const ft = parseFloat($heightFt.val()) || 5;
        const inch = parseFloat($heightIn.val()) || 9;
        const lbs = parseFloat($weightLbs.val()) || 154;

        const totalInches = (ft * 12) + inch;
        heightInCm = totalInches * 2.54;
        heightInM = heightInCm / 100;
        weightInKg = lbs / 2.20462;
      }

      if (heightInM <= 0 || weightInKg <= 0) return;

      // BMI Formula: weight (kg) / [height (m)]^2
      const bmi = weightInKg / (heightInM * heightInM);
      const bmiFormatted = bmi.toFixed(1);

      // Animate/Update Score
      $bmiScore.text(bmiFormatted);

      // Determine Category
      let catClass = 'normal';
      let catTitle = 'Normal / Healthy Weight';
      let riskText = 'Statistically lowest risk of lifestyle-induced conditions. Maintain your daily consistency!';
      let coachAdvice = 'You are currently in a healthy weight zone. Focus on preserving lean muscle, maintaining adequate hydration, and sustaining mindful meal patterns rather than restrictive diets.';

      if (bmi < 18.5) {
        catClass = 'underweight';
        catTitle = 'Underweight';
        riskText = 'Risk of nutritional deficiencies, compromised immunity, and lower bone density.';
        coachAdvice = 'Focus on nutrient-dense whole foods, progressive resistance training, and consistent meal timing. We work on building healthy appetite habits without heavy digestive distress.';
      } else if (bmi >= 18.5 && bmi < 25.0) {
        catClass = 'normal';
        catTitle = 'Normal / Healthy Weight';
        riskText = 'Low cardiovascular and metabolic risk.';
        coachAdvice = 'Excellent foundation. Let’s focus on sustaining energy levels, restful sleep, stress resilience, and lifelong lifestyle habits to keep you feeling vibrant.';
      } else if (bmi >= 25.0 && bmi < 30.0) {
        catClass = 'overweight';
        catTitle = 'Overweight';
        riskText = 'Moderate risk of developing hypertension, elevated fasting glucose, and sluggish metabolism.';
        coachAdvice = 'Carrying extra weight often stems from subtle daily habit friction (evening snacking, irregular hydration, poor sleep). You do NOT need extreme starvation; small 1% habit adjustments yield lasting results.';
      } else if (bmi >= 30.0 && bmi < 35.0) {
        catClass = 'obese1';
        catTitle = 'Obesity (Class I)';
        riskText = 'High risk of insulin resistance, lipid imbalance, and joint strain.';
        coachAdvice = 'A structured, compassionate coaching routine is essential. We will audit your daily biological rhythms, balance meal portions gently, and establish sustainable walking and water habits without overwhelming workouts.';
      } else {
        catClass = 'obese2';
        catTitle = 'Obesity (Class II/III)';
        riskText = 'High to very high risk of cardiovascular strain and chronic metabolic issues.';
        coachAdvice = 'Medical consultation alongside personalized lifestyle habit support is highly recommended. Together with Coach Raju, we take pressure-free, steady steps toward sustainable health restoration.';
      }

      // Asian Indian Cutoff Note
      if (bmi >= 23.0 && bmi < 25.0) {
        $asianCutoffNotice.removeClass('d-none').html(
          `<i class="fa-solid fa-circle-info text-warning me-1"></i> <strong>Asian-Indian Cutoff Note:</strong> For South Asian populations, WHO and health ministries recommend a lower threshold (Overweight starts at BMI 23.0) due to higher risk of abdominal adiposity at lower body weights.`
        );
      } else {
        $asianCutoffNotice.addClass('d-none');
      }

      // Update Badge
      $bmiCategoryBadge
        .attr('class', 'bmi-category-badge ' + catClass)
        .html(`<i class="fa-solid fa-heart-pulse me-1"></i> ${catTitle}`);

      $bmiCategoryText.html(`<strong>Health Risk Assessment:</strong> ${riskText}`);
      $coachAdviceText.text(coachAdvice);

      // Spectrum Marker Position (map BMI from 15 to 40 -> 0% to 100%)
      let markerPercent = ((bmi - 15) / (40 - 15)) * 100;
      if (markerPercent < 2) markerPercent = 2;
      if (markerPercent > 98) markerPercent = 98;
      $bmiMarker.css('left', markerPercent + '%');

      // Ideal Healthy Weight Range for this height (BMI 18.5 - 24.9)
      const minIdealKg = 18.5 * (heightInM * heightInM);
      const maxIdealKg = 24.9 * (heightInM * heightInM);

      if (unit === 'metric') {
        $idealWeightVal.text(`${minIdealKg.toFixed(1)} - ${maxIdealKg.toFixed(1)} kg`);

        if (weightInKg > maxIdealKg) {
          const delta = (weightInKg - maxIdealKg).toFixed(1);
          $weightDiffVal.html(`<span class="text-danger">+${delta} kg</span> above normal range`);
        } else if (weightInKg < minIdealKg) {
          const delta = (minIdealKg - weightInKg).toFixed(1);
          $weightDiffVal.html(`<span class="text-primary">-${delta} kg</span> below normal range`);
        } else {
          $weightDiffVal.html(`<span class="text-success"><i class="fa-solid fa-circle-check"></i> Within healthy range</span>`);
        }
      } else {
        const minIdealLbs = minIdealKg * 2.20462;
        const maxIdealLbs = maxIdealKg * 2.20462;
        const curLbs = weightInKg * 2.20462;

        $idealWeightVal.text(`${minIdealLbs.toFixed(0)} - ${maxIdealLbs.toFixed(0)} lbs`);

        if (curLbs > maxIdealLbs) {
          const delta = (curLbs - maxIdealLbs).toFixed(0);
          $weightDiffVal.html(`<span class="text-danger">+${delta} lbs</span> above normal range`);
        } else if (curLbs < minIdealLbs) {
          const delta = (minIdealLbs - curLbs).toFixed(0);
          $weightDiffVal.html(`<span class="text-primary">-${delta} lbs</span> below normal range`);
        } else {
          $weightDiffVal.html(`<span class="text-success"><i class="fa-solid fa-circle-check"></i> Within healthy range</span>`);
        }
      }

      // Basal Metabolic Rate (BMR) & Daily Maintenance Calories (TDEE) via Mifflin-St Jeor
      let bmr = 0;
      if (gender === 'male') {
        bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5;
      } else {
        bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 161;
      }
      const tdee = Math.round(bmr * activityMult);
      $calorieTargetVal.text(`${tdee} kcal/day`);

      // Daily Hydration Requirement (~35 ml per kg)
      const waterLiters = (weightInKg * 0.035).toFixed(1);
      const waterLitersHigh = (weightInKg * 0.040).toFixed(1);
      $waterTargetVal.text(`${waterLiters} - ${waterLitersHigh} L/day`);

      // Update CTA links with query params
      const bookingHref = `booking.html?bmi=${bmiFormatted}&category=${encodeURIComponent(catTitle)}`;
      $bmiBookBtn.attr('href', bookingHref);

      const waMsg = encodeURIComponent(`Hi Coach Raju! I just calculated my BMI on your website: My BMI is ${bmiFormatted} (${catTitle}). I would like to discuss a personalized habit plan.`);
      $bmiWhatsAppBtn.attr('href', `https://wa.me/919051231155?text=${waMsg}`);
    }

    // 6. Print Report Trigger
    $('#printBmiReportBtn').on('click', function (e) {
      e.preventDefault();
      window.print();
    });

    // Initial run
    calculateBMI();
  });
})(jQuery);
